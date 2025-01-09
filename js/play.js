let computerReactionTime = 500;
let gapTime = 1000;
let numOptions = 4;
let lengthGame = 10;

export function init(deckId) {
  fetch(`/assets/decks/${deckId}/data.json`)
    .then((response) => response.json())
    .then((data) => {
      play(data, deckId);
    });
}

async function play(data, deckId) {
  /**
   * Nuevas imágenes se cargan.
   * Las manos vuelven a su lugar y la mano humana espera a ser presionada.
   * La voz comienza cuando la mano humana es presionada.
   * Pasa cierto tiempo para que el usuario pueda arrastrar la mano hacia la opción que elija (si la mano se vuelve a presionar o si sigue siendo arrastrada cuando el tiempo concluya, no sucederá nada).
   * Repetimos todo hasta que el juego termine.
   */

  let game = new Game(lengthGame);
  const computerScore = $(".player.computer span.score");
  const humanScore = $(".player.human span.score");
  const options = $$(".options article");
  const humanHand = $(".hand.human");
  humanHand.draggable = true;
  const computerHand = $(".hand.computer");
  const humanPlace = humanHand.parentElement;
  const computerPlace = computerHand.parentElement;
  let sample = setImageSample(data, deckId, options);

  let selectedOption = null;
  let mouseoverOption = null;
  let canDrop = true;

  options.forEach((option) => {
    option.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      if (ev.target.nodeName == "IMG") {
        mouseoverOption = ev.target.parentElement;
      } else {
        mouseoverOption = ev.target;
      }
    });
    option.addEventListener("dragleave", () => {
      // Clear the optionSelected if leaving the current option
    });
  });

  humanHand.addEventListener("dragend", (ev) => {
    if (!mouseoverOption || !canDrop) return;
    mouseoverOption.appendChild(humanHand); // Only drop if over a valid option
    selectedOption = mouseoverOption;
    humanHand.draggable = false;
    mouseoverOption = null;
  });

  humanHand.addEventListener("mousedown", async function loop() {
    humanHand.draggable = true;
    canDrop = true;
    this.removeEventListener("mousedown", loop);

    const rand = _.random(0, numOptions - 1);
    const itemName = sample[rand].name;
    const correctOption = options[rand];

    await speak(itemName);

    move(computerHand, correctOption);

    setTimeout(() => {
      if (correctOption === selectedOption) {
        game.humanPoint();
        humanScore.innerHTML = game.human;
        pulse(humanScore);
      } else {
        game.computerPoint();
        computerScore.innerHTML = game.computer;
        pulse(computerScore);
      }

      selectedOption = null; // Reset after evaluation
      humanHand.draggable = false;
      canDrop = false;
    }, computerReactionTime);

    const totalTime = computerReactionTime + gapTime;

    setTimeout(() => {
      humanPlace.appendChild(humanHand);
      options.forEach((option) => {
        option.innerHTML = "";
      });
      sample = setImageSample(data, deckId, options);
      humanPlace.appendChild(humanHand);
      computerPlace.appendChild(computerHand);
      this.addEventListener("mousedown", loop);

      if (game.humanWin === undefined) return;

      if (game.humanWin === true) {
        alert("You win!");
      } else if (game.humanWin === false) {
        alert("The hand win!");
      } else if (game.humanWin === null) {
        alert("It's a draw...");
      }
      game = new Game(lengthGame);
      humanScore.innerHTML = 0;
      computerScore.innerHTML = 0;
    }, totalTime);
  });
}

function pulse(el) {
  el.classList.add("pulse");
  setTimeout(() => {
    el.classList.remove("pulse");
  }, 2000);
}

function move(source, target) {
  const targetX = target.offsetLeft + target.offsetWidth / 2;
  const targetY = target.offsetTop + target.offsetHeight / 2;
  const sourceX = source.offsetLeft + source.offsetWidth / 2;
  const sourceY = source.offsetTop + source.offsetHeight / 2;
  const x = targetX - sourceX;
  const y = targetY - sourceY;

  source.style.transition = `all ${computerReactionTime / 1000}s linear`;
  source.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    target.appendChild(source);
    source.style.transform = "";
    source.style.transition = "";
  }, computerReactionTime);
}

function speak(name) {
  let utterance = new SpeechSynthesisUtterance(`Where is the ${name}?`);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
  return new Promise((resolve) => {
    utterance.addEventListener("end", resolve);
  });
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
