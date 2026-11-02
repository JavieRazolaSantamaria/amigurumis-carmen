import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Courier_Prime } from "next/font/google";
import Link from "next/link";
import { sitio } from "@/data/sitio";
import { IconInstagram, Ovillo } from "@/components/icons";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `Amigurumis de ${sitio.autora}`,
    template: `%s · Amigurumis de ${sitio.autora}`,
  },
  description: sitio.descripcion,
};

export const viewport: Viewport = {
  themeColor: "#fdfdfb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bricolage.variable} ${courier.variable}`}>
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <header className="site-head">
          <div className="wrap">
            <Link href="/" className="wordmark" translate="no" aria-label={`${sitio.autora}, inicio`}>
              <Ovillo style={{ color: "var(--coral)" }} />
              <span className="wm-name">{sitio.autora}</span>
            </Link>
            <nav className="site-nav" aria-label="Principal">
              <ul>
                <li className="opt">
                  <Link href="/#carmen">Carmen</Link>
                </li>
                <li>
                  <Link href="/#origen">Origen</Link>
                </li>
                <li className="opt">
                  <Link href="/#leer-un-patron">Leer un patrón</Link>
                </li>
                <li>
                  <Link href="/#coleccion">Colección</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="contenido">{children}</main>
        <footer className="site-foot">
          <div className="wrap">
            <p>
              Amigurumis tejidos a mano por <span translate="no">{sitio.autoraCompleta}</span>.
            </p>
            <div className="foot-links">
              <a href={sitio.instagram.url} target="_blank" rel="noopener noreferrer">
                <IconInstagram />
                <span translate="no">@{sitio.instagram.usuario}</span>
              </a>
              <Link href="/#coleccion">Ver la colección</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
