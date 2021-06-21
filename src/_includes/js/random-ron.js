// Select the quote element
let quoteContainer = document.querySelector('[data-container="quote"]');

// Functions
let getQuote = function () {
    return fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes").then( function (response) {
        // If the response is successful, get the JSON
	    if (response.ok) {
		    return response.json();
	    }

	    // Otherwise, throw an error
	    throw response.status;
    }).then( function (data) {
        return data[0];
    }).catch( function (error) {
        // There was an error
        console.warn(error)
    });
};

let clickHandler = function (event) {
    // Escape if the event is not the button
    if (!event.target.matches('[data-action]')) return;

    getQuote().then(function(quote){
        // Update UI
        quoteContainer.textContent = quote;
    });


}; 

// Set event listener
document.addEventListener('click', clickHandler);