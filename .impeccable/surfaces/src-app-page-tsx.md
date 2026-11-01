---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/amigurumis/[slug]/page.tsx"]
---

# Surface brief: inicio + ficha de amigurumi

Scope: página de inicio (`/`) y ficha de cada pieza (`/amigurumis/[slug]`). Modo: Experience.
Audiencia: familia, amistades y gente que llega desde redes, casi siempre en el móvil. Acción: conocer a Carmen, ver las piezas y pedir una por encargo.
Brief del usuario (manda): foto de Carmen con su nombre completo y una descripción en la portada; más alegre; sin cuadrícula de fondo.
Contenido real: `public/carmen.jpg`, `public/amigurumis/marmota/frente.jpg`. Pendiente: descripción real de Carmen, nombre de la pieza, contacto, tamaño e hilo. Patrón mostrado = ejemplo etiquetado.

## Direction contract

THESIS: La web es la estantería de una mercería: cada amigurumi ocupa su casillero de color como un ovillo ordenado, y su ficha es la etiqueta de ovillo con sus datos. Rechaza tanto la tienda pastel de tarjetas como la hoja técnica en blanco y negro.

OWN-WORLD: Fondo blanco limpio; cuatro colores de ovillo a escala de bloque (amarillo yema, coral, turquesa, verde hoja) más tinta berenjena. Casilleros con esquina de 20 px, bandas de etiqueta de ovillo con datos, un hilo de lana (trazo SVG) que se desenrolla entre secciones. Tipografía: Bricolage Grotesque (titulares anchos y redondos, texto); Courier Prime solo para notación de patrón.

STORY: Quien entra conoce primero a Carmen (su foto, su nombre, qué hace), después recorre la estantería de piezas, entiende cómo se teje y sabe cómo pedir una.

FIRST VIEWPORT: Escritorio: a la izquierda, nombre "Carmen Santamaría González" enorme, descripción y acciones "Pide el tuyo" (coral) y "Ver la colección". A la derecha, su foto en un arco sobre un bloque amarillo, con un ovillo turquesa del que sale el hilo que baja por la página. Móvil: foto arriba, nombre y acciones debajo.

FORM: Mercería de ovillos, puesto 2 de mi lista (re-roll 1, elegido por el usuario). seed:12cb7d5c0f8d701a
Interacción firma: el hilo se desenrolla con el scroll (animation-timeline: scroll; dibujado completo como valor por defecto y con reduced-motion). En la ficha, el patrón interactivo colorea con el color de ovillo de la pieza la vuelta elegida en la silueta.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
