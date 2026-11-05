# 🧶 Amigurumis de Carmen: un escaparate tejido a mano

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Desplegado_en-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**🌐 Web en vivo: [amigurumis-carmen.vercel.app](https://amigurumis-carmen.vercel.app)** · 📷 Instagram: [@carmen.crochet_](https://www.instagram.com/carmen.crochet_/)

Web escaparate de los **amigurumis** (muñecos de ganchillo) que teje a mano **Carmen Santamaría González**. Cada pieza nació como un regalo para alguien concreto, y esta web las reúne en una estantería de colores, como los casilleros de una mercería.

No es una tienda: aquí no se vende nada. Es una colección para mirar pieza a pieza.

---

## 📌 Descripción del proyecto

La web presenta a Carmen con su propio texto y muestra **54 piezas** ordenadas por secciones. Cada pieza tiene su ficha con fotos reales recortadas, varias vistas y, cuando existe, un vídeo.

### ✨ Qué se puede hacer en la web

1. **Recorrer la colección** filtrando por sección: Animales, Fantasía, Muñecas, Personajes, Plantas, Bebés, Navidad, Halloween y Otros.
2. **Buscar** por nombre, color o sección. No hace falta poner tildes: «muneca» encuentra «Muñeca».
3. **Abrir la ficha** de cada pieza, con sus vistas (frente, lado, espalda, vídeo…) y la etiqueta de colores y técnica.
4. **Ver las fotos a pantalla completa** y ampliarlas con un toque para apreciar los puntos de cerca.
5. **Pasar a la pieza anterior o siguiente** con las flechas, sin volver a la colección.
6. **Descubrir** las piezas destacadas y las últimas novedades desde la portada.
7. **Aprender** qué es un amigurumi y cómo se lee un patrón de ganchillo.

> **🔗 Todo se puede compartir:** la sección, la búsqueda y la vista elegida quedan en la dirección (`?categoria=navidad`, `?q=unicornio`, `?foto=2`), así que un enlace abre la web justo donde estaba.

---

## 🎨 Diseño

La dirección visual es una **estantería de mercería alegre**: fondo crema con símbolos de ganchillo esparcidos (la X del punto bajo, la V del aumento, el anillo mágico) y cada pieza en un casillero de color.

| Sección | Color del casillero |
| :--- | :--- |
| 🎄 Navidad | Rojo |
| 🦸 Personajes | Azul |
| 🎃 Halloween | Amarillo |
| 🌵 Plantas | Verde |
| 🧸 Otros | Naranja |
| 🦄 Fantasía | Violeta |
| 👧 Muñecas | Rosa |
| 🐻 Animales | Marrón |
| 🍼 Bebés | Turquesa |

Los colores de las secciones los eligió Carmen. Son tonos medios para que el texto oscuro encima tenga al menos **4,5:1 de contraste**. El sistema visual completo está en [`DESIGN.md`](DESIGN.md) y el contexto del producto en [`PRODUCT.md`](PRODUCT.md).

---

## ⚙️ Técnicas y decisiones

| Técnica | Dónde | Para qué |
| :--- | :--- | :--- |
| **Páginas estáticas + Partial Prerendering** | `app/amigurumis/[slug]` | Las 54 fichas se generan al compilar (`generateStaticParams`): cargan al instante y no necesitan servidor. |
| **Catálogo tipado en TypeScript** | `src/data/amigurumis.ts` | Toda la colección vive en un único archivo. Tamaño, hilo, patrón y modelo 3D son opcionales: si no existen, no aparecen. |
| **Recorte automático de fondos** | Fotos en `public/amigurumis/` | Las fotos se procesan con [rembg](https://github.com/danielgatis/rembg) (BiRefNet / ISNet) para quitar el fondo, y se guardan en WebP. |
| **`next/image`** | Casilleros, galería y pantalla completa | Tamaños adaptados a cada pantalla, carga diferida y sin saltos de diseño. |
| **`<dialog>` nativo** | `PantallaCompleta.tsx` | Pantalla completa accesible: Esc cierra, el foco queda atrapado dentro y vuelve solo al cerrar. |
| **Estado en la URL** | `Coleccion.tsx`, `Galeria.tsx` | Filtros, búsqueda y vista elegida con `history.pushState` / `replaceState`: los botones Atrás y Adelante funcionan. |
| **Búsqueda sin tildes** | `Coleccion.tsx` | Normalización Unicode (`NFD` + `\p{Diacritic}`) y coincidencia de todas las palabras. |
| **Movimiento reducido** | `globals.css`, `Galeria.tsx` | Con `prefers-reduced-motion` se quitan las animaciones y el vídeo no arranca solo. |
| **Visor 3D preparado** | `ModelViewer.tsx` | Con [`<model-viewer>`](https://modelviewer.dev): basta con dejar un `.glb` en `public/` para que la ficha muestre la pieza en 3D. |
| **Patrón interactivo preparado** | `PatternExplorer.tsx` | Vuelta a vuelta, con los símbolos de ganchillo, para cuando haya patrones que compartir. |

La interfaz sigue las [Web Interface Guidelines de Vercel](https://vercel.com/design/guidelines): navegación completa con teclado, objetivos táctiles de 44 px o más en móvil, enlace «Saltar al contenido», textos alternativos en todas las fotos y zonas seguras del iPhone.

---

## 📁 Estructura del proyecto

```text
src/
├── app/
│   ├── layout.tsx                # Cabecera, pie y metadatos
│   ├── page.tsx                  # Portada: Carmen, destacadas, origen, patrón, novedades y colección
│   ├── globals.css               # Todo el sistema visual (colores, casilleros, galería…)
│   ├── not-found.tsx             # Página 404
│   └── amigurumis/[slug]/
│       └── page.tsx              # Ficha de cada pieza
├── components/
│   ├── Coleccion.tsx             # Estantería con buscador y filtro por sección
│   ├── Casillero.tsx             # Tarjeta de una pieza
│   ├── Galeria.tsx               # Vistas de la pieza (fotos y vídeo)
│   ├── PantallaCompleta.tsx      # Foto a pantalla completa con zoom
│   ├── Hilo.tsx                  # Hilo de lana que separa secciones
│   ├── ModelViewer.tsx           # Visor 3D (.glb)
│   ├── PatternExplorer.tsx       # Patrón de ganchillo interactivo
│   └── icons.tsx                 # Iconos y símbolos de ganchillo propios
└── data/
    ├── amigurumis.ts             # Catálogo: secciones y las 54 piezas
    └── sitio.ts                  # Texto de Carmen, foto e Instagram
public/
├── carmen.jpg
└── amigurumis/<pieza>/           # Fotos recortadas (frente.webp, lado.webp…) y vídeos
```

---

## 📋 Requisitos

* **Node.js 20** o superior
* **npm**

---

## 🛠️ Arrancar en local

**1. Instalar dependencias:**
```bash
npm install
```

**2. Servidor de desarrollo:**
```bash
npm run dev
```
Se abre en [http://localhost:3000](http://localhost:3000). Para verla desde el móvil en la misma wifi, usa la IP del ordenador (por ejemplo `http://192.168.1.18:3000`).

**3. Compilar como en producción:**
```bash
npm run build
npm run start
```

---

## ➕ Añadir una pieza nueva

1. Deja las fotos (con el fondo ya quitado, en WebP) en `public/amigurumis/<slug>/`, por ejemplo `frente.webp` y `lado.webp`.
2. Añade una entrada al final del array en `src/data/amigurumis.ts`:

```ts
{
  slug: "osito-azul",
  categoria: "animales",
  numero: 55,
  nombre: "Osito azul",
  nombreProvisional: false,
  descripcion: "Osito azul con lazo amarillo.",
  colores: ["Azul", "Amarillo"],
  tamano: null,
  hilo: null,
  fotos: [
    { src: "/amigurumis/osito-azul/frente.webp", alt: "Amigurumi de osito azul con lazo amarillo.",
      ancho: 1400, alto: 1400, foco: { x: 50, y: 50 }, recorte: true },
  ],
  modelo3d: null,
  patron: null,
},
```

La pieza aparece sola en la colección, en el buscador, en el filtro de su sección y en las Novedades. Para destacarla en la portada, añade `destacada: true`.

---

## 🚀 Despliegue

La web está publicada en **Vercel** (plan gratuito). Cada cambio que llega a la rama `main` se publica automáticamente en uno o dos minutos.

---

## 💛 Créditos

* **Amigurumis, fotos y textos:** Carmen Santamaría González ([@carmen.crochet_](https://www.instagram.com/carmen.crochet_/)).
* **Desarrollo web:** Javier Razola Santamaría.

*Hecho a mano, con dedicación y mucho corazón.* ❤️🧶
