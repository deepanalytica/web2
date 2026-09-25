# PRODUCT.md — Departamentos Luz

## Producto
Vitrina digital para cuatro departamentos de arriendo en San Bernardo.

## Audiencia
Personas que buscan un departamento y quieren saber rápidamente qué unidades existen, si están disponibles, hasta cuándo están arrendadas, desde qué fecha vuelven a quedar libres y cómo consultar o coordinar una visita.

## Problema operativo
La administración depende de publicaciones en Facebook, Messenger y llamadas. Eso obliga a subir o bajar avisos, responder las mismas preguntas y coordinar visitas manualmente.

## Mecanismo
Una sola URL mantiene estado por unidad, próxima fecha disponible, fotos y características, consulta contextual por WhatsApp, solicitud de visita y lista de disponibilidad.

## Límites
- Hay cuatro departamentos.
- El MVP se publica en GitHub Pages.
- La captura de avisos funciona hoy preparando un mensaje de WhatsApp; todavía no existe backend de newsletter.
- No inventar fechas, precios, condiciones o disponibilidad.
- Estados soportados: available, leased, soon, unknown.
- Cuando exista fecha confirmada, mostrar “Arrendado hasta…” y/o “Disponible desde…”.

## Éxito
Una persona debe poder decidir en menos de un minuto si consultar, agendar o pedir un aviso sin obligar a Luz a explicar lo mismo desde cero.
