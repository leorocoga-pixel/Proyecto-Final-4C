/**
 * server.js · Servidor local para Koria&Garcia Banquetes
 * ------------------------------------------------------
 * Servidor estático hecho solo con módulos nativos de Node.js (sin dependencias).
 * Sirve los archivos de la carpeta /public.
 *
 * Uso:
 *   node server.js          (o: npm start)
 *   Abrir http://localhost:3000
 *
 * Otro puerto:
 *   PORT=4000 node server.js            (Mac / Linux)
 *   set PORT=4000 && node server.js     (Windows, CMD)
 */
'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PUERTO = process.env.PORT || 3000;
const RAIZ = path.join(__dirname, 'public');

// Tipos MIME para que el navegador interprete cada recurso correctamente
const TIPOS_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

/** Convierte la URL pedida en una ruta dentro de /public (o null si no es segura). */
function resolverRuta(urlPeticion) {
  let ruta;
  try {
    ruta = decodeURIComponent(urlPeticion.split('?')[0].split('#')[0]);
  } catch {
    return null; // URL mal codificada
  }
  if (ruta.includes('\0')) return null;

  if (ruta.endsWith('/')) ruta += 'index.html';
  const absoluta = path.normalize(path.join(RAIZ, ruta));

  // Evita salir de /public (por ejemplo con ../../server.js)
  if (absoluta !== RAIZ && !absoluta.startsWith(RAIZ + path.sep)) return null;
  return absoluta;
}

function enviarTexto(res, estado, texto, extra = {}) {
  res.writeHead(estado, { 'Content-Type': 'text/plain; charset=utf-8', ...extra });
  res.end(texto);
}

function enviarNoEncontrado(req, res) {
  const pagina404 = path.join(RAIZ, '404.html');
  fs.readFile(pagina404, (error, contenido) => {
    if (error) return enviarTexto(res, 404, '404 - Página no encontrada');
    res.writeHead(404, { 'Content-Type': TIPOS_MIME['.html'] });
    res.end(req.method === 'HEAD' ? undefined : contenido);
  });
}

function enviarArchivo(req, res, ruta) {
  fs.stat(ruta, (error, info) => {
    if (error) return enviarNoEncontrado(req, res);

    // Si piden una carpeta, se entrega su index.html
    if (info.isDirectory()) return enviarArchivo(req, res, path.join(ruta, 'index.html'));
    if (!info.isFile()) return enviarNoEncontrado(req, res);

    const extension = path.extname(ruta).toLowerCase();
    const cabeceras = {
      'Content-Type': TIPOS_MIME[extension] || 'application/octet-stream',
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=86400',
    };

    // Soporte de "Range": necesario para adelantar o retroceder en el video
    const rango = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (rango && (rango[1] || rango[2])) {
      let inicio = rango[1] ? parseInt(rango[1], 10) : info.size - parseInt(rango[2], 10);
      let fin = rango[1] && rango[2] ? parseInt(rango[2], 10) : info.size - 1;
      inicio = Math.max(inicio, 0);
      fin = Math.min(fin, info.size - 1);

      if (inicio > fin || inicio >= info.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${info.size}` });
        return res.end();
      }
      res.writeHead(206, {
        ...cabeceras,
        'Content-Range': `bytes ${inicio}-${fin}/${info.size}`,
        'Content-Length': fin - inicio + 1,
      });
      if (req.method === 'HEAD') return res.end();
      return fs.createReadStream(ruta, { start: inicio, end: fin }).pipe(res);
    }

    res.writeHead(200, { ...cabeceras, 'Content-Length': info.size });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(ruta)
      .on('error', () => res.destroy())
      .pipe(res);
  });
}

const servidor = http.createServer((req, res) => {
  // Registro en consola: método, URL y código de respuesta
  res.on('finish', () => console.log(`${req.method} ${req.url} -> ${res.statusCode}`));

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return enviarTexto(res, 405, '405 - Método no permitido', { Allow: 'GET, HEAD' });
  }

  const ruta = resolverRuta(req.url);
  if (!ruta) return enviarTexto(res, 400, '400 - Petición no válida');

  enviarArchivo(req, res, ruta);
});

servidor.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PUERTO} ya está en uso. Cierra el otro programa o usa otro puerto.`);
  } else {
    console.error(error);
  }
  process.exit(1);
});

servidor.listen(PUERTO, () => {
  console.log('Koria&Garcia Banquetes');
  console.log(`Servidor listo en http://localhost:${PUERTO}`);
  console.log('Presiona Ctrl + C para detenerlo.');
});
