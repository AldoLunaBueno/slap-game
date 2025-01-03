export function init(deckId) {
  const options = $$(".options article");
  const hand = $(".hand.human");
  const handplace = hand.parentElement;
  hand.draggable = true;

  fetch(`/assets/decks/${deckId}/data.json`)
    .then((response) => response.json())
    .then((data) => {
      /**
       * Nuevas imágenes se cargan
       * La mano vuelve a su lugar y espera ser presionada
       * La voz comienza cuando la mano es presionada
       * Pasan 2 segundos (no importar si la mano se vuelve a presionar o sigue siendo arrastrada)
       * Repetimos todo
       */
      let sample = setImageSample(data, deckId, options);

      hand.addEventListener("mousedown", function loop() {
        options.forEach((option) => {
          option.addEventListener("dragover", (ev) => {
            ev.preventDefault();
          });

          option.addEventListener("drop", handleDrop);
        });
        speak(sample);
        this.removeEventListener("mousedown", loop);
        setTimeout(() => {
          handplace.appendChild(hand);
          options.forEach((option) => {
            option.innerHTML = "";
          });
          sample = setImageSample(data, deckId, options);
          handplace.appendChild(hand);
          this.addEventListener("mousedown", loop);
          options.forEach((option) => {
            option.removeEventListener("drop", handleDrop);
          });
        }, 2500);
      });
    });
}

function handleDrop(ev) {
  ev.preventDefault();
  const draggable = $("#draggable");
  const w = draggable.offsetWidth;
  const h = draggable.offsetHeight;
  draggable.parentElement.removeChild(draggable);
  draggable.style.width = w + "px";
  draggable.style.height = h + "px";
  if (ev.target.nodeName == "IMG") {
    ev.target.parentElement.appendChild(draggable);
  } else {
    ev.target.appendChild(draggable);
  }
  
}

function speak(sample) {
  const rand = _.random(0, 3);
  let utterance = new SpeechSynthesisUtterance(
    `Where is the ${sample[rand].name}?`
  );
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function setImageSample(data, deckId, options) {
  const sample = _.sampleSize(data.images, 4);
  for (let i = 0; i < 4; i++) {
    const image = sample[i];
    const imageElement = document.createElement("img");
    imageElement.src = `assets/decks/${deckId}/images/${image.src}`;
    imageElement.draggable = false;
    options[i].appendChild(imageElement);
  }
  return sample;
}
