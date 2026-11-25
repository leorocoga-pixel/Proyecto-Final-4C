# Koria&Garcia Banquetes

Sitio web de **Koria&Garcia Banquetes**, un negocio de banquetes. Su objetivo es claro: que los clientes conozcan el **menú decembrino**, elijan un paquete (pavo, romeritos, pierna o costilla) y **coticen por WhatsApp** en pocos clics.

Proyecto escolar hecho **solo con HTML y CSS** (sin Bootstrap ni otros frameworks), con un servidor local en **Node.js** y publicado en **Vercel**.

## Páginas

| Página | Archivo | Qué hace |
|---|---|---|
| Inicio | `public/index.html` | Presentación, carrusel de paquetes, cómo pedir, extras, video y llamada a la acción |
| Menú | `public/menu.html` | Tabla de paquetes, pastas, ensaladas, postres, extras y menú impreso (PDF) |
| Contacto | `public/contacto.html` | Teléfonos, enlaces a WhatsApp y formulario que abre WhatsApp con el mensaje |
| Error 404 | `public/404.html` | Página para rutas que no existen |

## Estructura del proyecto

```
koria-garcia-banquetes/
├── public/                    ← todo lo que se publica
│   ├── index.html
│   ├── menu.html
│   ├── contacto.html
│   ├── 404.html
│   ├── css/
│   │   └── styles.css         ← una sola hoja de estilos, ordenada por secciones
│   ├── img/
│   │   ├── logo-koria-garcia.png
│   │   ├── marca.svg          ← rombo con cubiertos (logo pequeño y favicon)
│   │   ├── paquetes/          ← ilustraciones de cada paquete
│   │   └── menu/              ← vista previa del menú impreso
│   ├── video/                 ← video y póster
│   ├── docs/                  ← menú en PDF
│   └── fonts/                 ← tipografías locales (Roboto condensada y Poppins)
├── server.js                  ← servidor local de Node.js
├── package.json
├── vercel.json                ← indica a Vercel que publique la carpeta public
├── .gitignore
└── README.md
```

## Cómo probarlo en tu computadora

Necesitas [Node.js](https://nodejs.org) 18 o superior. No hay que instalar paquetes.

```bash
node server.js
```

Abre <http://localhost:3000> en el navegador. Para detener el servidor, presiona `Ctrl + C`.

Para usar otro puerto en Windows (CMD): `set PORT=4000 && node server.js`

## Marca y diseño

- **Colores:** negro `#0b0b0c` y dorado `#f5ab10` del logotipo. Cada paquete conserva el color de su menú impreso: coral, verde, amarillo y azul.
- **Tipografías:** Roboto en versión condensada para títulos (la misma del logotipo) y Poppins para el texto (la misma del menú impreso).
- **Principios de UI/UX aplicados:**
  - Jerarquía visual con un solo `h1` por página y títulos `h2`, `h3` en orden.
  - Contraste alto entre texto y fondo, y espacio suficiente entre bloques.
  - Consistencia: mismo encabezado, pie, botones y tarjetas en todas las páginas.
  - Agrupación por proximidad: cada paquete y cada sección van en su propia tarjeta.
  - Navegación clara: menú principal de 4 opciones, migas de pan y botón de cotizar siempre visible.
  - Botones grandes (mínimo 44 px) pensados para tocar con el dedo.
  - Diseño responsivo "mobile first": teléfono, tableta y laptop (puntos de corte en 640, 900 y 1100 px).
  - Accesibilidad: texto alternativo en imágenes, enlace "Saltar al contenido", foco visible y etiquetas en el formulario.
- **Sin JavaScript:** el menú móvil, el carrusel y la tabla con scroll funcionan solo con HTML y CSS.

## Subirlo a GitHub

1. Crea un repositorio **vacío** en <https://github.com/new> llamado `koria-garcia-banquetes` (sin README ni .gitignore).
2. En la carpeta del proyecto, configura tu nombre y correo, y corrige el autor del primer commit:

   ```bash
   git config user.name "Tu nombre"
   git config user.email "tu-correo@ejemplo.com"
   git commit --amend --reset-author --no-edit
   ```

3. Conecta y sube el proyecto (cambia `TU-USUARIO`):

   ```bash
   git remote add origin https://github.com/TU-USUARIO/koria-garcia-banquetes.git
   git push -u origin main
   ```

4. Comparte con tu maestro la URL `https://github.com/TU-USUARIO/koria-garcia-banquetes`.

## Publicarlo en Vercel

1. Entra a <https://vercel.com/signup> y crea una cuenta gratuita con **Continue with GitHub**.
2. Haz clic en **Add New… → Project** y elige el repositorio `koria-garcia-banquetes`.
3. Deja la configuración como está (`vercel.json` ya indica que se publica la carpeta `public`) y pulsa **Deploy**.
4. Al terminar, copia la URL (algo como `https://koria-garcia-banquetes.vercel.app`) y compártela en el grupo de WhatsApp.

Cada vez que hagas `git push`, Vercel vuelve a publicar el sitio automáticamente.

## Créditos

- Tipografías: Roboto (licencia OFL, ver `public/fonts/LICENCIA-Roboto-OFL.txt`) y Poppins (licencia OFL).
- Logotipo, menú, ilustraciones y video: material de Koria&Garcia Banquetes.
