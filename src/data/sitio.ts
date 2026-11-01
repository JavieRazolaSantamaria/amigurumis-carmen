export const sitio = {
  autora: "Carmen Santamaría",
  autoraCompleta: "Carmen Santamaría González",
  /** Texto de presentación de la portada. Provisional: sustituir por el que escriba Carmen. */
  presentacion:
    "Teje amigurumis a mano: muñecos de ganchillo hechos punto a punto, con hilos de colores y mucha paciencia. Aquí está su colección, y cualquiera de ellos puede tejerlo para ti.",
  foto: {
    src: "/carmen.jpg",
    alt: "Carmen Santamaría González sonriendo delante de una buganvilla en flor.",
    ancho: 768,
    alto: 1024,
  },
  descripcion: "Amigurumis tejidos a mano por Carmen Santamaría González. Mira la colección y pide el tuyo.",
  /**
   * Canal para encargos. Mientras sea null, la web explica que el contacto
   * está pendiente. Ejemplos: { tipo: "whatsapp", url: "https://wa.me/34600000000" }
   * o { tipo: "instagram", url: "https://instagram.com/usuario" }.
   */
  contacto: null as null | { tipo: "whatsapp" | "instagram" | "email"; url: string },
};
