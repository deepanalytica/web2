# Departamentos Luz — MVP

Vitrina pública orientada a reducir consultas repetidas y coordinación manual.

## Funciones
- Hero con rotación de fotografías y controles manuales.
- Disponibilidad por unidad.
- Estados: disponible, arrendado, disponible pronto y consultar.
- Fechas “Arrendado hasta…” / “Disponible desde…” cuando se cargan.
- Lista de disponibilidad con nombre/correo/teléfono y solicitud por WhatsApp.
- Agenda de visita con fecha y horario.
- Galería, FAQ, SVG icons y CTA móvil.
- Accesibilidad: focus visible, reduced motion, skip link y estados con texto.

## Actualizar disponibilidad
Edita `PROPERTY_DATA` en `index.html`.

Ejemplo:
```js
{id:2,name:"Departamento 2",place:"San Bernardo",state:"leased",leasedUntil:"2027-02-28",availableFrom:"2027-03-01"}
```

La interfaz formatea automáticamente la fecha en español.

## Diseño
Ver `DESIGN.md` y `PRODUCT.md`.

## Publicación
GitHub Pages se despliega mediante `.github/workflows/pages.yml`.
