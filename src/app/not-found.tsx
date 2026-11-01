import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ borderTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h1 className="tnum" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1 }}>
            Esta vuelta no existe
          </h1>
          <p>La página que buscas no está en la colección. Puede que la pieza haya cambiado de nombre.</p>
        </div>
        <Link className="btn btn-primary" href="/#coleccion">
          Volver a la colección
        </Link>
      </div>
    </section>
  );
}
