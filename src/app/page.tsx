import Link from "next/link";
import Image from "next/image";
import { sitio } from "@/data/sitio";
import { destacadas, novedades } from "@/data/amigurumis";
import { Casillero } from "@/components/Casillero";
import { Coleccion } from "@/components/Coleccion";
import { Hilo } from "@/components/Hilo";
import { IconArrow, IconInstagram, Ovillo, SymAnillo, SymAumento, SymDisminucion, SymPuntoBajo } from "@/components/icons";

export default function Home() {
  const [nombre, ...apellidos] = sitio.autoraCompleta.split(" ");
  // La última palabra va pegada a los emojis para que no se queden solos en una línea.
  const corte = sitio.carta.firma.lastIndexOf(" ");
  const firmaInicio = sitio.carta.firma.slice(0, corte);
  const firmaFin = sitio.carta.firma.slice(corte + 1);

  return (
    <>
      <section className="hero" aria-labelledby="titulo">
        <div className="wrap">
          <div>
            <h1 id="titulo" translate="no">
              {nombre} <span className="apellidos">{apellidos.join(" ")}</span>
            </h1>
            <p className="hero-lede">{sitio.presentacion}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="#coleccion">
                Ver la colección
                <IconArrow />
              </Link>
              <Link className="btn btn-ghost" href="#origen">
                ¿Qué es un amigurumi?
              </Link>
            </div>
          </div>
          <figure className="portrait">
            <Image src={sitio.foto.src} alt={sitio.foto.alt} width={sitio.foto.ancho} height={sitio.foto.alto} sizes="(max-width: 900px) 82vw, 460px" priority />
            <Ovillo className="ball" />
          </figure>
        </div>
      </section>

      <section className="section" id="carmen" aria-labelledby="carta-titulo">
        <div className="wrap">
          <div className="band band-carta">
            <h2 id="carta-titulo">{sitio.carta.titulo}</h2>
            <div className="carta-texto">
              {sitio.carta.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="carta-firma">
                {firmaInicio}{" "}
                <span className="nowrap">
                  {firmaFin} <span aria-hidden="true">❤️🧶</span>
                </span>
                <span className="carta-autora" translate="no">
                  {sitio.autora}
                </span>
              </p>
            </div>
            <a className="btn btn-ghost carta-ig" href={sitio.instagram.url} target="_blank" rel="noopener noreferrer">
              <IconInstagram />
              Síguela en Instagram
              <span className="carta-ig-user" translate="no">
                @{sitio.instagram.usuario}
              </span>
            </a>
          </div>
        </div>
      </section>

      {destacadas.length > 0 && (
        <section className="section" id="destacadas" aria-labelledby="destacadas-titulo">
          <div className="wrap">
            <div className="section-head">
              <h2 id="destacadas-titulo">Destacadas</h2>
              <p>Una pequeña selección para empezar a mirar.</p>
            </div>
            <ul className="shelf">
              {destacadas.map((a) => (
                <Casillero key={a.slug} a={a} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <Hilo />

      <section className="section" id="origen" aria-labelledby="origen-titulo">
        <div className="wrap">
          <div className="band band-origen">
            <h2 id="origen-titulo">De dónde viene el amigurumi</h2>
            <div className="origen-grid">
              <p className="etimo" lang="ja" translate="no">
                <span className="etimo-pieza">
                  <span className="jp">編み</span>
                  <span className="lectura" lang="es">ami · tejido</span>
                </span>
                <span className="etimo-mas" aria-hidden="true">+</span>
                <span className="etimo-pieza">
                  <span className="jp">ぬいぐるみ</span>
                  <span className="lectura" lang="es">nuigurumi · muñeco de peluche</span>
                </span>
              </p>
              <div className="origen-texto">
                <p>
                  La palabra es japonesa y junta dos: <em>ami</em>, tejer, y <em>nuigurumi</em>, muñeco relleno. Es decir, un
                  peluche tejido a mano.
                </p>
                <p>
                  Nació en Japón, muy ligado a la estética <em>kawaii</em>: cabezas grandes, cuerpos redondos y caras sencillas.
                  Se teje en espiral, sin cerrar las vueltas, con puntos muy apretados para que no se vea el relleno.
                </p>
                <p>
                  A principios de los 2000 los patrones empezaron a circular por internet y el amigurumi se hizo popular en todo el
                  mundo. Hoy cada tejedora le da su propio carácter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="leer-un-patron" aria-labelledby="patron-titulo">
        <div className="wrap">
          <div className="section-head">
            <h2 id="patron-titulo">Cómo se lee un patrón</h2>
            <p>Un amigurumi se teje en espiral, vuelta a vuelta. El patrón dice cuántos puntos lleva cada vuelta con cuatro símbolos básicos.</p>
          </div>
          <dl className="legend">
            <div className="legend-item ov-yema">
              <SymAnillo />
              <dt>
                <span className="type">AM</span>Anillo mágico
              </dt>
              <dd>El inicio: una lazada que se cierra tirando del hilo, sin agujero en el centro.</dd>
            </div>
            <div className="legend-item ov-coral">
              <SymPuntoBajo />
              <dt>
                <span className="type">pb</span>Punto bajo
              </dt>
              <dd>El punto con el que se teje casi todo el muñeco. Denso, para que no se vea el relleno.</dd>
            </div>
            <div className="legend-item ov-turquesa">
              <SymAumento />
              <dt>
                <span className="type">aum</span>Aumento
              </dt>
              <dd>Dos puntos bajos en el mismo punto. Así crece la pieza.</dd>
            </div>
            <div className="legend-item ov-hoja">
              <SymDisminucion />
              <dt>
                <span className="type">dism</span>Disminución
              </dt>
              <dd>Dos puntos tejidos juntos en uno. Así se cierra la forma.</dd>
            </div>
          </dl>
          <p className="legend-example">
            <strong>V3:</strong> (1 pb, 1 aum) × 6 <strong>(18)</strong>. Un punto bajo y un aumento, seis veces: la vuelta termina con 18 puntos.
          </p>
        </div>
      </section>

      <Hilo variante={1} />

      {novedades.length > 0 && (
        <section className="section" id="novedades" aria-labelledby="novedades-titulo">
          <div className="wrap">
            <div className="section-head">
              <h2 id="novedades-titulo">Novedades</h2>
              <p>Las últimas piezas que han llegado a la estantería.</p>
            </div>
            <ul className="shelf">
              {novedades.map((a) => (
                <Casillero key={a.slug} a={a} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" id="coleccion" aria-labelledby="coleccion-titulo">
        <div className="wrap">
          <div className="section-head">
            <h2 id="coleccion-titulo">La colección</h2>
            <p>Cada pieza en su casillero, como los ovillos de una mercería, ordenadas por secciones.</p>
          </div>
          <Coleccion />
        </div>
      </section>

    </>
  );
}
