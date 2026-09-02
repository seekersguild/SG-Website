"use client";

import type { CSSProperties } from "react";

import { useCallback, useEffect, useRef, useState } from "react";

type OrientationEventWithCompass = DeviceOrientationEvent & {
  webkitCompassHeading?: number;
};

type DeviceOrientationConstructorWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

function normalizeHeading(value: number) {
  return ((value % 360) + 360) % 360;
}

function getDeviceHeading(event: DeviceOrientationEvent) {
  const compassEvent = event as OrientationEventWithCompass;

  if (typeof compassEvent.webkitCompassHeading === "number") {
    return normalizeHeading(compassEvent.webkitCompassHeading);
  }

  if (typeof event.alpha === "number") {
    return normalizeHeading(360 - event.alpha);
  }

  return null;
}

export function InteractiveCompass() {
  const compassRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<number | null>(null);
  const hasDeviceHeadingRef = useRef(false);
  const listeningRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [heading, setHeading] = useState(18);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const nextHeading = getDeviceHeading(event);

    if (nextHeading === null) {
      return;
    }

    hasDeviceHeadingRef.current = true;
    setHeading(nextHeading);
  }, []);

  useEffect(() => {
    function updateHeading() {
      frameRef.current = null;

      const compass = compassRef.current;
      if (!compass) return;

      const bounds = compass.getBoundingClientRect();
      const x = pointerRef.current.x - (bounds.left + bounds.width / 2);
      const y = pointerRef.current.y - (bounds.top + bounds.height / 2);
      const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;

      setHeading(normalizeHeading(angle));
    }

    function handlePointerMove(event: PointerEvent) {
      if (hasDeviceHeadingRef.current) {
        return;
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateHeading);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, [handleOrientation]);

  async function enablePhoneCompass() {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      return;
    }

    const DeviceOrientation = window.DeviceOrientationEvent as DeviceOrientationConstructorWithPermission;

    if (listeningRef.current) {
      return;
    }

    try {
      if (typeof DeviceOrientation.requestPermission === "function") {
        const permission = await DeviceOrientation.requestPermission();

        if (permission !== "granted") {
          hasDeviceHeadingRef.current = false;
          return;
        }
      }

      window.addEventListener("deviceorientation", handleOrientation);
      window.addEventListener("deviceorientationabsolute", handleOrientation);
      listeningRef.current = true;
    } catch {
      hasDeviceHeadingRef.current = false;
    }
  }

  return (
    <button
      aria-label="Interactive compass"
      className="hero-compass"
      onClick={enablePhoneCompass}
      ref={compassRef}
      style={{ "--heading": `${heading}deg` } as CSSProperties}
      type="button"
    >
      <div className="hero-compass-dial" aria-hidden="true">
        <span className="compass-cardinal compass-n">N</span>
        <span className="compass-cardinal compass-e">E</span>
        <span className="compass-cardinal compass-s">S</span>
        <span className="compass-cardinal compass-w">W</span>
        <span className="compass-needle" />
      </div>
    </button>
  );
}
