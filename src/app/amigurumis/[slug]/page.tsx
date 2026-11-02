import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { amigurumis, getAmigurumi, numeroPatron } from "@/data/amigurumis";
import { ModelViewer } from "@/components/ModelViewer";
import { PatternExplorer } from "@/components/PatternExplorer";
import { Ovillo } from "@/components/icons";

/** El visor solo aparece si el .glb está de verdad en public/. */
function existeEnPublic(ruta: string | null) {
  return ruta !== null && existsSync(path.join(process.cwd(), "public", ruta));
}

export function generateStaticParams() {
  return amigurumis.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/amigurumis/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAmigurumi(slug);
  if (!a) return {};
  return { title: `${a.nombre} (${numeroPatron(a.numero)})`, description: a.descripcion };
}

/** Una fila de la etiqueta; si el dato aún no existe, no se muestra. */
function Dato({ nombre, valor }: { nombre: string; valor: string | null }) {
  if (!valor) return null;
  return (
    <div>
      <dt>{nombre}</dt>
      <dd>{valor}</dd>
    </div>
  );
}

export default function PaginaAmigurumi({ params }: PageProps<"/amigurumis/[slug]">) {
  return (
    <Suspense fallback={<div className="wrap" style={{ minHeight: "100vh" }} aria-busy="true" />}>
      <FichaAmigurumi params={params} />
    </Suspense>
  );
}

async function FichaAmigurumi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAmigurumi(slug);
  if (!a) notFound();
  const foto = a.fotos[0];
  const modelo = existeEnPublic(a.modelo3d) ? a.modelo3d : null;
  const altModelo = `Modelo 3D de ${a.nombre.toLowerCase()}: ${a.descripcion}`;

  return (
    <>
      <nav className="crumbs wrap" aria-label="Migas de pan">
        <ol>
          <li>
            <Link href="/#coleccion">Colección</Link>
          </li>
          <li aria-current="page">{numeroPatron(a.numero)}</li>
        </ol>
      </nav>

      <div className={`piece-head wrap ov-${a.ovillo}`}>
        {foto ? (
          <figure className={`piece-photo${foto.recorte ? " is-cutout" : ""}`}>
            <Image src={foto.src} alt={foto.alt} width={foto.ancho} height={foto.alto} sizes="(max-width: 900px) 100vw, 50vw" priority />
            <figcaption>Foto real de la pieza, tejida por Carmen.</figcaption>
          </figure>
        ) : modelo ? (
          <figure className="piece-photo">
            <ModelViewer src={modelo} alt={altModelo} />
            <figcaption>Modelo 3D de la pieza. Gíralo para verla por todos lados.</figcaption>
          </figure>
        ) : (
          <figure className="piece-photo">
            <div className="photo-pending">
              <Ovillo />
              <p>Foto en camino</p>
            </div>
          </figure>
        )}

        <div className="piece-info">
          <h1>
            <span className="piece-num tnum">{numeroPatron(a.numero)}</span>
            {a.nombre}
          </h1>
          {a.nombreProvisional && (
            <p style={{ marginTop: 12 }}>
              <span className="tag">nombre provisional</span>
            </p>
          )}
          <p className="lede">{a.descripcion}</p>
          <div className="label">
            <p className="label-head">
              <span>{a.nombre}</span>
              <span className="type tnum">{numeroPatron(a.numero)}</span>
            </p>
            <dl>
              <Dato nombre="Colores" valor={a.colores.join(", ")} />
              <Dato nombre="Técnica" valor="Ganchillo en espiral, punto bajo" />
              <Dato nombre="Tamaño" valor={a.tamano} />
              <Dato nombre="Hilo" valor={a.hilo} />
            </dl>
          </div>
          <Link className="btn btn-ghost" href="/#coleccion">
            Volver a la colección
          </Link>
        </div>
      </div>

      {/* Cada sección aparece solo cuando la pieza tiene ese contenido. */}
      {foto && modelo && (
        <section className="section" id="vista-3d" aria-labelledby="vista-3d-titulo">
          <div className="wrap">
            <div className="section-head">
              <h2 id="vista-3d-titulo">Vista 3D</h2>
              <p>Gira la pieza y mírala desde todos los lados.</p>
            </div>
            <div className={`ov-${a.ovillo}`}>
              <ModelViewer src={modelo} alt={altModelo} />
            </div>
          </div>
        </section>
      )}

      {a.patron && (
        <section className="section" id="patron" aria-labelledby="patron-titulo">
          <div className="wrap">
            <div className="section-head">
              <h2 id="patron-titulo">Patrón</h2>
              <p>Toca una vuelta para verla en la forma de la pieza y marca las que ya hayas tejido.</p>
            </div>
            <div className={`ov-${a.ovillo}`}>
              <PatternExplorer slug={a.slug} patron={a.patron} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
