"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Foto } from "@/data/amigurumis";

/**
 * Foto principal de la ficha. Si la pieza tiene varias fotos, debajo aparecen
 * las vistas (frente, lado, espalda…) para cambiar entre ellas; la vista
 * elegida queda en la URL (?foto=2).
 */
export function Galeria({ fotos }: { fotos: Foto[] }) {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("foto"));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la vista viene de la URL, que solo existe en el navegador
    if (n >= 1 && n <= fotos.length) setActual(n - 1);
  }, [fotos.length]);

  function elegir(i: number) {
    setActual(i);
    const url = new URL(window.location.href);
    if (i === 0) url.searchParams.delete("foto");
    else url.searchParams.set("foto", String(i + 1));
    window.history.replaceState(null, "", url);
  }

  function teclas(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const siguiente = (actual + (e.key === "ArrowRight" ? 1 : -1) + fotos.length) % fotos.length;
    elegir(siguiente);
    document.getElementById(`vista-${siguiente}`)?.focus();
  }

  const foto = fotos[actual];
  const varias = fotos.length > 1;

  return (
    <figure className={`piece-photo${foto.recorte ? " is-cutout" : ""}`}>
      <div className="gallery-stage">
        {fotos.map((f, i) => (
          <Image
            key={f.src}
            src={f.src}
            alt={f.alt}
            width={f.ancho}
            height={f.alto}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority={i === 0}
            loading={i === 0 ? undefined : "eager"}
            className={i === actual ? "is-active" : ""}
            aria-hidden={i !== actual}
          />
        ))}
      </div>
      {varias && (
        <div className="gallery-views" role="group" aria-label="Vistas de la pieza" onKeyDown={teclas}>
          {fotos.map((f, i) => (
            <button
              key={f.src}
              id={`vista-${i}`}
              type="button"
              className="gallery-view"
              aria-pressed={i === actual}
              tabIndex={i === actual ? 0 : -1}
              onClick={() => elegir(i)}
            >
              <span className="gallery-thumb">
                <Image src={f.src} alt="" width={120} height={120} sizes="72px" />
              </span>
              <span>{f.vista ?? `Foto ${i + 1}`}</span>
            </button>
          ))}
        </div>
      )}
      <figcaption>
        {varias ? `${foto.vista ?? `Foto ${actual + 1}`} · ` : ""}Foto real de la pieza, tejida por Carmen.
      </figcaption>
    </figure>
  );
}
