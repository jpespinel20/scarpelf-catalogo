# Catálogo web — Scarpe LF

Sitio estático (HTML + CSS + JS puro, sin frameworks ni backend). Se puede abrir directo en Visual Studio Code y publicar gratis con GitHub Pages.

## Estructura

```
scarpelf-web/
├── index.html          → estructura de la página
├── styles.css           → estilos (colores, tipografía)
├── script.js             → arma las tarjetas de producto desde data/products.json
├── data/
│   └── products.json    → modelo, color, precio, material, imagen de cada producto
└── images/               → fotos (33 variantes)
```

## Editar productos, colores o precios

No hay que tocar el HTML ni el JS. Todo el catálogo sale de **`data/products.json`**.
Este catálogo **no muestra precios** — cada producto es un bloque así:

```json
{
  "model": "LF-08",
  "material": null,
  "color": "Blanco Dorado",
  "images": [
    "images/01_LF-08_Blanco_Dorado_1.jpg",
    "images/01_LF-08_Blanco_Dorado_2.jpg"
  ]
}
```

- **`images` es una lista** — puede tener 1, 2, 3 o más fotos del mismo color. Si tiene más de una, en el sitio aparecen puntitos debajo de la foto para pasar entre ellas.
- Para agregar una foto más a un color que ya existe: sube la foto a `images/` y agrega su ruta al final de la lista `images` de ese producto.
- Para agregar un color nuevo: copia un bloque completo, cambia `color`, sube la(s) foto(s) a `images/` y ajusta las rutas.
- Para un modelo nuevo: usa un `"model"` distinto (ej. `"LF-20"`); aparece automáticamente como una sección nueva en la página.
- Si un modelo tiene materiales distintos (como LF-11, LF-12, LF-13 con EVA/PVC), usa el campo `"material"` para agruparlos con su propia etiqueta. Si todos los productos del modelo tienen el mismo material (o `null`), no se muestran subgrupos.
- **Nombres de archivo:** siempre sin tildes ni espacios (usa `_` en vez de espacio). Ejemplo correcto: `images/34_LF-20_Verde_Militar_1.jpg`. Una tilde en el nombre del archivo puede dañarlo al subirlo con git en Windows.

## Ver el sitio en tu computador antes de publicar

Con Visual Studio Code, instala la extensión **Live Server** (de Ritwick Dey), clic derecho sobre `index.html` → **Open with Live Server**. Abre el catálogo en tu navegador con recarga automática cada vez que guardas un cambio.

(Abrir `index.html` haciendo doble clic directamente, sin servidor, no funciona bien porque el navegador bloquea la carga de `products.json` por seguridad — por eso se necesita Live Server o el paso de publicación de abajo.)

## Publicar gratis en GitHub Pages

1. Crea un repositorio nuevo en tu cuenta de GitHub (Jfuentes2006), por ejemplo `scarpelf-catalogo`. Puede ser público.
2. Desde esta carpeta (`scarpelf-web`), en la terminal:
   ```bash
   git init
   git add .
   git commit -m "Catálogo Scarpe LF"
   git branch -M main
   git remote add origin https://github.com/Jfuentes2006/scarpelf-catalogo.git
   git push -u origin main
   ```
3. En GitHub, entra al repositorio → **Settings** → **Pages** (en el menú de la izquierda).
4. En "Build and deployment" → **Source**, elige **Deploy from a branch**.
5. En **Branch**, elige `main` y carpeta `/ (root)` → **Save**.
6. Espera 1-2 minutos. El link del catálogo queda en:
   ```
   https://jfuentes2006.github.io/scarpelf-catalogo/
   ```

Ese link es el que compartes por WhatsApp o pones en la bio de Instagram. Cada vez que hagas `git add . && git commit -m "..." && git push`, GitHub Pages actualiza el sitio solo, sin costo.

## Notas

- El botón de WhatsApp de cada producto abre un mensaje ya escrito con el modelo y color, para que el cliente no tenga que escribir nada.
- El número de WhatsApp está en `script.js` (`WA_NUMBER`) y en los enlaces de `index.html` — si cambia, edítalo en ambos lugares.
