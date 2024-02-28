// Selecting DOM Elements
const form = document.querySelector(".form");
const jokeButton = document.querySelector(".getJoke");
const jokeButtonSpan = jokeButton.querySelector(".jokeText");
const jokeHolder = document.querySelector(".joke p");
const optionsSelect = document.getElementById("options");
const jokeGif = document.querySelector(".jokeGif");

//Creates array for changing the button text each time it's clicked
const buttonText = [
  `Give me another one!`,
  `That wasn't "dad" enough...`,
  `So good! One more!`,
  `Keep em' coming!`,
  `I can't get enough!`,
  `Make me laugh!`,
];

//Asynchronous function for fetching jokes from the API
async function fetchJoke() {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data.joke;
}

// Pulls a random joke from the array
function randomItemFromArray(arr, not) {
  let item;
  do {
    item = arr[Math.floor(Math.random() * arr.length)];
  } while (item === not);

  return item;
}

// Handles the submits on the form. If one option is selected, an error message will appear
async function handleClick() {
  const selectedOptions = Array.from(optionsSelect.selectedOptions).map(
    (option) => option.value
  );
  //show error for make fun of
  if (
    selectedOptions.includes("I want to make fun of people who like dad jokes")
  ) {
    alert("Get off my website! You are not welcome here!");
    return;
  }

  const joke = await fetchJoke();
  jokeHolder.textContent = joke || "";

  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );

  if (
    selectedOptions.includes("I want to impress my friends") ||
    selectedOptions.includes("I want to embarass my partner and kids")
  ) {
    jokeGif.style.display = "block";
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Enable the joke button after submitting the form
  jokeButton.disabled = false;

  // Show the GIF after submitting the form
  jokeGif.style.display = "block";

  // Hide the form after submission
  form.style.display = "none";
}

// Don't show the get a joke button initially
jokeButton.disabled = true;

form.addEventListener("submit", handleFormSubmit);
jokeButton.addEventListener("click", handleClick);
