/** {% raw %}
 * Library for creating a digital dice.
 */
let Dice = (function () {
    // default options
    const defaults = {
        number: 6,
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

        return array;
    }

    /**
     * Creates the event listener for the roll button
     *
     * @param {Node} btn The button to attatch the listener
     * @param {Constructor} instance the current instantiation
     */
    function createEventListener(btn, instance) {
        // Create the faces array
        let faces = Array.from(new Array(instance._settings.number)).map(
            function (item, index) {
                return index + 1;
            }
        );

        /**
         * Rolls the dice. Handles the click event.
         */
        function roll() {
            let result = shuffle(faces)[0];
            instance._display.textContent = instance._settings.message.replace(
                "{{result}}",
                result.toString()
            );
        }

        btn.addEventListener("click", roll);
    }

    /**
     * The Constructor Object
     *
     * @param {String} buttonSelector The selector where the button will be.
     * @param {String} displaySelector The selector of where to display the result.
     */
    function Constructor(
        buttonSelector = "#button",
        displaySelector = "#display",
        options = {}
    ) {
        // Select elements
        let button = document.querySelector(buttonSelector);
        let display = document.querySelector(displaySelector);

        // Check if elements do exist
        if (!button | !display)
            throw "Button and display elements should be provided for this to work";

        // Make sure display has aria live polite
        display.setAttribute("aria-live", "polite");

        // Set the settings of the instance
        let settings = Object.assign({}, defaults, options);
        Object.freeze(settings);

        // Set properties
        Object.defineProperties(this, {
            _button: { value: button },
            _display: { value: display },
            _settings: { value: settings },
        });

        // Create the event Listener
        createEventListener(button, this);
    }

    return Constructor;
})();

let d6 = new Dice("#d6", "#result");
let d20 = new Dice("#d20", "#result", {
	number: 20,
	message: "You've gotten a {{result}}"
});
//{% endraw %}