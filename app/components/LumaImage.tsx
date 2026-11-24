"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/* Event covers are resized by Luma's own image CDN instead of passing through
   our optimiser. It serves AVIF or WebP at the width asked for, and anim=false
   keeps only the first frame of an animated cover, so a GIF that is several
   megabytes as a file arrives as a still of a few kilobytes. */
const LUMA_HOST = "https://images.lumacdn.com/";

function lumaLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith(LUMA_HOST)) return src;
  const path = src.slice(LUMA_HOST.length);
  return `${LUMA_HOST}cdn-cgi/image/format=auto,anim=false,fit=cover,quality=${quality ?? 75},width=${width}/${path}`;
}

export function LumaImage(props: Omit<ImageProps, "loader">) {
  return <Image {...props} loader={lumaLoader} />;
}
