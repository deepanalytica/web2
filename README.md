# Departamentos Luz

Frontend estático publicado con GitHub Pages.

## Arquitectura
- `index.html`: estructura semántica y contenido.
- `styles.css`: sistema de diseño, responsive y motion.
- `app.js`: datos de disponibilidad, carrusel, formularios, FAQ, lightbox y WhatsApp.
- `assets/`: fotografías optimizadas en WebP.
- `PRODUCT.md`: verdad de producto.
- `DESIGN.md`: decisiones visuales durables.

## Disponibilidad
La configuración está al inicio de `app.js` en `PROPERTIES`.

Ejemplo:
```js
{
  id: 2,
  name: "Departamento 2",
  location: "San Bernardo",
  status: "occupied",
  leasedUntil: "2026-10-13",
  availableFrom: "2026-10-14",
  featured: false
}
```

La interfaz mostrará automáticamente “Arrendado hasta 13 de octubre de 2026” y “Disponible desde 14 de octubre de 2026”.

No cargar fechas que no hayan sido confirmadas por Luz.

## Publicación
GitHub Pages se despliega mediante `.github/workflows/pages.yml`.
