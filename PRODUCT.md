# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript, desplegable en Vercel. Elegido por el usuario a partir de la recomendación. Sin backend por ahora: el catálogo vive en archivos de datos del repositorio.

## Users

- **Visitantes que descubren los amigurumis** (familia, amistades, gente que llega por redes sociales). Quieren conocer a Carmen y ver las piezas de cerca.
- **Personas que tejen** y quieren ver cómo está hecho un amigurumi (el patrón). Aún no se sabe si los patrones serán públicos.
- **Carmen Santamaría**, la autora, y su hijo, que mantiene la web y añade fotos y piezas.

## Product Purpose

Escaparate de los amigurumis tejidos a mano por Carmen Santamaría González. **No se vende nada**: ni tienda, ni encargos, ni contacto comercial. El éxito es que quien la visite vea el trabajo con detalle, entienda que cada pieza está hecha a mano y aprenda algo sobre los amigurumis.

## Positioning

Cada pieza es un original hecho a mano por una persona concreta. La web no es una tienda genérica: es la colección de una autora, con fotos reales de cada pieza y, en el futuro, un visor 3D para girarla y su patrón de ganchillo.

## Operating Context

- Las fotos se hacen con un iPhone, en casa, normalmente con la pieza sostenida en la mano.
- Las piezas se añaden poco a poco; al principio el catálogo tendrá muy pocas.

## Capabilities and Constraints

- Catálogo de amigurumis con una ficha por pieza: fotos, descripción y datos de la pieza.
- Secciones de la colección: Animales, Fantasía, Muñecas, Personajes, Plantas, Bebés, Navidad, Halloween y Otros (`categorias` en `src/data/amigurumis.ts`).
- Fotos de las piezas con el fondo quitado (rembg) para que salgan del casillero.
- **Visor 3D (listo, sin modelos aún):** aparece solo si existe el .glb de la pieza.
- **Regla: nada incompleto a la vista.** Patrón, 3D, tamaño e hilo solo se muestran cuando existen; nunca textos de "en preparación", "por completar" ni contenido de ejemplo (decisión del usuario).
- **Patrón (listo, sin patrones aún):** la sección aparece solo si la pieza tiene su patrón real.
- Sin venta: no mostrar precios, encargos, botones de compra ni contacto comercial (decisión del usuario).
- Sección "De dónde viene el amigurumi": origen japonés del término y de la técnica.

## Brand Commitments

- La autora es **Carmen Santamaría González** (nombre completo en la portada, "Carmen Santamaría" en cabecera). No hay nombre de marca todavía.
- La portada muestra la foto de Carmen (`public/carmen.jpg`), elegida por el usuario.
- El usuario quiere un tono **alegre**; descartó la estética de cuadrícula/hoja técnica.
- Idioma: español.

## Evidence on Hand

- `public/carmen.jpg` — foto de Carmen delante de una buganvilla.
- `public/amigurumis/` — fotos reales hechas por el usuario. 43 piezas (Nº 01–43), casi todas con el fondo quitado con rembg; el sonajero de osito y la sirena van con su foto original. La calabaza con sombrero de bruja (Nº 41) tiene además un vídeo corto sin sonido como vista de la galería. Las fotos sin procesar se guardan en `fotos-originales/` (fuera de git). Nombres y descripciones de las piezas 05–43 deducidos de las fotos: pendientes de confirmar con Carmen. El 3D con IA (Tripo/TRELLIS) se probó y no convence aún; el visor está listo para cuando haya un .glb.
- La presentación de la portada es el texto que escribió Carmen (solo se corrigieron tildes). Su Instagram: @carmen.crochet_ (enlazado en la portada y el pie).
- No existen testimonios, reseñas, cifras de ventas, precios ni patrones reales: no inventarlos. No mostrar contenido de ejemplo.

## Product Principles

1. La pieza manda: las fotos y el detalle del tejido son el contenido principal.
2. Hecho a mano, por alguien con nombre: la web transmite autoría y oficio, no catálogo industrial.
3. Escaparate, no tienda: nada de lenguaje de venta.
4. Crecer sin rehacer: añadir una pieza nueva, un modelo 3D o un patrón es añadir datos, no rediseñar.
