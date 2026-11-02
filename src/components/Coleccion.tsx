"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { amigurumis, categorias, nombreCategoria, numeroPatron, type Categoria, type ColorOvillo } from "@/data/amigurumis";
import { IconArrow, Ovillo } from "./icons";

const ORDEN_OVILLOS: ColorOvillo[] = ["yema", "coral", "turquesa", "hoja"];
const COLUMNAS = 3;

// Solo se ofrecen las secciones que tienen alguna pieza.
const secciones = categorias.filter((c) => amigurumis.some((a) => a.categoria === c.id));

function leerCategoria(): Categoria | null {
  const v = new URLSearchParams(window.location.search).get("categoria");
  return secciones.some((c) => c.id === v) ? (v as Categoria) : null;
}

/** Estantería de la colección con filtro por sección (?categoria=navidad). */
export function Coleccion() {
  const [activa, setActiva] = useState<Categoria | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la sección viene de la URL, que solo existe en el navegador
    setActiva(leerCategoria());
    const alVolver = () => setActiva(leerCategoria());
    window.addEventListener("popstate", alVolver);
    return () => window.removeEventListener("popstate", alVolver);
  }, []);

  function elegir(id: Categoria | null) {
    setActiva(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("categoria", id);
    else url.searchParams.delete("categoria");
    window.history.pushState(null, "", url);
  }

  const piezas = activa ? amigurumis.filter((a) => a.categoria === activa) : amigurumis;
  // Los huecos "En el ganchillo" completan la última balda, solo en la vista general.
  const huecos = activa ? 0 : (COLUMNAS - (piezas.length % COLUMNAS)) % COLUMNAS;

  return (
    <>
      {secciones.length > 1 && (
        <div className="filters" role="group" aria-label="Secciones de la colección">
          <button type="button" className="filter" aria-pressed={activa === null} onClick={() => elegir(null)}>
            Todas <span className="tnum">{amigurumis.length}</span>
          </button>
          {secciones.map((c) => (
            <button key={c.id} type="button" className="filter" aria-pressed={activa === c.id} onClick={() => elegir(c.id)}>
              {c.nombre} <span className="tnum">{amigurumis.filter((a) => a.categoria === c.id).length}</span>
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {activa ? `${nombreCategoria(activa)}: ${piezas.length} piezas` : `Toda la colección: ${piezas.length} piezas`}
      </p>

      <ul className="shelf">
        {piezas.map((a) => {
          const foto = a.fotos[0];
          return (
            <li key={a.slug} style={{ display: "contents" }}>
              <Link className={`cubby ov-${a.ovillo}`} href={`/amigurumis/${a.slug}`}>
                <span className={`cubby-media${foto?.recorte ? " is-cutout" : ""}`}>
                  {foto ? (
                    <Image
                      src={foto.src}
                      alt=""
                      width={480}
                      height={480}
                      sizes="(max-width: 640px) 90vw, 30vw"
                      style={{ objectPosition: `${foto.foco.x}% ${foto.foco.y}%` }}
                    />
                  ) : (
                    <span className="cubby-nophoto">
                      <Ovillo />
                    </span>
                  )}
                </span>
                <span className="cubby-body">
                  <span className="cubby-num tnum">
                    {numeroPatron(a.numero)} · {nombreCategoria(a.categoria)}
                  </span>
                  <h3>{a.nombre}</h3>
                  <span className="cubby-meta">
                    {a.colores.join(" · ")} {a.nombreProvisional && <span className="tag">nombre provisional</span>}
                  </span>
                  <span className="cubby-go">
                    Ver ficha
                    <IconArrow />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
        {Array.from({ length: huecos }, (_, i) => (
          <li key={`hueco-${i}`} className={`cubby is-empty ov-${ORDEN_OVILLOS[(piezas.length + i) % ORDEN_OVILLOS.length]}`}>
            <span className="cubby-media">
              <Ovillo />
            </span>
            <span className="cubby-body">
              <span className="cubby-num tnum">{numeroPatron(amigurumis.length + i + 1)}</span>
              <h3>En el ganchillo</h3>
              <span className="cubby-meta">Próxima pieza de la colección.</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
