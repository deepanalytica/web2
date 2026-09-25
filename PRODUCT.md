# PRODUCT.md — Departamentos Luz

## Producto
Vitrina digital para cuatro departamentos amoblados en San Bernardo, Chile.

## Objetivo
Que una persona pueda ver los departamentos, revisar fotografías, saber si están disponibles, saber desde cuándo estarán disponibles, agendar una visita, consultar por WhatsApp y dejar sus datos para recibir un aviso cuando una unidad vuelva a quedar libre.

## Problema operativo
La administración depende de publicaciones en Facebook, Messenger y llamadas. Eso obliga a subir o bajar avisos, responder las mismas preguntas y coordinar visitas manualmente.

## Verdad del producto
- Existen cuatro departamentos.
- La unidad 1 tiene material fotográfico disponible en este MVP.
- No se inventan fechas, precios, condiciones ni estados.
- Estados soportados: `available`, `occupied`, `soon`, `unknown`.
- Cuando existe fecha confirmada, la interfaz muestra `Arrendado hasta…` y/o `Disponible desde…`.
- El MVP no tiene backend de newsletter: la lista de disponibilidad prepara una solicitud por WhatsApp con los datos ingresados.
