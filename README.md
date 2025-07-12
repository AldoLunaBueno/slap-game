# Slap Game

[🚀 Probar la aplicación en línea](https://aldolunabueno.github.io/slap-game/legacy/)

## Planeación

### ¿Qué queremos?

Queremos que la experiencia de aprender inglés sea más divertida. La idea vino de este juego en línea:

![[captura del juego que nos inspiró]](./.readme-images/inspiration.png)
https://www.mes-games.com/

Aunque en verdad este juego existía mucho antes, y se juega en aulas de clase de diversas partes del mundo, ya que es una manera muy accesible y divertida de aprender vocabulario nuevo.

### ¿Qué aportamos?

- Nuestra aplicación no usa canvas como este, sino elementos HTML comunes y corrientes mediante la API Drag-and-Drop.
- Puede ser usado en dispositivos móviles.
- Tiene autenticación de usuarios y la posibilidad de crear sus propios juegos de palabras y compartirlos con la comunidad.
- Una apertura para aprender mucho más que solo idiomas.

### El plan general

- Cada tarjeta es una imagen (o un texto) asociada con una descripción.
- Un conjunto de tarjetas es un mazo.
- El juego tiene mazos por defecto para elegir y jugar.
- El usuario puede elegir la dificultad del juego.
- El usuario puede cargar su propio mazo.
- El usuario puede personalizar la interfaz a su gusto.
- El usuario puede iniciar sesión o registrarse para beneficiarse de la persistencia de una base de datos y así recuperar su mazos privados creados y la personalización de la interfaz (esto último también puede ser almacenado localmente por el navegador en el local storage).
- El usuario puede ver su propio desempeño y el de otros usuarios como una estadística personal o un leaderboard global.

### Detalles sobre la experiencia del juego

- Mostramos los elementos importantes dentro de una pizarra: las imágenes y las manos.
- El juego progresa preguntando por algunas tarjetas elegidas aleatoriamente.
- En cada pregunta se muestran solo las imágenes de algunas tarjetas (por defecto son 4) y el juego decide por cuál tarjeta preguntará.
- Se espera que el usuario toque la mano que le corresponde (la derecha si es diestro) para que el contenido de la tarjeta elegida sea leído.
- El contenido es leído en voz alta por una voz sintética.
- Cuando la voz sintética termina, la mano oponente comienza su movimiento con una duración por defecto de medio segundo (la dificultad aumenta disminuyendo esta duración).
- La mano oponente debe estar programada para desplazarse a la imagen correcta, pero no necesariamente tiene que ir en línea recta hacia ella.
- Para ganar un punto en una pregunta, el usuario debe arrastrar la mano y soltarla en la imagen correcta antes de que la mano oponente llegue a ella.
- Si la mano oponente lo hace antes, ganará el punto.
- El juego lo gana el jugador que acumule más puntos al final del juego.

### Detalles adicionales

- Las tarjetas de un mazo pueden ser cargadas mediante la API drag-and-drop.
- El usuario solo arrastra sus imágenes y por defecto su contenido es tomado de los nombres de estas, pudiéndose editar.
- El usuario puede personalizar las descripciones.
- El usuario puede elegir la dificultad del juego estableciendo una configuración de la velocidad de la mano oponente.
- El usuario también puede configurar el tema (claro, oscuro, o algún color)
- Para hacer todo esto se necesita una forma de navegación para separar el juego, la creación de mazos y la configuración del juego.
- Todo esta experiencia se puede replicar en dispositivos móviles, pero la implementación es ligéramente distinta porque necesitamos usar eventos de toque (TouchEvent). Al ser una aplicación casual, casi todos nuestros usuarios preferirán usarla a través del movil, así que este punto es clave para llegar a más personas.

## Proceso de creación

En su etapa inicial, este proyecto era un sitio web de HTML, CSS y JavaScript puro que solo comprendí la capa de aplicación. El código está contenido en la carpeta [legacy](./legacy/) y se puede correr en el navegador desde el archivo index.html a través de VSCode localmente apoyándose de una extensión como _Live Preview_. Tiene la funcionalidad básica acabada.

Ahora el proyecto es una aplicación SPA estructurada en tres capas apoyándonos de frameworks.

- Frontend: Vue.js + Bootstrap 5
- Backend: Node + Express.js
- Base de datos: SQLite (nube de Turso)

Además, alojamos las imagenes en Cloudflare.

La funcionalidad básica de jugar no está terminada aún en la capa del frontend.
