export function init(deckId) {
  const options = $$("section.play .options article");
  const hand = $("section.play .hand.human");
  hand.draggable = true;
  let sample = null;

  hand.addEventListener("mousedown", () => {
    const rand = _.random(0, 3);
    let utterance = new SpeechSynthesisUtterance(
      `Where is the ${sample[rand].name}?`
    );
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  });

  options.forEach((option) => {
    option.addEventListener("dragover", (ev) => {
      ev.preventDefault();
    });

    option.addEventListener("drop", (ev) => {
      ev.preventDefault();
      const draggable = $("#draggable");
      const w = draggable.offsetWidth;
      const h = draggable.offsetHeight;
      draggable.parentElement.removeChild(draggable);
      draggable.style.width = w + "px";
      draggable.style.height = h + "px";
      option.appendChild(draggable);
    });
  });

  fetch(`/assets/decks/${deckId}/data.json`)
    .then((response) => response.json())
    .then((data) => {
      sample = _.sampleSize(data.images, 4);
      for (let i = 0; i < 4; i++) {
        const image = sample[i];
        const imageElement = document.createElement("img");
        imageElement.src = `assets/decks/${deckId}/images/${image.src}`;
        imageElement.draggable = false;
        options[i].appendChild(imageElement);
      }
    });
}
