import Link from "next/link";
import Image from "next/image";
import { amigurumis, numeroPatron, type ColorOvillo } from "@/data/amigurumis";
import { sitio } from "@/data/sitio";
import { Hilo } from "@/components/Hilo";
import { IconArrow, Ovillo, SymAnillo, SymAumento, SymDisminucion, SymPuntoBajo } from "@/components/icons";

// Casilleros que se muestran en la estantería mientras la colección es pequeña.
const CASILLEROS_MINIMOS = 3;
const ORDEN_OVILLOS: ColorOvillo[] = ["yema", "coral", "turquesa", "hoja"];

export default function Home() {
  const huecos = Math.max(0, CASILLEROS_MINIMOS - amigurumis.length);
  const [nombre, ...apellidos] = sitio.autoraCompleta.split(" ");

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

      <Hilo />

      <section className="section" id="coleccion" aria-labelledby="coleccion-titulo">
        <div className="wrap">
          <div className="section-head">
            <h2 id="coleccion-titulo">La colección</h2>
            <p>Cada pieza en su casillero, como los ovillos de una mercería. Los vacíos son las que aún están en el ganchillo.</p>
          </div>
          <ul className="shelf">
            {amigurumis.map((a) => (
              <li key={a.slug} style={{ display: "contents" }}>
                <Link className={`cubby ov-${a.ovillo}`} href={`/amigurumis/${a.slug}`}>
                  <span className="cubby-media">
                    {a.fotos[0] ? (
                      <Image
                        src={a.fotos[0].src}
                        alt=""
                        width={480}
                        height={480}
                        sizes="(max-width: 640px) 90vw, 30vw"
                        style={{ objectPosition: `${a.fotos[0].foco.x}% ${a.fotos[0].foco.y}%` }}
                      />
                    ) : (
                      <span className="cubby-nophoto">
                        <Ovillo />
                      </span>
                    )}
                  </span>
                  <span className="cubby-body">
                    <span className="cubby-num tnum">{numeroPatron(a.numero)}</span>
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
            ))}
            {Array.from({ length: huecos }, (_, i) => {
              const color = ORDEN_OVILLOS[(amigurumis.length + i) % ORDEN_OVILLOS.length];
              return (
                <li key={`hueco-${i}`} className={`cubby is-empty ov-${color}`}>
                  <span className="cubby-media">
                    <Ovillo />
                  </span>
                  <span className="cubby-body">
                    <span className="cubby-num tnum">{numeroPatron(amigurumis.length + i + 1)}</span>
                    <h3>En el ganchillo</h3>
                    <span className="cubby-meta">Próxima pieza de la colección.</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Hilo variante={1} />

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

    </>
  );
}
