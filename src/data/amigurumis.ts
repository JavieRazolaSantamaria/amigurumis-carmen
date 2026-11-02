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
  /** Nombre de la vista en la galería de la ficha ("Frente", "Lado", "Espalda"…). */
  vista?: string;
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
  { id: "fantasia", nombre: "Fantasía" },
  { id: "munecas", nombre: "Muñecas" },
  { id: "personajes", nombre: "Personajes" },
  { id: "bebes", nombre: "Bebés" },
  { id: "navidad", nombre: "Navidad" },
  { id: "halloween", nombre: "Halloween" },
  { id: "otros", nombre: "Otros" },
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
    categoria: "fantasia",
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
  {
    slug: "jirafa",
    categoria: "animales",
    ovillo: "turquesa",
    numero: 5,
    nombre: "Jirafa",
    nombreProvisional: false,
    descripcion:
      "Jirafa amarilla con manchas marrones, hocico y cuernos en gris, orejas grandes y pestañas bordadas.",
    colores: ["Amarillo", "Marrón", "Gris"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/jirafa/frente.webp",
        alt: "Amigurumi de jirafa amarilla de pie, con manchas marrones, hocico gris y pestañas bordadas.",
        ancho: 1359,
        alto: 1359,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/jirafa/tres-cuartos.webp",
        alt: "Jirafa de amigurumi vista de tres cuartos, con la cabeza girada.",
        ancho: 1219,
        alto: 1219,
        foco: { x: 50, y: 50 },
        recorte: true,
        vista: "Tres cuartos",
      },
      {
        src: "/amigurumis/jirafa/lado.webp",
        alt: "Jirafa de amigurumi vista de lado, con las manchas del cuerpo.",
        ancho: 1292,
        alto: 1292,
        foco: { x: 50, y: 50 },
        recorte: true,
        vista: "Lado",
      },
      {
        src: "/amigurumis/jirafa/espalda.webp",
        alt: "Jirafa de amigurumi vista desde atrás: cuello largo, manchas y colita.",
        ancho: 1400,
        alto: 1400,
        foco: { x: 50, y: 50 },
        recorte: true,
        vista: "Espalda",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "ballena",
    categoria: "animales",
    ovillo: "yema",
    numero: 6,
    nombre: "Ballena",
    nombreProvisional: false,
    descripcion:
      "Ballena azul con la tripa en crudo, mofletes rosas, una sonrisa bordada y un chorrito de agua en la cabeza.",
    colores: ["Azul", "Crudo", "Rosa"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/ballena/frente.webp",
        alt: "Amigurumi de ballena azul redonda con tripa crema, mofletes rosas y un chorro de agua en la cabeza.",
        ancho: 1060,
        alto: 1060,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/ballena/cerca.webp",
        alt: "Ballena de amigurumi de cerca, con la tripa crema y las aletas.",
        ancho: 1400,
        alto: 1400,
        foco: { x: 50, y: 50 },
        recorte: true,
        vista: "De cerca",
      },
      {
        src: "/amigurumis/ballena/espalda.webp",
        alt: "Ballena de amigurumi vista desde atrás, con la cola y el chorrito de agua.",
        ancho: 1368,
        alto: 1368,
        foco: { x: 50, y: 50 },
        recorte: true,
        vista: "Espalda",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "unicornio-trenzas",
    categoria: "fantasia",
    ovillo: "coral",
    numero: 7,
    nombre: "Unicornio de trenzas",
    nombreProvisional: false,
    descripcion:
      "Unicornio en crudo con el hocico beige, un cuernito amarillo, la crin de colores recogida en una trenza y las patas en fucsia.",
    colores: ["Crudo", "Beige", "Fucsia", "Multicolor"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/unicornio-trenzas/frente.webp",
        alt: "Amigurumi de unicornio crudo con hocico beige, crin trenzada de colores y patas fucsia.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "unicornio-rosa",
    categoria: "fantasia",
    ovillo: "turquesa",
    numero: 8,
    nombre: "Unicornio de hocico rosa",
    nombreProvisional: false,
    descripcion:
      "Unicornio blanco con el hocico rosa, la crin de hebras de muchos colores y las patas en fucsia.",
    colores: ["Blanco", "Rosa", "Fucsia", "Multicolor"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/unicornio-rosa/frente.webp",
        alt: "Amigurumi de unicornio blanco con hocico rosa, crin de colores y patas fucsia.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "adorno-unicornio",
    categoria: "fantasia",
    ovillo: "hoja",
    numero: 9,
    nombre: "Adorno de unicornio",
    nombreProvisional: false,
    descripcion:
      "Cabeza de unicornio para colgar, con cuerno amarillo, orejas rosas, una corona de flores y los ojitos cerrados bordados.",
    colores: ["Blanco", "Amarillo", "Rosa", "Lila", "Verde"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/adorno-unicornio/frente.webp",
        alt: "Adorno de amigurumi con forma de cabeza de unicornio, con cuerno amarillo y corona de flores.",
        ancho: 1096,
        alto: 1096,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "muneca-gorro-rosa",
    categoria: "munecas",
    ovillo: "turquesa",
    numero: 10,
    nombre: "Muñeca de gorro rosa",
    nombreProvisional: false,
    descripcion:
      "Muñeca con gorro fucsia de pompón blanco y vestidito fucsia a juego.",
    colores: ["Fucsia", "Beige", "Blanco"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/muneca-gorro-rosa/frente.webp",
        alt: "Amigurumi de muñeca con gorro fucsia con pompón y vestido fucsia.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "muneca-comunion",
    categoria: "munecas",
    ovillo: "coral",
    numero: 11,
    nombre: "Muñeca de comunión",
    nombreProvisional: false,
    descripcion:
      "Muñeca de comunión con vestido blanco, cruz al cuello, corona de flores y melena castaña larga.",
    colores: ["Blanco", "Castaño", "Beige", "Dorado"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/muneca-comunion/frente.webp",
        alt: "Amigurumi de muñeca de comunión con vestido blanco, cruz y corona de flores.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "osita",
    categoria: "animales",
    ovillo: "hoja",
    numero: 12,
    nombre: "Osita",
    nombreProvisional: false,
    descripcion:
      "Osita con corona de flores y vestido rosa de volantes con ribetes blancos.",
    colores: ["Marrón claro", "Rosa", "Blanco"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/osita/frente.webp",
        alt: "Amigurumi de osita con vestido rosa de volantes y corona de flores.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "monjita",
    categoria: "munecas",
    ovillo: "yema",
    numero: 13,
    nombre: "Monjita",
    nombreProvisional: false,
    descripcion:
      "Monjita con toca negra, flequillo pelirrojo, hábito marrón y cordón blanco a la cintura.",
    colores: ["Negro", "Marrón", "Beige", "Blanco"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/monjita/frente.webp",
        alt: "Amigurumi de monja con toca negra, hábito marrón y cordón blanco.",
        ancho: 1177,
        alto: 1177,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "sonajero-osito",
    categoria: "bebes",
    ovillo: "coral",
    numero: 14,
    nombre: "Sonajero de osito",
    nombreProvisional: false,
    descripcion:
      "Sonajero con cabeza de osito blanco, lazo fucsia de volantes y aro de madera.",
    colores: ["Blanco", "Fucsia", "Madera"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/sonajero-osito/frente.webp",
        alt: "Sonajero de amigurumi con cabeza de osito blanco, lazo fucsia y aro de madera.",
        ancho: 1200,
        alto: 1600,
        foco: {
          x: 50,
          y: 38,
        },
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "papa-mama-noel",
    categoria: "navidad",
    ovillo: "hoja",
    numero: 15,
    nombre: "Papá y Mamá Noel",
    nombreProvisional: false,
    descripcion:
      "Dos adornos para colgar del árbol: Papá Noel, con su barba de rizos, y Mamá Noel, con su cofia.",
    colores: ["Crudo", "Rojo", "Blanco", "Dorado"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/papa-mama-noel/frente.webp",
        alt: "Adornos navideños de amigurumi: Papá Noel con barba de rizos y Mamá Noel con cofia, colgados de un soporte dorado.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "totoro",
    categoria: "personajes",
    ovillo: "coral",
    numero: 16,
    nombre: "Totoro",
    nombreProvisional: false,
    descripcion:
      "El personaje de «Mi vecino Totoro», en gris con la tripa en crema y los bigotes bordados.",
    colores: ["Gris", "Crema", "Negro"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/totoro/frente.webp",
        alt: "Amigurumi de Totoro gris con tripa crema y bigotes bordados.",
        ancho: 1244,
        alto: 1244,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "guitarra",
    categoria: "otros",
    ovillo: "turquesa",
    numero: 17,
    nombre: "Guitarra",
    nombreProvisional: false,
    descripcion:
      "Guitarra plana de ganchillo con la silueta bordada en negro, cuerdas de hilo y clavijas de colores.",
    colores: ["Mostaza", "Negro", "Plata"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/guitarra/frente.webp",
        alt: "Guitarra de ganchillo con cuerdas de hilo y clavijas de colores.",
        ancho: 1244,
        alto: 1244,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "sonajero-conejita",
    categoria: "bebes",
    ovillo: "yema",
    numero: 18,
    nombre: "Sonajero de conejita",
    nombreProvisional: false,
    descripcion:
      "Sonajero con cabeza de conejita blanca, pestañas bordadas, lazo rosa de volantes y aro de madera.",
    colores: ["Blanco", "Rosa", "Madera"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/sonajero-conejita/frente.webp",
        alt: "Sonajero de amigurumi con cabeza de conejita blanca, lazo rosa y aro de madera.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "grogu",
    categoria: "personajes",
    ovillo: "coral",
    numero: 19,
    nombre: "Grogu",
    nombreProvisional: false,
    descripcion:
      "Grogu, de «The Mandalorian», en verde agua con su túnica beige.",
    colores: ["Verde agua", "Beige"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/grogu/frente.webp",
        alt: "Amigurumi de Grogu verde agua con túnica beige.",
        ancho: 1288,
        alto: 1288,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "perro",
    categoria: "animales",
    ovillo: "yema",
    numero: 20,
    nombre: "Perrito",
    nombreProvisional: false,
    descripcion:
      "Perrito de orejas largas con pañuelo azul al cuello y almohadillas rosas en las patas.",
    colores: ["Marrón", "Crudo", "Rosa", "Azul"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/perro/frente.webp",
        alt: "Amigurumi de perrito marrón de orejas largas con pañuelo azul y patas con almohadillas rosas.",
        ancho: 1391,
        alto: 1391,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "vaca",
    categoria: "animales",
    ovillo: "turquesa",
    numero: 21,
    nombre: "Vaca",
    nombreProvisional: false,
    descripcion:
      "Vaca blanca con manchas negras, hocico rosa, cuernitos y pezuñas grises.",
    colores: ["Blanco", "Negro", "Rosa", "Gris"],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/vaca/frente.webp",
        alt: "Amigurumi de vaca blanca con manchas negras y hocico rosa.",
        ancho: 1366,
        alto: 1366,
        foco: {
          x: 50,
          y: 50,
        },
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
