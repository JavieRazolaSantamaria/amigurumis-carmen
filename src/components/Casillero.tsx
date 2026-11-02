import Image from "next/image";
import Link from "next/link";
import { nombreCategoria, numeroPatron, type Amigurumi } from "@/data/amigurumis";
import { IconArrow, Ovillo } from "./icons";

/** Casillero de una pieza en la estantería: foto en círculo, número, nombre y colores. */
export function Casillero({ a }: { a: Amigurumi }) {
  const foto = a.fotos[0];
  return (
    <li style={{ display: "contents" }}>
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
}
