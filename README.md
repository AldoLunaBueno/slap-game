# Slap Game

## Planeación

### ¿Qué queremos?

Nuestra inspiración es este juego en línea contenido enteramente en un canvas. Nosotros no lo haremos usando un canvas, sino mediante elementos HTML comunes y corrientes para practicar con la API Drag-and-drop.

![alt text](./.readme-images/inspiration.png)

### El plan general

- Cada tarjeta es una imagen (o un texto) asociada con una descripción.
- Un conjunto de tarjetas es un mazo.
- El juego tiene mazos por defecto para elegir y jugar.
- El usuario puede elegir la dificultad del juego.
- El usuario puede cargar su propio mazo.
- Los niveles cargados por el usuario persisten localmente y el usuario los puede borrar.

### Detalles sobre la experiencia del juego

- Mostramos los elementos importantes dentro de una pizarra.
- El juego progresa preguntando por algunas tarjetas elegidas aleatoriamente.
- En cada pregunta se muestran solo las imágenes de algunas tarjetas (2, 3, 4, etc.) y el juego decide por cuál tarjeta preguntará.
- Se espera que el usuario toque la mano que le corresponde para que la descripción de la tarjeta elegida sea enunciada.
- La descripción es leída en voz alta por una voz sintética.
- Cuando la voz sintética termina, la mano oponente comienza su movimiento.
- La mano oponente terminará llegando a la imagen correcta, pero no necesarimente irá directamente hacia ella.
- Para ganar un punto en una pregunta, el usuario debe arrastrar la mano y soltarla en la imagen correcta antes de que la mano oponente llegue a ella.
- Si la mano oponente lo hace antes, ganará el punto.
- El juego lo gana el jugador que acumule más puntos al final del juego.

### Detalles adicionales

- Las tarjetas de un mazo pueden ser cargadas mediante la API drag-and-drop.
- El usuario solo arrastra sus imágenes y por defecto las descripciones son tomadas de los nombres de estas.
- El usuario puede personalizar las descripciones.
- El usuario puede elegir la dificultad del juego estableciendo una configuración de la velocidad de la mano oponente.
- El usuario también puede configurar el tema (claro u oscuro)
- Para hacer todo esto se necesita una forma de navegación para separar el juego, la creación de mazos y la configuración del juego.

## Proceso de creación
