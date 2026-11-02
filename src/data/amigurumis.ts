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
  material: string[];
  pasos: PasoPatron[];
};

/** Colores de ovillo de la web; cada pieza ocupa un casillero de uno de ellos. */
export type ColorOvillo = "yema" | "coral" | "turquesa" | "hoja";

/** Secciones de la colección. Para añadir una (p. ej. "verano"), basta con añadirla aquí. */
export const categorias = [
  { id: "animales", nombre: "Animales" },
  { id: "navidad", nombre: "Navidad" },
  { id: "halloween", nombre: "Halloween" },
] as const;

export type Categoria = (typeof categorias)[number]["id"];

export function nombreCategoria(id: Categoria) {
  return categorias.find((c) => c.id === id)?.nombre ?? id;
}

export type Amigurumi = {
  slug: string;
  categoria: Categoria;
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
   * Tamaño, hilo, modelo y patrón son opcionales: lo que es null no aparece.
   */
  modelo3d: string | null;
  patron: Patron | null;
};

export const amigurumis: Amigurumi[] = [
  {
    slug: "wombat",
    categoria: "animales",
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
        src: "/amigurumis/wombat/frente.webp",
        alt: "Amigurumi de wombat beige de frente: hocico marrón, ojos negros, orejas redondas y un diente blanco.",
        ancho: 1165,
        alto: 1165,
        foco: { x: 50, y: 50 },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "brujita",
    categoria: "halloween",
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
  {
    slug: "unicornio",
    categoria: "animales",
    ovillo: "hoja",
    numero: 3,
    nombre: "Unicornio",
    nombreProvisional: false,
    descripcion:
      "Blanco, con el hocico en beige y las patas en rosa. Lleva un cuerno amarillo, una corona de florecillas y una crin larga de hebras rosas, lilas, azules y verdes.",
    colores: ["Blanco", "Beige", "Rosa", "Amarillo", "Lila", "Azul"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/unicornio/frente.webp",
        alt: "Amigurumi de unicornio blanco sentado, con cuerno amarillo, crin de colores, mofletes rosas y patas rosas.",
        ancho: 1113,
        alto: 1113,
        foco: { x: 50, y: 50 },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "belen",
    categoria: "navidad",
    ovillo: "turquesa",
    numero: 4,
    nombre: "Belén",
    nombreProvisional: false,
    descripcion:
      "Nacimiento completo de seis figuras: San José con su cayado, la Virgen María, el Niño Jesús en el pesebre, un ángel de alas doradas, el buey y la mula.",
    colores: ["Beige", "Marrón", "Gris", "Azul", "Blanco", "Dorado"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/belen/frente.webp",
        alt: "Belén de amigurumi: San José, el ángel sobre un tarro de cristal, la Virgen María y, delante, el buey, el Niño en el pesebre y la mula.",
        ancho: 1400,
        alto: 1400,
        foco: { x: 50, y: 50 },
        recorte: true,
      },
    ],
    modelo3d: null,
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
