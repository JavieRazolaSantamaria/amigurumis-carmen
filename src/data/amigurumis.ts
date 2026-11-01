// Catálogo de amigurumis. Para añadir una pieza: sube sus fotos a
// public/amigurumis/<slug>/ y añade una entrada a `amigurumis`.

export type Foto = {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
  /** Centro de la pieza dentro de la foto (%), para los recortes circulares. */
  foco: { x: number; y: number };
  /** true si la foto tiene el fondo quitado (PNG/WebP transparente). */
  recorte?: boolean;
};

/** Un paso del patrón: una vuelta o un tramo de vueltas iguales. */
export type PasoPatron = {
  desde: number;
  hasta: number;
  instrucciones: string;
  /** Puntos que quedan al terminar la vuelta. */
  puntos: number;
};

export type Patron = {
  /** true mientras el patrón mostrado no sea el real de la pieza. */
  esEjemplo: boolean;
  material: string[];
  pasos: PasoPatron[];
};

/** Colores de ovillo de la web; cada pieza ocupa un casillero de uno de ellos. */
export type ColorOvillo = "yema" | "coral" | "turquesa" | "hoja";

export type Amigurumi = {
  slug: string;
  /** Color del casillero de la pieza en la estantería. */
  ovillo: ColorOvillo;
  numero: number;
  nombre: string;
  /** true mientras Carmen no confirme el nombre. */
  nombreProvisional: boolean;
  descripcion: string;
  colores: string[];
  tamano: string | null;
  hilo: string | null;
  fotos: Foto[];
  /**
   * Ruta (dentro de public/) del modelo .glb. La ficha solo muestra el visor
   * si el archivo existe, así que basta con dejarlo en esa carpeta.
   */
  modelo3d: string | null;
  patron: Patron | null;
};

// Patrón base de una bola de amigurumi en punto bajo. Es un EJEMPLO para
// enseñar cómo se verá la sección; se sustituye por el patrón real de Carmen.
const patronEjemploBola: Patron = {
  esEjemplo: true,
  material: ["Ganchillo de 2,5 mm", "Hilo de algodón", "Relleno de fibra", "Marcador de vuelta"],
  pasos: [
    { desde: 1, hasta: 1, instrucciones: "6 pb en un anillo mágico", puntos: 6 },
    { desde: 2, hasta: 2, instrucciones: "6 aum", puntos: 12 },
    { desde: 3, hasta: 3, instrucciones: "(1 pb, 1 aum) × 6", puntos: 18 },
    { desde: 4, hasta: 4, instrucciones: "(2 pb, 1 aum) × 6", puntos: 24 },
    { desde: 5, hasta: 5, instrucciones: "(3 pb, 1 aum) × 6", puntos: 30 },
    { desde: 6, hasta: 6, instrucciones: "(4 pb, 1 aum) × 6", puntos: 36 },
    { desde: 7, hasta: 12, instrucciones: "36 pb, una vuelta por fila", puntos: 36 },
    { desde: 13, hasta: 13, instrucciones: "(4 pb, 1 dism) × 6", puntos: 30 },
    { desde: 14, hasta: 14, instrucciones: "(3 pb, 1 dism) × 6", puntos: 24 },
    { desde: 15, hasta: 15, instrucciones: "(2 pb, 1 dism) × 6. Rellenar", puntos: 18 },
    { desde: 16, hasta: 16, instrucciones: "(1 pb, 1 dism) × 6", puntos: 12 },
    { desde: 17, hasta: 17, instrucciones: "6 dism. Cerrar y esconder la hebra", puntos: 6 },
  ],
};

export const amigurumis: Amigurumi[] = [
  {
    slug: "wombat",
    ovillo: "yema",
    numero: 1,
    nombre: "Wombat",
    nombreProvisional: false,
    descripcion:
      "Cuerpo redondo en beige, hocico tejido aparte en marrón, orejas redondas y un dientecito en crudo. Ojos de seguridad negros y sonrisa bordada.",
    colores: ["Beige", "Marrón", "Crudo", "Negro"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/wombat/frente.jpg",
        alt: "Amigurumi de wombat beige sostenido en la mano, de frente: hocico marrón, ojos negros, orejas redondas y un diente blanco.",
        ancho: 1500,
        alto: 2000,
        foco: { x: 51, y: 51 },
      },
    ],
    modelo3d: null,
    patron: patronEjemploBola,
  },
  {
    slug: "brujita",
    ovillo: "coral",
    numero: 2,
    nombre: "Brujita",
    nombreProvisional: true,
    descripcion:
      "Pelo rosa en tirabuzones, sombrero negro de pico con banda blanca y vestido negro con estrellas bordadas a mano. Lleva una escoba de ramitas de verdad.",
    colores: ["Negro", "Rosa", "Crudo", "Beige"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        // Foto original sin el fondo (recortada con rembg).
        src: "/amigurumis/brujita/frente.webp",
        alt: "Amigurumi de brujita de frente: pelo rosa en tirabuzones, sombrero negro de pico con banda blanca, vestido negro con estrellas blancas bordadas y una escoba en la mano.",
        ancho: 962,
        alto: 962,
        foco: { x: 50, y: 50 },
        recorte: true,
      },
    ],
    // Modelo generado con Tripo a partir de una foto. Exportar como GLB y guardarlo aquí.
    modelo3d: "/amigurumis/brujita/modelo.glb",
    patron: null,
  },
];

export function getAmigurumi(slug: string) {
  return amigurumis.find((a) => a.slug === slug);
}

export function numeroPatron(n: number) {
  return `Nº ${String(n).padStart(2, "0")}`;
}

export function rangoVueltas(p: PasoPatron) {
  return p.desde === p.hasta ? `V${p.desde}` : `V${p.desde}–V${p.hasta}`;
}
