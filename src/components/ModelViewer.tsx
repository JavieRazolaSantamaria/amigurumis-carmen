"use client";

import { useEffect, useState } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        alt: string;
        ar?: boolean;
        "ar-modes"?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: number;
        "rotation-per-second"?: string;
        "shadow-intensity"?: string;
        "touch-action"?: string;
        "interaction-prompt"?: string;
        exposure?: string;
      };
    }
  }
}

/** Visor 3D: girar con el dedo o el ratón, acercar y, en móvil, ver en realidad aumentada. */
export function ModelViewer({ src, alt }: { src: string; alt: string }) {
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let vivo = true;
    import("@google/model-viewer")
      .then(() => vivo && setListo(true))
      .catch(() => vivo && setError(true));
    return () => {
      vivo = false;
    };
  }, []);

  if (error) {
    return (
      <div className="viewer-stage viewer-msg" role="status">
        No se ha podido cargar el visor 3D. Prueba a recargar la página.
      </div>
    );
  }

  return (
    <div className="viewer-stage" aria-busy={!listo}>
      {listo ? (
        <model-viewer
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          auto-rotate-delay={1500}
          rotation-per-second="20deg"
          ar
          ar-modes="webxr scene-viewer quick-look"
          shadow-intensity="0.8"
          exposure="1.05"
          touch-action="pan-y"
          interaction-prompt="auto"
          className="viewer"
        />
      ) : (
        <p className="viewer-msg">Cargando el modelo 3D…</p>
      )}
      <p className="viewer-hint">Arrastra para girar · pellizca o usa la rueda para acercar</p>
    </div>
  );
}
