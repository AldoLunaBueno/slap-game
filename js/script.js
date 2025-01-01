$ = (el) => document.querySelector(el);
$$ = (els) => document.querySelectorAll(els);

// Function to load content dynamically
function loadSection(file) {
  const contentDiv = $("main");

  // Fetch the content from the file
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      contentDiv.innerHTML = html; // Inject the HTML into the content div
    })
    .catch((error) => {
      contentDiv.textContent = `Failed to load content: ${error.message}`;
    });
}

// Attach event listeners to navigation buttons
$$("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    const sectionFile = button.dataset.section;
    loadSection(sectionFile);
  });
});

// Load the default section on page load
loadSection("sections/decks.html");
