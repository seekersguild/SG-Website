import type { ReactNode } from "react";

/* The guild's ornament set, drawn once in SVG and reused:
   a filigree divider for headings, and gold corner flourishes for framed panels. */

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg className={`flourish ${className}`} viewBox="0 0 240 24" aria-hidden="true" focusable="false">
      <path d="M0 12 H92" />
      <path d="M148 12 H240" />
      <path d="M92 12 C100 4 108 4 112 12 C108 20 100 20 92 12 Z" />
      <path d="M148 12 C140 4 132 4 128 12 C132 20 140 20 148 12 Z" />
      <path className="flourish__gem" d="M120 3 L127 12 L120 21 L113 12 Z" />
      <circle cx="84" cy="12" r="2" className="flourish__gem" />
      <circle cx="156" cy="12" r="2" className="flourish__gem" />
    </svg>
  );
}

function Corner() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M2 46 V14 C2 7 7 2 14 2 H46" />
      <path d="M8 46 V18 C8 12 12 8 18 8 H46" className="corner__inner" />
      <path d="M14 14 L20 20" />
      <circle cx="14" cy="14" r="3" className="corner__gem" />
    </svg>
  );
}

/* A panel framed in gold, with a flourish at each corner. */
export function Ornate({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "blockquote" }) {
  return (
    <Tag className={`ornate ${className}`}>
      <span className="ornate__corner ornate__corner--tl">
        <Corner />
      </span>
      <span className="ornate__corner ornate__corner--tr">
        <Corner />
      </span>
      <span className="ornate__corner ornate__corner--bl">
        <Corner />
      </span>
      <span className="ornate__corner ornate__corner--br">
        <Corner />
      </span>
      {children}
    </Tag>
  );
}
