import { useId } from "react";

// Iconos propios, trazo 1.75 en currentColor.
type P = React.SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);


/** Símbolos de ganchillo para la leyenda (viewBox 56). */
const sym = { viewBox: "0 0 56 56", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const SymAnillo = (p: P) => (
  <svg {...sym} {...p}>
    <circle cx="28" cy="28" r="14" />
    <circle cx="28" cy="28" r="5" />
  </svg>
);
export const SymPuntoBajo = (p: P) => (
  <svg {...sym} {...p}>
    <path d="M17 17l22 22M39 17L17 39" />
  </svg>
);
export const SymAumento = (p: P) => (
  <svg {...sym} {...p}>
    <path d="M15 14l13 28 13-28" />
  </svg>
);
export const SymDisminucion = (p: P) => (
  <svg {...sym} {...p}>
    <path d="M15 42l13-28 13 28" />
  </svg>
);


/** Ovillo de lana: madejas de hebras paralelas cruzadas y una hebra suelta. */
export function Ovillo(p: P) {
  const id = useId();
  return (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden {...p}>
    <defs>
      <clipPath id={id}>
        <circle cx="60" cy="60" r="48" />
      </clipPath>
    </defs>
    <circle cx="60" cy="60" r="48" fill="currentColor" />
    <g clipPath={`url(#${id})`} stroke="#2a1f33" strokeOpacity={0.32} strokeWidth={2.6} strokeLinecap="round">
      <path d="M8 46c30-22 70-30 104-18M10 58c32-22 72-28 104-14M14 70c32-20 70-26 100-12" />
      <path d="M40 10c-6 30 2 66 30 100M52 8c-6 30 4 64 32 98M64 8c-4 28 6 60 32 92" />
      <path d="M18 96c26-4 56-22 74-58M28 104c26-6 54-24 70-56" />
    </g>
    <path d="M96 84c10 8 14 18 22 20" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
  </svg>
  );
}
