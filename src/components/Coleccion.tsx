"use client";

import { useEffect, useState } from "react";
import { amigurumis, categorias, nombreCategoria, type Amigurumi, type Categoria } from "@/data/amigurumis";
import { Casillero } from "./Casillero";

// Solo se ofrecen las secciones que tienen alguna pieza.
const secciones = categorias.filter((c) => amigurumis.some((a) => a.categoria === c.id));

/** Minúsculas y sin tildes, para que "muneca" encuentre "Muñeca". */
function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

const textoDe = new Map(
  amigurumis.map((a) => [a.slug, normalizar([a.nombre, a.descripcion, a.colores.join(" "), nombreCategoria(a.categoria)].join(" "))]),
);

/** Cada palabra buscada tiene que aparecer en el nombre, la descripción, los colores o la sección. */
function coincide(a: Amigurumi, palabras: string[]) {
  const texto = textoDe.get(a.slug) ?? "";
  return palabras.every((p) => texto.includes(p));
}

function leerUrl() {
  const params = new URLSearchParams(window.location.search);
  const v = params.get("categoria");
  return {
    categoria: secciones.some((c) => c.id === v) ? (v as Categoria) : null,
    busqueda: params.get("q") ?? "",
  };
}

/** Estantería de la colección con buscador (?q=) y filtro por sección (?categoria=navidad). */
export function Coleccion() {
  const [activa, setActiva] = useState<Categoria | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const aplicar = () => {
      const u = leerUrl();
      setActiva(u.categoria);
      setBusqueda(u.busqueda);
    };
    aplicar();
    window.addEventListener("popstate", aplicar);
    return () => window.removeEventListener("popstate", aplicar);
  }, []);

  function elegir(id: Categoria | null) {
    setActiva(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("categoria", id);
    else url.searchParams.delete("categoria");
    window.history.pushState(null, "", url);
  }

  function buscar(texto: string) {
    setBusqueda(texto);
    const url = new URL(window.location.href);
    if (texto.trim()) url.searchParams.set("q", texto);
    else url.searchParams.delete("q");
    // Al escribir no se llena el historial: cada letra reemplaza la anterior.
    window.history.replaceState(null, "", url);
  }

  const palabras = normalizar(busqueda).split(/\s+/).filter(Boolean);
  const encontradas = palabras.length ? amigurumis.filter((a) => coincide(a, palabras)) : amigurumis;
  const piezas = activa ? encontradas.filter((a) => a.categoria === activa) : encontradas;
  const termino = busqueda.trim();

  let resumen = activa ? `${nombreCategoria(activa)}: ${piezas.length} piezas` : `Toda la colección: ${piezas.length} piezas`;
  if (termino) resumen = `${piezas.length} piezas con «${termino}»${activa ? ` en ${nombreCategoria(activa)}` : ""}`;

  return (
    <>
      <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="buscar" className="sr-only">
          Buscar en la colección
        </label>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
        <input
          id="buscar"
          name="q"
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Busca por nombre o color: unicornio, rosa…"
          value={busqueda}
          onChange={(e) => buscar(e.target.value)}
        />
      </form>

      {secciones.length > 1 && (
        <div className="filters" role="group" aria-label="Secciones de la colección">
          <button type="button" className="filter" aria-pressed={activa === null} onClick={() => elegir(null)}>
            Todas <span className="tnum">{encontradas.length}</span>
          </button>
          {secciones.map((c) => (
            <button key={c.id} type="button" className="filter" aria-pressed={activa === c.id} onClick={() => elegir(c.id)}>
              {c.nombre} <span className="tnum">{encontradas.filter((a) => a.categoria === c.id).length}</span>
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {resumen}
      </p>

      {piezas.length > 0 ? (
        <ul className="shelf">
          {piezas.map((a) => (
            <Casillero key={a.slug} a={a} />
          ))}
        </ul>
      ) : (
        <div className="shelf-empty">
          <p>
            Ninguna pieza coincide con <strong>«{termino}»</strong>
            {activa && <> en {nombreCategoria(activa)}</>}.
          </p>
          <div className="shelf-empty-actions">
            {activa && encontradas.length > 0 && (
              <button type="button" className="btn btn-ghost" onClick={() => elegir(null)}>
                Buscar en todas las secciones
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={() => buscar("")}>
              Borrar la búsqueda
            </button>
          </div>
        </div>
      )}
    </>
  );
}
