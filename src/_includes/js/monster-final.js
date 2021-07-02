//
// Variables
//
const baseURL =
  "https://gist.githubusercontent.com/cferdinandi/d40f6a589c60eeb7fa10de9cca212cec/raw/29eaac94f4201691cf31d76787c6f867838d63f0/";
let revealedMonsters;

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

// Helpers

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

// handlers
let handlers = {
    door: function(event){
        let door = event.target.closest("[data-door]");
        if (door){
            openDoor(door);
        } else {
            throw new Error("There's nothing behind this door!");
        }
    },
    restart: function(event) {
        document.body.classList.remove("win", "loose");
        init();
    }
}

function gameOver (){
    document.body.classList.add("loose");
    document.querySelector('.game-loose > h2').focus()
    
}

function win () {
    document.body.classList.add("win");
    document.querySelector('.game-win > h2').focus();
}

function openDoor(door) {

    let behindDoor = monsters[door.getAttribute('data-door')]

    if(behindDoor.name === "sock") {
        gameOver();
        return;
    }
    let openedDoor = document.createElement('div');
    openedDoor.innerHTML = `<img alt="${behindDoor.alt}" src="${baseURL}/${behindDoor.name}.svg" >`;
    
    door.replaceWith(openedDoor);

    revealedMonsters++;
    if (revealedMonsters === monsters.length - 1){
        win();
    }
}

function renderDoors() {
    app.innerHTML = `
    <h2 tabindex="-1">Monster Game!</h2>
    <p>Click a door to open it and reveal what's hiding behind it. Try not to find the sock!</p>
    <div class="auto-grid">
        ${monsters.map(function (monster, index){
            return `
            <div aria-live="polite">
                <button data-door="${index}" data-action="door">
                    <img alt="Door ${index + 1}. Press it to reveal what's behind." src="${baseURL}/door.svg" >
                </button>
            </div>`;
        }).join('')}
    </div>`;

    app.querySelector('h2').focus();
}

function clickHandler (event) {

    let actionElement = event.target.closest('[data-action]');
    if (!actionElement) return;

    let action = actionElement.getAttribute('data-action');
    if (!action || ! handlers[action]) return;
    
    handlers[action](event);
}

function init() {
    shuffle(monsters);
    renderDoors();
    revealedMonsters = 0;
}

// Inits and event listeners
init();

document.addEventListener('click', clickHandler)