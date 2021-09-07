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

    /*!
     * Emit a custom event
     * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {String} type   The event type
     * @param  {Object} detail Any details to pass along with the event
     * @param  {Node}   elem   The element to attach the event to
     */
    function emitEvent(type, detail = {}, elem = document) {
        // Make sure there's an event type
        if (!type) return;

        // Create a new event
        let event = new CustomEvent(type, {
            bubbles: true,
            cancelable: true,
            detail: detail,
        });

        // Dispatch the event
        return elem.dispatchEvent(event);
    }

    /**
     * Creates the event listener for the roll button
     *
     * @param {Node} btn The button to attatch the listener
     * @param {Constructor} instance the current instantiation
     */
    function createEventListener(instance) {
        /**
         * Rolls the dice. Handles the click event.
         */
        function roll() {
            instance.roll();
        }

        instance._button.addEventListener("click", roll);

        return roll;
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

        // Create the event Listener and attatch it
        Object.defineProperties(this, {
            _listener: { value: createEventListener(this) },
        });
    }

    /**
     * Method for programatically roll the dice.
     */
    Constructor.prototype.roll = function () {
        // Destructure instance
        let { _button, _display, _sides, _message } = this;

        let cancelled = !emitEvent(
            "dice:before-roll",
            {
                display: _display,
                sides: _sides,
            },
            _button
        );

        if (cancelled) return;

        // Create the faces array
        let faces = Array.from(new Array(_sides)).map(function (item, index) {
            return index + 1;
        });

        let result = shuffle(faces);

        _display.textContent = _message.replace("{{result}}", result);

        emitEvent(
            "dice:roll",
            {
                result,
                message: _message.replace("{{result}}", result),
                display: _display,
            },
            _button
        );
    };

    /**
     * Destroy the instance.
     */
    Constructor.prototype.destroy = function () {
        // Destructure the instance
        let { _button, _listener, _display } = this;

        // Destroy the event listener
        _button.removeEventListener("click", _listener);

        // Clear the UI.
        _button.setAttribute("disabled", true);
        _display.textContent = "";

        // Remove the roll function
        this.roll = null;
    };

    return Constructor;
})();
let d1 = new Dice("#d1", "#result", {
	sides: 1,
});
let d20 = new Dice("#d20", "#result", {
    sides: 20,
    message: "You've gotten a {{result}}",
});

document.addEventListener("dice:before-roll", function (event) {
	if(event.target.matches('#d1')) {
		event.preventDefault()
		alert(`I don't work, I have ${event.detail.sides} side and this makes no sense.`)
	}
    console.log(event.detail);
});
document.addEventListener("dice:roll", function (event) {
    console.log(event.detail);
});
//{% endraw %}
