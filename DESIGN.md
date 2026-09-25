# DESIGN.md — Departamentos Luz

## Dirección
Warm editorial rental guide: guía local, cuidada y humana. No SaaS, no portal inmobiliario corporativo, no lujo artificial.

## Tipografía
- Display: Instrument Serif 400.
- UI/lectura: Instrument Sans 400–700.
- Display máximo 5.2rem, tracking ≥ -0.035em.
- Texto de lectura line-height 1.7.

## Color
Canvas crema, tinta carbón, terracota para acción, verde solo para disponibilidad confirmada, ámbar para arrendado/próxima disponibilidad. Tokens semánticos en OKLCH.

## Layout
Hero de copy + fotografía real rotativa. Disponibilidad como lista lineal, no card soup. Ficha con galería dominante. Sección de avisos oscura. Formularios abiertos. En móvil CTA persistente Avisarme/WhatsApp.

## Iconografía
SVG lineal consistente, stroke 1.75. Sin emoji ni glifos Unicode como iconos.

## Motion
Un momento principal: carrusel del hero, 5.2 s, crossfade + scale mínimo. Pausa en hover/focus y respeta prefers-reduced-motion.

## Estados
available = Disponible ahora.
leased = Arrendado; con fecha muestra Disponible desde…
soon = Disponible pronto + fecha.
unknown = Consultar disponibilidad.
Color nunca es el único indicador.

## Anti-patrones
Sin gradiente de texto, card soup, eyebrows decorativos, iconos en cuadrados repetidos, azul SaaS, glassmorphism decorativo ni datos inventados.
