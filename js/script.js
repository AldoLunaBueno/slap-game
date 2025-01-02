$ = (el) => document.querySelector(el);
$$ = (els) => document.querySelectorAll(els);

// Function to load content dynamically
function loadSection(section) {
  const contentDiv = $("main");

  // Fetch the content from the file
  fetch(`sections/${section}.html`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      contentDiv.innerHTML = html; // Inject the HTML into the content div
      return import(`./${section}.js`);
    })
    .then((module) => {
      if (module.init) module.init();
    })
    .catch((error) => {
      contentDiv.textContent = `Failed to load content: ${error.message}`;
    });
}

// Attach event listeners to navigation buttons
$$("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.dataset.section;
    loadSection(section);
  });
});

loadSection("decks");