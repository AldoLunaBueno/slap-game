const main = document.querySelector("main");

export function init() {
  // import lodash for sampling
  import("https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js")
  $$("article").forEach((deck) => {
    deck.addEventListener("click", () => {
      const deckId = deck.dataset.deckId;
      fetch(`sections/play.html`) // fetch play.html fragment and inject it
        .then((response) => response.text())
        .then((html) => {
          main.innerHTML = html;          
          initializePlay(deckId);
        })
        .catch((error) => {
          console.error("Error loading play.html:", error);
        });
    });
  });
}

function initializePlay(deckId) {
  const options = $$("section.play .options article");
  fetch(`/assets/decks/${deckId}/data.json`)
    .then((response) => response.json())
    .then((data) => {
      const sample = _.sampleSize(data.images, 4)
      for (let i = 0; i < 4; i++) {
        const image = sample[i]
        const imageElement = document.createElement("img");
        imageElement.src = `assets/decks/${deckId}/images/${image.src}`;
        options[i].append(imageElement)
      }
    });
  
  
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}