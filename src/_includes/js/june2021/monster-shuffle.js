//
// Variables
//
const baseURL =
  "https://gist.githubusercontent.com/cferdinandi/14e80a8e5383d962d4ac65386406993b/raw/9f34ac3b4676e4ce62d51fe7c9b06845e4657f10/";

let monsters = [
  {
    name: "monster1",
    alt: "Yellow monster of one eye and looks like an elephant.",
  },
  {
    name: "monster2",
    alt: "One eyed yellow monster with a happy and tilted head.",
  },
  {
    name: "monster3",
    alt: "Green monster with a big mouth that goes between the eyes.",
  },
  {
    name: "monster4",
    alt: "Four armed red monster",
  },
  {
    name: "monster5",
    alt: "Green small one eyed round monster.",
  },
  {
    name: "monster6",
    alt: "Triangular green monster upside down and over it's hands.",
  },
  {
    name: "monster7",
    alt: "Purple monster with a couple of tentacles.",
  },
  {
    name: "monster8",
    alt: "Small oval one eyed purple monster",
  },
  {
    name: "monster9",
    alt: "Blue monster that looks like an ant.",
  },
  {
    name: "monster10",
    alt: "Blue monster that looks worried.",
  },
  {
    name: "monster11",
    alt: "Gray big monster with tiny eyes.",
  },
  {
    name: "sock",
    alt: "A couple of white socks.",
  },
];

// DOM Elements
let app = document.querySelector("[data-app]");

//
// Functions
//

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Include the images from an array to the UI.
 */
function renderImages(items) {
  app.innerHTML = items
    .map(function (item) {
      return `
        <div>
            <img alt=${item.alt} src="${baseURL}/${item.name}.svg">
        </div>
      `;
    })
    .join("");
}

// Inits and event listeners
shuffle(monsters);
renderImages(monsters);
