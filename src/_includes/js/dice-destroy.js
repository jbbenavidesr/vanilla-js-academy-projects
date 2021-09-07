/** {% raw %}
 * Library for creating a digital dice.
 */
let Dice = (function () {
    // default options
    const defaults = {
        sides: 6,
        message: "You rolled a {{result}}",
    };

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

        return array[0];
    }

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
			instance.roll()
        }

        return btn.addEventListener("click", roll);
    }

    /**
     * The Constructor Object
     *
     * @param {String} buttonSelector The selector where the button will be.
     * @param {String} displaySelector The selector of where to display the result.
     * @param {Object} options Options and settings for the library.
     */
    function Constructor(
        buttonSelector = "#button",
        displaySelector = "#display",
        options = {}
    ) {
        // Select DOM elements
        let button = document.querySelector(buttonSelector);
        let display = document.querySelector(displaySelector);

        // Check if elements do exist
        if (!button || !display)
            throw "Button and display elements should be provided for this to work";

        // Make sure display has aria live polite
        display.setAttribute("aria-live", "polite");

        // Set the settings of the instance
        let { sides, message } = Object.assign({}, defaults, options);


        // Set properties
        Object.defineProperties(this, {
            _button: { value: button },
            _display: { value: display },
			_message: { value: message },
			_sides: { value: sides },
        });

        // Create the event Listener
        this._listener = createEventListener(button, this);

    }

	/**
	 * Method for programatically roll the dice.
	 */
	Constructor.prototype.roll = function(){
        // Create the faces array
        let faces = Array.from(new Array(this._sides)).map(
            function (item, index) {
                return index + 1;
            }
        );

        this._display.textContent = this._message.replace(
            "{{result}}",
            shuffle(faces)
        );

	}

	/**
	 * Destroy the instance.
	 */
	Constructor.prototype.destroy = function () {

		// Destroy the event listener
		removeEventListener('click', this._listener);

		// Disable the button
		this._button.setAttribute('disabled', true);

		// Remove the roll function
		this.roll = () => null; 

	}

    return Constructor;
})();

let d6 = new Dice("#d6", "#result");
let d20 = new Dice("#d20", "#result", {
    sides: 20,
    message: "You've gotten a {{result}}",
});

d20.roll();
d6.destroy();
d6.roll();
//{% endraw %}
