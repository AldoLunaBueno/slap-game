export function init() {
  // import lodash for sampling
  import("https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js");
  $$("article").forEach((deck) => {
    deck.addEventListener("click", () => {
      const deckId = deck.dataset.deckId;
      fetch(`sections/play.html`) // fetch play.html fragment and inject it
        .then((response) => response.text())
        .then((html) => {
          const main = document.querySelector("main");
          main.innerHTML = html;
          return import("./play.js")
        })
        .then((module) => {
          if (module.init) module.init(deckId)
        })
        .catch((error) => {
          console.error("Error loading play.html:", error);
        });
    });
  });
}

