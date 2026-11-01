import Link from "next/link";
import { sitio } from "@/data/sitio";
import { IconArrow } from "./icons";

const etiquetas = { whatsapp: "Escribir por WhatsApp", instagram: "Escribir por Instagram", email: "Escribir un email" };

/** Botón de encargo. Mientras no haya canal configurado, lleva a la sección de encargos. */
export function ContactAction({ texto = "Pide el tuyo", detalle }: { texto?: string; detalle?: string }) {
  const c = sitio.contacto;
  if (c) {
    const href = detalle && c.tipo === "whatsapp" ? `${c.url}?text=${encodeURIComponent(detalle)}` : c.url;
    return (
      <a className="btn btn-primary" href={href} target="_blank" rel="noopener noreferrer">
        {etiquetas[c.tipo]}
        <IconArrow />
      </a>
    );
  }
  return (
    <Link className="btn btn-primary" href="/#encargos">
      {texto}
      <IconArrow />
    </Link>
  );
}
