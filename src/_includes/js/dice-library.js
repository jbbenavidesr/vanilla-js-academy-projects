/**
 * Library for creating a digital dice.
 */
let Dice = (function () {

	/**
	 * Creates the event listener for the roll button
	 * 
	 * @param {Node} btn The button to attatch the listener
	 * @param {Constructor} instance the current instantiation
	 */
	function createEventListener(btn, instance) {

		/**
		 * Rolls the dice. Handles the click event.
		 */
		function roll() {
			let result = Math.floor(Math.random() * 6) + 1;
			instance._display.textContent = `You rolled a ${result}`
		}

		btn.addEventListener('click', roll);
	}

	/**
	 * The Constructor Object
	 * 
	 * @param {String} buttonSelector The selector where the button will be.
	 * @param {String} displaySelector The selector of where to display the result.
	 */
	function Constructor(buttonSelector = '#button', displaySelector = '#display') {

		// Select elements
		let button = document.querySelector(buttonSelector);
		let display = document.querySelector(displaySelector);

		// Check if elements do exist
		if (!button | !display) throw "Button and display elements should be provided for this to work";

		// Make sure display has aria live polite
		display.setAttribute('aria-live', 'polite');

		// Create the event Listener
		createEventListener(button, this);

		// Set properties
		Object.defineProperties(this, {
			_button: {value: button},
			_display: {value: display},
		})
		
	}

	return Constructor;
})();

let d6 = new Dice('#dice', '#result');