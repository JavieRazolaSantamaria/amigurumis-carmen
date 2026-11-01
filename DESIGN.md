---
name: Amigurumis de Carmen Santamaría
description: Estantería de mercería alegre, con cuatro colores de ovillo sobre blanco limpio.
colors:
  white: "#fdfdfb"
  ink: "#2a1f33"
  ink-soft: "#5d5266"
  line-soft: "#e7e1ea"
  yema: "#ffc83d"
  yema-wash: "#fff3cc"
  coral: "#ff6f5b"
  coral-deep: "#f2523c"
  coral-wash: "#ffe3de"
  turquesa: "#22b3a6"
  turquesa-wash: "#d5f2ee"
  hoja: "#7cc35b"
  hoja-wash: "#e4f3dc"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  notation:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  focus: "6px"
  sm: "12px"
  md: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(48px, 7vw, 96px)"
  gap: "16px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.coral-deep}"
  button-ghost:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  cubby:
    backgroundColor: "{colors.yema}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  round-selected:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    typography: "{typography.notation}"
    rounded: "{rounded.sm}"
---

# Design System: Amigurumis de Carmen Santamaría

## Overview

La web es la estantería de una mercería: blanco limpio y luminoso, y los colores llegan en bloques, como ovillos ordenados por casilleros. Cada amigurumi ocupa su casillero de color y su ficha funciona como la etiqueta de un ovillo. Un hilo de lana turquesa baja entre secciones y se desenrolla al hacer scroll.

La portada presenta primero a Carmen: su foto en un arco amarillo, con un ovillo a los pies, y su nombre completo en grande. El tono es alegre y cercano, sin cuadrícula de fondo ni estética técnica.

## Colors

Estrategia de paleta completa: cuatro colores de ovillo con papeles fijos, más tinta berenjena.

### Primary
- **Coral** (`coral`): acción principal (pedir), vuelta elegida en el patrón y apellidos del titular (`coral-deep`).

### Secondary
- **Turquesa** (`turquesa`): el hilo, el ovillo del retrato, la banda de encargos y el anillo de foco.
- **Amarillo yema** (`yema`): arco del retrato, números de los pasos y fondo de selección de texto.
- **Verde hoja** (`hoja`): vueltas marcadas como tejidas.

### Neutral
- `white` de fondo, `ink` para texto y superficies oscuras (pie, caja de contacto), `ink-soft` para texto secundario, `line-soft` para separadores. Cada color tiene su versión `-wash` para fondos suaves y casilleros vacíos.

### Named Rules
- **Un ovillo por casillero.** Cada pieza tiene asignado un color de ovillo (`ovillo` en los datos) que tiñe su casillero, su ficha y su patrón.
- **El hilo manda.** Las fotos nunca llevan filtros ni tintes.
- **Texto en tinta sobre color.** Sobre amarillo, coral, turquesa o verde el texto va en `ink`, nunca en blanco.

## Typography

- **Bricolage Grotesque** (ejes de anchura y tamaño óptico): titulares en 800 y un poco expandidos, texto en 400.
- **Courier Prime**: solo notación de patrones y números de pieza (Nº 01, V3: (1 pb, 1 aum) × 6).

### Hierarchy
display (nombre de Carmen, nombre de pieza) → heading (secciones) → title (casilleros, pasos) → lede → body → small → notation.

## Layout

Contenedor de 1320 px con `gutter`. Cabeceras de sección en dos columnas (título / explicación), una sola en ≤900 px. Estantería de 3 casilleros (2 en tableta, 1 en móvil) apoyada sobre una balda de tinta. Encargos dentro de una banda turquesa de esquinas muy redondeadas.

## Elevation & Depth

Sin sombras. La profundidad la dan los bloques de color y el contraste blanco/tinta. Movimiento en hover: el casillero sube 4 px y gira levemente, como al sacar un ovillo.

## Shapes

Todo redondeado: casilleros y cajas a `md` (20 px), filas y avisos a `sm`, botones y etiquetas en píldora. El arco del retrato y los círculos de las fotos de los casilleros vienen del ovillo.

## Components

### Buttons
Píldoras de 52 px con borde de tinta de 2 px. Primario coral con texto en tinta; secundario blanco que se invierte a tinta en hover.

### Casillero (cubby)
Bloque del color de ovillo con la foto en círculo, número en notación, nombre y "Ver ficha". Los vacíos usan el `-wash`, un círculo discontinuo y un ovillo dibujado: "En el ganchillo".

### Etiqueta de ovillo
En la ficha: caja con borde de tinta, cabecera del color de la pieza (nombre y número) y filas de datos. Lo que falta se muestra como "Por completar" en cursiva.

### Hilo (firma)
SVG de una hebra entre secciones, trazo turquesa de 4 px. Se desenrolla con `animation-timeline: view()` donde el navegador lo admite; si no, o con reduced-motion, aparece completo.

### Patrón interactivo
Silueta de barras (una por vuelta, ancho proporcional a los puntos) sobre el `-wash` de la pieza. Vuelta elegida en coral (también en la URL `?v=`), vueltas tejidas en tinta y su casilla en verde hoja.

## Do's and Don'ts

### Do:
- Dar a cada pieza nueva su color de ovillo y alternarlos en la estantería.
- Mantener el texto en tinta sobre los colores.
- Etiquetar como "provisional" o "de ejemplo" lo que aún no es real.

### Don't:
- No volver a la cuadrícula de fondo ni a la estética de hoja técnica.
- No poner rótulos encima de los titulares.
- No usar sombras, degradados ni texto blanco sobre amarillo, coral o verde.
- No inventar precios, reseñas, medidas ni patrones.
