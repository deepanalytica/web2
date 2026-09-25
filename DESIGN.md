# DESIGN.md — Departamentos Luz

## Dirección visual
Inmobiliaria boutique moderna, sencilla y accesible. La idea de “Luz” se expresa mediante iluminación ambiental, blancos cálidos, reflejos suaves, sombras cálidas, fotografías grandes y profundidad controlada. No usar iconografía obvia de sol o bombilla.

## Tipografía
- Display: Instrument Serif.
- UI y cuerpo: Inter.
- Titulares editoriales con line-height cercano a 0.95 y tracking negativo moderado.

## Paleta
- Canvas crema y blancos cálidos.
- Terracota como acción principal.
- Verde solo para disponibilidad confirmada.
- Ámbar para arrendado o disponibilidad futura.
- Neutros cálidos para estados por confirmar.

## Ritmo
Hero luminoso → trust strip → disponibilidad clara → galería fotográfica → sección oscura iluminada → visita luminosa → FAQ limpio → footer cálido.

## Reglas
- Carrusel: autoplay, pausa hover/focus, flechas, indicadores, teclado y swipe.
- Disponibilidad: tabla premium en desktop y cards en mobile.
- Galería asimétrica con lightbox.
- Iconografía lineal consistente mediante un único sistema SVG.
- Header sticky que se compacta con scroll.
- Formularios con focus, validación y status.
- `prefers-reduced-motion` obligatorio.
- Evitar azul SaaS, card soup, glassmorphism decorativo y datos inventados.
