/** Hebra de lana que baja entre secciones; se desenrolla con el scroll donde el navegador lo permite. */
export function Hilo({ variante = 0, className = "" }: { variante?: 0 | 1; className?: string }) {
  const d =
    variante === 0
      ? "M60 0 C 80 60, 380 40, 520 70 S 760 150, 900 60 c 40 -26 70 4 50 30 s -70 6 -40 -24 S 1100 80, 1180 120"
      : "M1140 0 C 1100 70, 820 30, 680 80 S 420 130, 300 70 c -40 -20 -74 8 -50 34 s 70 4 36 -26 S 140 90, 40 120";
  return (
    <svg className={`hilo ${className}`} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
      <path d={d} pathLength={1} />
    </svg>
  );
}
