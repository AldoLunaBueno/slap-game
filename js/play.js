let speakingTime = 1000;
let computerReactionTime = 2000;
let gapTime = 1000;
let numOptions = 4;

export function init(deckId) {
  fetch(`/assets/decks/${deckId}/data.json`)
    .then((response) => response.json())
    .then((data) => {
      play(data, deckId);
    });
}

function play(data, deckId) {
  /**
   * Nuevas imágenes se cargan.
   * Las manos vuelven a su lugar y la mano humana espera a ser presionada.
   * La voz comienza cuando la mano humana es presionada.
   * Pasa cierto tiempo para que el usuario pueda arrastrar la mano hacia la opción que elija (si la mano se vuelve a presionar o si sigue siendo arrastrada cuando el tiempo concluya, no sucederá nada).
   * Repetimos todo hasta que el juego termine.
   */

  const options = $$(".options article");
  const humanHand = $(".hand.human");
  humanHand.draggable = true;
  const computerHand = $(".hand.computer");
  const humanPlace = humanHand.parentElement;
  const computerPlace = computerHand.parentElement;
  let sample = setImageSample(data, deckId, options);

  let optionSelected = null;

  humanHand.addEventListener("mousedown", function loop() {
    options.forEach((option) => {
      option.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        if (ev.target.nodeName == "IMG") {
          optionSelected = ev.target.parentElement;
        } else {
          optionSelected = ev.target;
        }
      });
      option.addEventListener("dragleave", () => {
        // Clear the optionSelected if leaving the current option
        optionSelected = null;
      });
    });

    humanHand.addEventListener("dragend", (ev) => {
      if (optionSelected) {
        optionSelected.appendChild(humanHand); // Only drop if over a valid option
        optionSelected = null; // Reset after dropping
      }
    });
    const rand = _.random(0, numOptions - 1);
    const itemName = sample[rand].name;
    const correctOption = options[rand];

    speak(itemName);
    this.removeEventListener("mousedown", loop);
    setTimeout(() => {
      move(computerHand, correctOption);
    }, speakingTime);

    const totalTime = speakingTime + computerReactionTime + gapTime;

    setTimeout(() => {
      humanPlace.appendChild(humanHand);
      options.forEach((option) => {
        option.innerHTML = "";
      });
      sample = setImageSample(data, deckId, options);
      humanPlace.appendChild(humanHand);
      computerPlace.appendChild(computerHand);
      this.addEventListener("mousedown", loop);
    }, totalTime);
  });
}

function move(source, target) {
  const targetX = target.offsetLeft + target.offsetWidth / 2;
  const targetY = target.offsetTop + target.offsetHeight / 2;
  const sourceX = source.offsetLeft + source.offsetWidth / 2;
  const sourceY = source.offsetTop + source.offsetHeight / 2;
  const x = targetX - sourceX;
  const y = targetY - sourceY;

  source.style.transition = `all ${computerReactionTime / 1000}s`;
  source.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    target.appendChild(source);
    source.style.width = source.offsetWidth;
    source.style.height = source.offsetHeight;
    source.style.transform = "";
    source.style.transition = "";
  }, computerReactionTime);
}

function speak(name) {
  let utterance = new SpeechSynthesisUtterance(`Where is the ${name}?`);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function setImageSample(data, deckId, options) {
  const sample = _.sampleSize(data.images, 4);
  for (let i = 0; i < numOptions; i++) {
    const image = sample[i];
    const imageElement = document.createElement("img");
    imageElement.src = `assets/decks/${deckId}/images/${image.src}`;
    imageElement.draggable = false;
    imageElement.className = "item";
    options[i].appendChild(imageElement);
  }
  return sample;
}

class Game {
  constructor(numbMoves) {
    this.computer = 0;
    this.human = 0;
    this.count = 0;
    this.numbMoves = numbMoves;
  }

  computerPoint() {
    this.computer += 1;
    this.count += 1;
    return this.humanWin;
  }

  humanPoint() {
    this.human += 1;
    this.count += 1;
    return this.humanWin;
  }

  get humanWin() {
    if (this.count != this.numbMoves) return undefined;
    if (this.human == this.computer) return null;

    return this.human > this.computer;
  }
}
