"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Foto } from "@/data/amigurumis";
import { IconArrow } from "./icons";

const ZOOM = 2.5;

/**
 * Foto a pantalla completa. Un toque amplía (y el dedo o el ratón mueven la
 * zona ampliada), otro toque vuelve; deslizar o las flechas cambian de vista.
 * Usa <dialog>, así que Esc cierra y el foco vuelve solo a donde estaba.
 */
export function PantallaCompleta({
  fotos,
  indice,
  abierta,
  onCambiar,
  onCerrar,
}: {
  fotos: Foto[];
  indice: number;
  abierta: boolean;
  onCambiar: (i: number) => void;
  onCerrar: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const inicio = useRef<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origen, setOrigen] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierta && !d.open) d.showModal();
    if (!abierta && d.open) d.close();
  }, [abierta]);

  // Cada vista empieza sin ampliar.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reinicio al cambiar de foto
    setZoom(false);
  }, [indice, abierta]);

  const foto = fotos[indice];
  const varias = fotos.length > 1;

  function mover(paso: number) {
    onCambiar((indice + paso + fotos.length) % fotos.length);
  }

  function punto(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
    };
  }

  function alPulsar(e: React.PointerEvent<HTMLDivElement>) {
    inicio.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function alMover(e: React.PointerEvent<HTMLDivElement>) {
    // Ampliada: con ratón basta pasar por encima; con el dedo, arrastrar.
    if (zoom && (e.pointerType === "mouse" || inicio.current)) setOrigen(punto(e));
  }

  function alSoltar(e: React.PointerEvent<HTMLDivElement>) {
    const i = inicio.current;
    inicio.current = null;
    if (!i) return;
    const dx = e.clientX - i.x;
    const dy = e.clientY - i.y;
    if (!zoom && varias && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      mover(dx < 0 ? 1 : -1);
    } else if (Math.hypot(dx, dy) < 10) {
      setOrigen(punto(e));
      setZoom((z) => !z);
    }
  }

  function teclas(e: React.KeyboardEvent) {
    if (!varias || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
    e.preventDefault();
    mover(e.key === "ArrowRight" ? 1 : -1);
  }

  return (
    <dialog
      ref={dialogo}
      className="lightbox"
      aria-label="Foto a pantalla completa"
      onClose={onCerrar}
      onKeyDown={teclas}
    >
      {abierta && foto && (
        <>
          <div className="lightbox-bar">
            <p className="lightbox-count tnum">
              {varias && `${indice + 1} / ${fotos.length}`}
              {varias && foto.vista && ` · ${foto.vista}`}
            </p>
            <p className="lightbox-hint">{zoom ? "Toca para alejar" : "Toca la foto para verla de cerca"}</p>
            <button type="button" className="lightbox-btn" onClick={onCerrar} aria-label="Cerrar" autoFocus>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div
            className={`lightbox-stage${zoom ? " is-zoom" : ""}`}
            onPointerDown={alPulsar}
            onPointerMove={alMover}
            onPointerUp={alSoltar}
            onPointerCancel={() => (inicio.current = null)}
          >
            <Image
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              sizes="100vw"
              quality={90}
              draggable={false}
              style={{ transformOrigin: `${origen.x}% ${origen.y}%`, transform: zoom ? `scale(${ZOOM})` : undefined }}
            />
          </div>
          {varias && (
            <>
              <button type="button" className="lightbox-btn lightbox-prev" onClick={() => mover(-1)} aria-label="Foto anterior">
                <IconArrow />
              </button>
              <button type="button" className="lightbox-btn lightbox-next" onClick={() => mover(1)} aria-label="Foto siguiente">
                <IconArrow />
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
