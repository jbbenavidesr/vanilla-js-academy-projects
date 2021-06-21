// Variables and DOM elements
const API_URL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
let app = document.querySelector('[data-app]');
let quoteContainer = document.querySelector('[data-quote]');
let fetchedQuotes = [];

// Functions
let renderQuote = function (quote) {
    quoteContainer.textContent= quote;
};

let getQuote = async function () {
    try {
        let response = await fetch(API_URL)

        // Check if the response was correct
        if (!response.ok) {
            throw response.status;
        }
        
        let data = await response.json();

        if (fetchedQuotes.includes(data[0])){
            await getQuote();
        } else {
            renderQuote(data[0]);
            fetchedQuotes.push(data[0]);
            if (fetchedQuotes.length > 50) fetchedQuotes.shift();
        }
    } catch {
        renderQuote("[The request failed, here's a quote about incompetent thiefs like this API] I don’t want to paint with a broad brush here, but every single contractor in the world is a miserable, incompetent thief.");
        console.warn(error);
    };
};

let init = function () {
    // Prepare UI for a working JS Version
    app.removeChild(app.lastElementChild);
    quoteContainer.textContent = "Getting a new quote...";
    let btn = document.createElement('button');
    btn.textContent = "Get Quote";
    btn.setAttribute("data-fetch", "")
    app.appendChild(btn)
    
    getQuote();
};

let clickHandler = function (event) {
    if (!event.target.matches('[data-fetch]')) return;
    
    getQuote();
};

// Initialize and add event listener
init();

document.addEventListener('click', clickHandler);

