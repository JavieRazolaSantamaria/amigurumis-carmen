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

/**
 * Secciones de la colección. Cada una tiene su color de casillero (clase .ov-<id>
 * en globals.css). Para añadir una (p. ej. "verano"), se añade aquí y su color allí.
 */
export const categorias = [
  { id: "animales", nombre: "Animales" },
  { id: "fantasia", nombre: "Fantasía" },
  { id: "munecas", nombre: "Muñecas" },
  { id: "personajes", nombre: "Personajes" },
  { id: "plantas", nombre: "Plantas" },
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
  /** Vídeo corto de la pieza (MP4 sin sonido); sale como una vista más de la galería. */
  video?: Video;
  /** Sale en "Destacadas" de la portada. */
  destacada?: boolean;
};

export type Video = {
  src: string;
  /** Fotograma que se ve antes de que arranque. */
  poster: string;
  /** Qué se ve en el vídeo, para quien no puede verlo. */
  descripcion: string;
};

export const amigurumis: Amigurumi[] = [
  {
    slug: "wombat",
    categoria: "animales",
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
    destacada: true,
    categoria: "halloween",
    numero: 2,
    nombre: "Brujita",
    nombreProvisional: false,
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
    destacada: true,
    categoria: "personajes",
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
  // lote3-inicio
  {
    slug: "margarita",
    categoria: "plantas",
    numero: 22,
    nombre: "Margarita en maceta",
    nombreProvisional: false,
    descripcion: "Margarita sonriente de pétalos blancos y botón amarillo, con tallo y hojas verdes, plantada en una maceta granate.",
    colores: [
      "Blanco",
      "Amarillo",
      "Verde",
      "Granate",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/margarita/frente.webp",
        alt: "Margarita de ganchillo con cara sonriente, pétalos blancos y tallo verde en una maceta granate.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/margarita/lado.webp",
        alt: "La margarita de ganchillo vista de lado, con una hoja en el tallo.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Lado",
      },
      {
        src: "/amigurumis/margarita/noche.webp",
        alt: "La margarita de ganchillo en su maceta, fotografiada de noche.",
        ancho: 985,
        alto: 985,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "De noche",
      },
    ],
    modelo3d: null,
    patron: null,
    destacada: true,
  },
  {
    slug: "cactus",
    categoria: "plantas",
    numero: 23,
    nombre: "Cactus",
    nombreProvisional: false,
    descripcion: "Cactus verde de dos brazos con carita sonriente bordada, en una maceta granate.",
    colores: [
      "Verde",
      "Granate",
      "Marrón",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/cactus/frente.webp",
        alt: "Cactus de ganchillo verde con dos brazos y carita sonriente en maceta granate.",
        ancho: 935,
        alto: 935,
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
    slug: "suculentas",
    categoria: "plantas",
    numero: 24,
    nombre: "Suculentas con ojitos",
    nombreProvisional: false,
    descripcion: "Suculentas de hojas tejidas una a una, en macetas color crudo con ojos de pestañas verdes.",
    colores: [
      "Verde",
      "Verde azulado",
      "Crudo",
      "Marrón",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/suculentas/frente.webp",
        alt: "Suculenta de ganchillo verde en una maceta cruda con ojos y pestañas.",
        ancho: 999,
        alto: 999,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/suculentas/arriba.webp",
        alt: "La suculenta de ganchillo vista desde arriba, con sus hojas en roseta.",
        ancho: 1021,
        alto: 1021,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Desde arriba",
      },
      {
        src: "/amigurumis/suculentas/pareja.webp",
        alt: "Dos suculentas de ganchillo, una verde y otra verde azulada, en macetas con ojitos.",
        ancho: 1385,
        alto: 1385,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Las dos",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "mono",
    categoria: "animales",
    numero: 25,
    nombre: "Monito",
    nombreProvisional: false,
    descripcion: "Monito marrón de orejas grandes con la cara y la tripa en beige y botones de colores en la barriga.",
    colores: [
      "Marrón",
      "Beige",
      "Multicolor",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/mono/frente.webp",
        alt: "Amigurumi de monito marrón sentado, con orejas grandes y botones de colores en la tripa.",
        ancho: 959,
        alto: 959,
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
    slug: "dinosaurio",
    categoria: "animales",
    numero: 26,
    nombre: "Dinosaurio",
    nombreProvisional: false,
    descripcion: "Dinosaurio rojo con cresta de pinchos amarillos por el lomo y la cola, y patas amarillas.",
    colores: [
      "Rojo",
      "Amarillo",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/dinosaurio/frente.webp",
        alt: "Amigurumi de dinosaurio rojo con pinchos amarillos en el lomo.",
        ancho: 977,
        alto: 977,
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
    slug: "aguacates",
    categoria: "otros",
    numero: 27,
    nombre: "Aguacates",
    nombreProvisional: false,
    descripcion: "Pareja de aguacates sonrientes con piel verde, carne amarilla, hueso marrón y mofletes rosas. También en versión llavero.",
    colores: [
      "Verde",
      "Amarillo",
      "Marrón",
      "Rosa",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/aguacates/frente.webp",
        alt: "Dos aguacates de ganchillo sonrientes con hueso marrón y mofletes rosas.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/aguacates/llavero.webp",
        alt: "Aguacate de ganchillo en versión llavero.",
        ancho: 897,
        alto: 897,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Llavero",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "patucos",
    categoria: "bebes",
    numero: 28,
    nombre: "Patucos de deportiva",
    nombreProvisional: false,
    descripcion: "Patucos de bebé rojos con forma de zapatilla, suela amarilla y cordones de verdad.",
    colores: [
      "Rojo",
      "Amarillo",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/patucos/frente.webp",
        alt: "Patucos de bebé de ganchillo rojos con suela y cordones amarillos.",
        ancho: 1180,
        alto: 1180,
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
    slug: "patines",
    categoria: "otros",
    numero: 29,
    nombre: "Patines",
    nombreProvisional: false,
    descripcion: "Patines en miniatura rojos con ruedas de estrellas y cordones en crudo.",
    colores: [
      "Rojo",
      "Crudo",
      "Negro",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/patines/frente.webp",
        alt: "Dos patines de ganchillo rojos en miniatura con cordones crudos y ruedas.",
        ancho: 745,
        alto: 745,
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
    slug: "perrito-orejas-verdes",
    categoria: "animales",
    numero: 30,
    nombre: "Perrito de orejas verdes",
    nombreProvisional: false,
    descripcion: "Perrito amarillo de patas largas con orejas y patitas verdes, una mancha verde en el ojo y lazo rojo de lunares.",
    colores: [
      "Amarillo",
      "Verde",
      "Gris",
      "Rojo",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/perrito-orejas-verdes/frente.webp",
        alt: "Amigurumi de perrito amarillo de patas largas con orejas verdes y lazo rojo de lunares.",
        ancho: 1106,
        alto: 1106,
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
    slug: "muneca-sanitaria",
    categoria: "munecas",
    numero: 31,
    nombre: "Muñeca sanitaria",
    nombreProvisional: false,
    descripcion: "Muñeca de melena larga en tirabuzones con uniforme blanco, fonendoscopio al cuello y su tarjeta identificativa.",
    colores: [
      "Blanco",
      "Castaño",
      "Beige",
      "Azul",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/muneca-sanitaria/frente.webp",
        alt: "Muñeca de ganchillo con uniforme sanitario blanco, fonendoscopio y tarjeta identificativa.",
        ancho: 1397,
        alto: 1397,
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
    slug: "sirena",
    categoria: "fantasia",
    numero: 32,
    nombre: "Sirena",
    nombreProvisional: false,
    descripcion: "Sirena de pelo azul y negro en tirabuzones, con cola y top azules.",
    colores: [
      "Azul",
      "Negro",
      "Beige",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/sirena/frente.webp",
        alt: "Amigurumi de sirena con pelo rizado azul y negro y cola azul.",
        ancho: 865,
        alto: 1400,
        foco: {
          x: 50,
          y: 40,
        },
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "unicornio-alas",
    categoria: "fantasia",
    numero: 33,
    nombre: "Unicornio con alas",
    nombreProvisional: false,
    descripcion: "Unicornio en crudo con alas, cuerno de colores y pezuñas en mostaza.",
    colores: [
      "Crudo",
      "Mostaza",
      "Multicolor",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/unicornio-alas/frente.webp",
        alt: "Amigurumi de unicornio crudo sentado, con alas y pezuñas mostaza.",
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
    slug: "unicornio-bufanda",
    categoria: "fantasia",
    numero: 34,
    nombre: "Unicornio de bufanda",
    nombreProvisional: false,
    descripcion: "Unicornio amarillo pálido con crin de rizos de colores, cuerno naranja y bufanda coral.",
    colores: [
      "Amarillo",
      "Coral",
      "Naranja",
      "Multicolor",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/unicornio-bufanda/frente.webp",
        alt: "Amigurumi de unicornio amarillo con crin rizada de colores y bufanda coral.",
        ancho: 1327,
        alto: 1327,
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
    slug: "mariposa",
    categoria: "animales",
    numero: 35,
    nombre: "Mariposa",
    nombreProvisional: false,
    descripcion: "Mariposa de cuerpo blanco con antenas y alas rosas con espirales.",
    colores: [
      "Blanco",
      "Rosa",
      "Gris",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/mariposa/frente.webp",
        alt: "Mariposa de ganchillo blanca con alas rosas y antenas.",
        ancho: 725,
        alto: 725,
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
    slug: "conejito-peto",
    categoria: "animales",
    numero: 36,
    nombre: "Conejito de peto",
    nombreProvisional: false,
    descripcion: "Conejito de orejas largas con peto rojo y una zanahoria bordada en el bolsillo.",
    colores: [
      "Beige",
      "Rojo",
      "Naranja",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/conejito-peto/frente.webp",
        alt: "Amigurumi de conejito beige de orejas largas con peto rojo.",
        ancho: 1246,
        alto: 1246,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/conejito-peto/espalda.webp",
        alt: "El conejito de espaldas, con los tirantes del peto cruzados.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "De espaldas",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "rana",
    categoria: "animales",
    numero: 37,
    nombre: "Rana",
    nombreProvisional: false,
    descripcion: "Rana verde redondita con la tripa en amarillo.",
    colores: [
      "Verde",
      "Amarillo",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/rana/frente.webp",
        alt: "Amigurumi de rana verde con tripa amarilla.",
        ancho: 598,
        alto: 598,
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
    slug: "ballenita",
    categoria: "animales",
    numero: 38,
    nombre: "Ballenita celeste",
    nombreProvisional: false,
    descripcion: "Ballenita azul claro con la tripa blanca y las aletas a los lados.",
    colores: [
      "Azul claro",
      "Blanco",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/ballenita/frente.webp",
        alt: "Amigurumi de ballenita azul claro con tripa blanca.",
        ancho: 850,
        alto: 850,
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
    slug: "leon",
    categoria: "animales",
    numero: 39,
    nombre: "León",
    nombreProvisional: false,
    descripcion: "León en beige con melena de lana cardada, hocico claro y nariz marrón.",
    colores: [
      "Beige",
      "Marrón",
      "Crudo",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/leon/frente.webp",
        alt: "Amigurumi de león beige con melena esponjosa marrón.",
        ancho: 878,
        alto: 878,
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
    slug: "arbol-navidad",
    categoria: "navidad",
    numero: 40,
    nombre: "Árbol de Navidad",
    nombreProvisional: false,
    descripcion: "Árbol de Navidad verde tejido en capas, con bolitas de colores y una anilla dorada en la punta.",
    colores: [
      "Verde",
      "Dorado",
      "Multicolor",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/arbol-navidad/frente.webp",
        alt: "Árbol de Navidad de ganchillo verde con bolitas de colores.",
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
    slug: "calabaza-brujita",
    categoria: "halloween",
    numero: 41,
    nombre: "Calabaza con sombrero de bruja",
    nombreProvisional: false,
    descripcion: "Calabaza naranja con cara de Halloween bordada y sombrero de bruja lila con banda negra. Va en llavero y tiene compañía: otra calabaza y un fantasmita.",
    colores: [
      "Naranja",
      "Lila",
      "Negro",
      "Verde",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/calabaza-brujita/pareja.webp",
        alt: "Calabaza de ganchillo con cara de Halloween y sombrero de bruja lila, junto a otra calabaza con tallo verde.",
        ancho: 926,
        alto: 926,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Las dos",
      },
      {
        src: "/amigurumis/calabaza-brujita/frente.webp",
        alt: "La calabaza con sombrero de bruja sola, de frente.",
        ancho: 349,
        alto: 349,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "De frente",
      },
      {
        src: "/amigurumis/calabaza-brujita/fantasma.webp",
        alt: "La calabaza con sombrero junto a un fantasmita blanco de ganchillo.",
        ancho: 745,
        alto: 745,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Con el fantasma",
      },
    ],
    modelo3d: null,
    patron: null,
    video: {
      src: "/amigurumis/calabaza-brujita/video.mp4",
      poster: "/amigurumis/calabaza-brujita/video-poster.webp",
      descripcion: "Una vela encendida en la oscuridad y, al encenderse la luz, aparece la calabaza con sombrero de bruja.",
    },
  },
  {
    slug: "ratoncito",
    categoria: "animales",
    numero: 42,
    nombre: "Ratoncito",
    nombreProvisional: false,
    descripcion: "Ratoncito gris de orejas grandes con naricita y patitas rosas.",
    colores: [
      "Gris",
      "Rosa",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/ratoncito/frente.webp",
        alt: "Amigurumi de ratoncito gris de orejas grandes y patas rosas.",
        ancho: 627,
        alto: 627,
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
    slug: "llaveros",
    categoria: "otros",
    numero: 43,
    nombre: "Llaveros de animalitos",
    nombreProvisional: false,
    descripcion: "Animalitos pequeños para llevar en las llaves: un osito, un perrito, un zorrito, un águila y un husky.",
    colores: [
      "Beige",
      "Naranja",
      "Blanco",
      "Marrón",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/llaveros/osito.webp",
        alt: "Llavero de ganchillo con forma de osito.",
        ancho: 588,
        alto: 588,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Osito",
      },
      {
        src: "/amigurumis/llaveros/perrito.webp",
        alt: "Llavero de ganchillo con forma de perrito sentado.",
        ancho: 580,
        alto: 580,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Perrito",
      },
      {
        src: "/amigurumis/llaveros/zorrito.webp",
        alt: "Llavero de ganchillo con forma de zorrito.",
        ancho: 424,
        alto: 424,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Zorrito",
      },
      {
        src: "/amigurumis/llaveros/aguila.webp",
        alt: "Llavero de ganchillo con forma de águila de cabeza blanca y pico amarillo.",
        ancho: 585,
        alto: 585,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Águila",
      },
      {
        src: "/amigurumis/llaveros/husky.webp",
        alt: "Llavero de ganchillo con la cara de un husky gris y blanco.",
        ancho: 926,
        alto: 926,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Husky",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  // lote3-fin
  // lote4-inicio
  {
    slug: "muneca-vestido-rosa",
    categoria: "munecas",
    numero: 44,
    nombre: "Muñeca de vestido rosa",
    nombreProvisional: false,
    descripcion: "Muñeca morena de melena castaña con vestido rosa calado, zapatitos a juego, lacito en el pelo y un bolsito turquesa.",
    colores: [
      "Rosa",
      "Marrón",
      "Castaño",
      "Turquesa",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/muneca-vestido-rosa/frente.webp",
        alt: "Muñeca de ganchillo morena con melena castaña, vestido rosa y bolsito turquesa.",
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
    slug: "muneca-pelirroja",
    categoria: "munecas",
    numero: 45,
    nombre: "Muñeca pelirroja",
    nombreProvisional: false,
    descripcion: "Muñeca de melena roja en rizos con una flor blanca en el pelo, vestido rojo y blanco y zapatos rojos.",
    colores: [
      "Rojo",
      "Blanco",
      "Beige",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/muneca-pelirroja/frente.webp",
        alt: "Muñeca de ganchillo con melena roja rizada, flor blanca en el pelo y vestido rojo.",
        ancho: 1335,
        alto: 1335,
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
    slug: "angelito",
    categoria: "navidad",
    numero: 46,
    nombre: "Angelito de Navidad",
    nombreProvisional: false,
    descripcion: "Angelito con moño, vestido color crema y alas doradas, con las manos juntas.",
    colores: [
      "Crudo",
      "Castaño",
      "Dorado",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/angelito/frente.webp",
        alt: "Angelito de ganchillo con moño, vestido crema y alas doradas.",
        ancho: 1057,
        alto: 1057,
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
    slug: "dinosaurio-azul",
    categoria: "animales",
    numero: 47,
    nombre: "Dinosaurio azul",
    nombreProvisional: false,
    descripcion: "Dinosaurio azul vaquero con un cuerno gris en la cabeza, ojos de seguridad y patitas cortas.",
    colores: [
      "Azul",
      "Gris",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/dinosaurio-azul/frente.webp",
        alt: "Amigurumi de dinosaurio azul con un cuerno gris en la cabeza.",
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
    slug: "adorno-reno",
    categoria: "navidad",
    numero: 48,
    nombre: "Adorno de reno",
    nombreProvisional: false,
    descripcion: "Cabeza de reno para colgar en el árbol, con cuernos marrones, ojos cerrados y nariz roja.",
    colores: [
      "Beige",
      "Marrón",
      "Rojo",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/adorno-reno/frente.webp",
        alt: "Adorno navideño de ganchillo con cabeza de reno y nariz roja.",
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
    slug: "sonajero-osito-rojo",
    categoria: "bebes",
    numero: 49,
    nombre: "Sonajero de osito con volante rojo",
    nombreProvisional: false,
    descripcion: "Sonajero de bebé con cabeza de osito en crudo, volante rojo al cuello y anilla de madera.",
    colores: [
      "Crudo",
      "Rojo",
      "Marrón",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/sonajero-osito-rojo/frente.webp",
        alt: "Sonajero de ganchillo con cabeza de osito, volante rojo y anilla de madera.",
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
    slug: "pulpitos",
    categoria: "bebes",
    numero: 50,
    nombre: "Pulpitos",
    nombreProvisional: false,
    descripcion: "Pulpitos de ojos dormidos con los tentáculos en tirabuzón, uno rosa y otro celeste.",
    colores: [
      "Rosa",
      "Celeste",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/pulpitos/rosa.webp",
        alt: "Pulpito de ganchillo rosa con ojos cerrados y tentáculos en espiral.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Rosa",
      },
      {
        src: "/amigurumis/pulpitos/celeste.webp",
        alt: "Pulpito de ganchillo celeste con ojos cerrados y tentáculos en espiral.",
        ancho: 1294,
        alto: 1294,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Celeste",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "llaveros-limones",
    categoria: "otros",
    numero: 51,
    nombre: "Llaveros de limones",
    nombreProvisional: false,
    descripcion: "Tres limones amarillos con hojitas verdes y cara de sueño, cada uno en su llavero.",
    colores: [
      "Amarillo",
      "Verde",
      "Negro",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/llaveros-limones/frente.webp",
        alt: "Tres llaveros de ganchillo con forma de limón amarillo, hojas verdes y cara dormida.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Frente",
      },
      {
        src: "/amigurumis/llaveros-limones/tumbadas.webp",
        alt: "Los tres llaveros de limón tumbados.",
        ancho: 1400,
        alto: 1400,
        foco: {
          x: 50,
          y: 50,
        },
        recorte: true,
        vista: "Tumbadas",
      },
    ],
    modelo3d: null,
    patron: null,
  },
  {
    slug: "caballo",
    categoria: "animales",
    numero: 52,
    nombre: "Caballito de crin blanca",
    nombreProvisional: false,
    descripcion: "Caballito marrón con una larga crin blanca, hocico claro y cascos negros.",
    colores: [
      "Marrón",
      "Blanco",
      "Beige",
      "Negro",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/caballo/frente.webp",
        alt: "Amigurumi de caballito marrón con la crin larga y blanca.",
        ancho: 977,
        alto: 977,
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
    slug: "libelula",
    categoria: "animales",
    numero: 53,
    nombre: "Libélula",
    nombreProvisional: false,
    descripcion: "Libélula de cuerpo marrón con dos pares de alas celestes.",
    colores: [
      "Marrón",
      "Celeste",
    ],
    tamano: null,
    hilo: null,
    fotos: [
      {
        src: "/amigurumis/libelula/frente.webp",
        alt: "Libélula de ganchillo con cuerpo marrón y alas celestes.",
        ancho: 1105,
        alto: 1105,
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
  // lote4-fin
];

export function getAmigurumi(slug: string) {
  return amigurumis.find((a) => a.slug === slug);
}

export const destacadas = amigurumis.filter((a) => a.destacada);

/** Las tres últimas piezas añadidas (sin repetir las destacadas), la más reciente primero. */
export const novedades = amigurumis
  .filter((a) => !a.destacada)
  .slice(-3)
  .reverse();

/** Piezas anterior y siguiente en el orden de la colección (da la vuelta en los extremos). */
export function vecinos(slug: string) {
  const i = amigurumis.findIndex((a) => a.slug === slug);
  const n = amigurumis.length;
  return { anterior: amigurumis[(i - 1 + n) % n], siguiente: amigurumis[(i + 1) % n] };
}

export function numeroPatron(n: number) {
  return `Nº ${String(n).padStart(2, "0")}`;
}

export function rangoVueltas(p: PasoPatron) {
  return p.desde === p.hasta ? `V${p.desde}` : `V${p.desde}–V${p.hasta}`;
}
