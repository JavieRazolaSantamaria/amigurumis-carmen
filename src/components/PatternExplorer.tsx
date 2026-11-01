"use client";

import { useEffect, useState } from "react";
import { rangoVueltas, type Patron } from "@/data/amigurumis";

const FILA = 18;
const ALTO_BARRA = 13;
const ANCHO_MAX = 250;
const CENTRO = 200;

function leerHechos(clave: string): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(clave) ?? "[]");
    return Array.isArray(v) ? v.filter((n) => Number.isInteger(n)) : [];
  } catch {
    return [];
  }
}

export function PatternExplorer({ slug, patron }: { slug: string; patron: Patron }) {
  const clave = `patron-hecho:${slug}`;
  const pasos = patron.pasos;
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [hechos, setHechos] = useState<number[]>([]);

  // Estado guardado (localStorage) y vuelta elegida (?v=) solo existen en el navegador.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con almacenamiento del navegador tras hidratar
    setHechos(leerHechos(clave));
    const v = Number(new URLSearchParams(window.location.search).get("v"));
    const i = pasos.findIndex((p) => v >= p.desde && v <= p.hasta);
    if (i >= 0) setSeleccion(i);
  }, [clave, pasos]);

  function elegir(i: number) {
    const nueva = seleccion === i ? null : i;
    setSeleccion(nueva);
    const url = new URL(window.location.href);
    if (nueva === null) url.searchParams.delete("v");
    else url.searchParams.set("v", String(pasos[nueva].desde));
    window.history.replaceState(null, "", url);
  }

  function marcar(i: number, hecho: boolean) {
    const siguiente = hecho ? [...new Set([...hechos, i])] : hechos.filter((n) => n !== i);
    setHechos(siguiente);
    try {
      localStorage.setItem(clave, JSON.stringify(siguiente));
    } catch {
      // Sin almacenamiento disponible: el progreso dura lo que la visita.
    }
  }

  function reiniciar() {
    setHechos([]);
    try {
      localStorage.removeItem(clave);
    } catch {}
  }

  // Una barra por vuelta, con ancho proporcional a sus puntos.
  const filas = pasos.flatMap((p, i) => Array.from({ length: p.hasta - p.desde + 1 }, (_, k) => ({ v: p.desde + k, puntos: p.puntos, i })));
  const maxPuntos = Math.max(...pasos.map((p) => p.puntos));
  const alto = filas.length * FILA + 8;

  return (
    <div className="pattern">
      <figure className="pattern-figure">
        <svg className="silhouette" viewBox={`0 0 400 ${alto}`} aria-hidden="true">
          {filas.map((f, n) => {
            const ancho = Math.max(18, (f.puntos / maxPuntos) * ANCHO_MAX);
            const y = 4 + n * FILA;
            const sel = seleccion === f.i;
            const estado = sel ? "is-selected" : hechos.includes(f.i) ? "is-done" : "";
            return (
              <g key={f.v}>
                <text className={`sil-label tnum ${sel ? "is-selected" : ""}`} x={8} y={y + 11}>
                  V{f.v}
                </text>
                <rect className={`sil-row ${estado}`} x={CENTRO - ancho / 2} y={y} width={ancho} height={ALTO_BARRA} rx={6.5} />
                <text className={`sil-label tnum ${sel ? "is-selected" : ""}`} x={392} y={y + 11} textAnchor="end">
                  {f.puntos}
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption>
          Cada barra es una vuelta y su ancho, los puntos que lleva. Apiladas, dibujan la forma de la pieza.
        </figcaption>
      </figure>

      <div>
        <p className="materials">
          <strong>Material:</strong> {patron.material.join(", ")}.
        </p>
        <div className="progress">
          <span className="tnum" aria-live="polite">
            {hechos.length} de {pasos.length} pasos tejidos
          </span>
          <button type="button" onClick={reiniciar} disabled={hechos.length === 0}>
            Empezar de nuevo
          </button>
        </div>
        <ol className="rounds">
          {pasos.map((p, i) => {
            const hecho = hechos.includes(i);
            return (
              <li key={p.desde} className={`${seleccion === i ? "is-selected" : ""} ${hecho ? "is-done" : ""}`}>
                <label className="round-check">
                  <input
                    type="checkbox"
                    checked={hecho}
                    onChange={(e) => marcar(i, e.target.checked)}
                    aria-label={`Marcar ${rangoVueltas(p)} como tejida`}
                  />
                </label>
                <button type="button" className="round-btn" aria-pressed={seleccion === i} onClick={() => elegir(i)}>
                  <span className="r tnum">{rangoVueltas(p)}</span>
                  <span className="txt">{p.instrucciones}</span>
                  <span className="pts tnum">({p.puntos})</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
