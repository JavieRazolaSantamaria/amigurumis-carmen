"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Foto, Video } from "@/data/amigurumis";

/**
 * Foto principal de la ficha. Si la pieza tiene varias fotos (o un vídeo),
 * debajo aparecen las vistas (frente, lado, vídeo…) para cambiar entre ellas;
 * la vista elegida queda en la URL (?foto=2).
 */
export function Galeria({ fotos, video }: { fotos: Foto[]; video?: Video }) {
  const [actual, setActual] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const total = fotos.length + (video ? 1 : 0);
  const enVideo = video !== undefined && actual === fotos.length;

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("foto"));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la vista viene de la URL, que solo existe en el navegador
    if (n >= 1 && n <= total) setActual(n - 1);
  }, [total]);

  // El vídeo arranca al elegirlo (salvo con movimiento reducido) y se para al salir.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (enVideo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.play().catch(() => {});
    } else if (!enVideo) {
      v.pause();
    }
  }, [enVideo]);

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
    const siguiente = (actual + (e.key === "ArrowRight" ? 1 : -1) + total) % total;
    elegir(siguiente);
    document.getElementById(`vista-${siguiente}`)?.focus();
  }

  const foto = fotos[Math.min(actual, fotos.length - 1)];
  const varias = total > 1;
  const vista = enVideo ? "Vídeo" : (foto.vista ?? `Foto ${actual + 1}`);

  return (
    <figure className={`piece-photo${foto.recorte && !enVideo ? " is-cutout" : ""}`}>
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
        {video && (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            className={enVideo ? "is-active" : ""}
            aria-hidden={!enVideo}
            aria-label={video.descripcion}
            tabIndex={enVideo ? undefined : -1}
            muted
            loop
            playsInline
            controls
            preload="none"
          />
        )}
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
          {video && (
            <button
              id={`vista-${fotos.length}`}
              type="button"
              className="gallery-view"
              aria-pressed={enVideo}
              tabIndex={enVideo ? 0 : -1}
              onClick={() => elegir(fotos.length)}
            >
              <span className="gallery-thumb is-video">
                <Image src={video.poster} alt="" width={120} height={120} sizes="72px" />
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span>Vídeo</span>
            </button>
          )}
        </div>
      )}
      <figcaption>
        {varias ? `${vista} · ` : ""}
        {enVideo ? "Vídeo real de la pieza, tejida por Carmen." : "Foto real de la pieza, tejida por Carmen."}
      </figcaption>
    </figure>
  );
}
