const Weight = (function () {
    // Selected milligrams as base unit and all others have their equivalence to it.
    // Each number can be thought to be a factor with unit mg/unit.
    const units = {
        Mg: 1,
        Grams: 1000,
        Kg: 1000000,
        Ton: 1000000000,
    };

    /**
     * Get result in formatted string
     */
    function _format(value, unit = "Mg") {
        return `${value.toLocaleString()} ${unit}`;
    }

    /**
     * Constructor function
     */
    function Constructor(weight) {
        this.weight = parseFloat(weight);
    }

    for (unit in units) {
        /**
         * Method that converts current instance to a given unit
         *
         * @returns value in desired units.
         */
        Constructor.prototype[`in${unit}`] = (function (unit) {
            let factor = 1 / units[unit];
            return function (format = false) {
                let result = this.weight * factor;
                return format ? _format(result, unit) : result;
            };
        })(unit);

        /**
         * Methods for adding weights in different units
         *
         * @param {Number} amount The amount in the given units to add to the instance's weight
         *
         * @returns {Constructor} current instance
         */
        Constructor.prototype[`add${unit}`] = (function (unit) {
            return function (amount) {
                this.weight = this.weight + amount * units[unit];
                return this;
            };
        })(unit);
    }

    return Constructor;
})();

let me = new Weight(70000000);

console.log(me.inMg());
console.log(me.inMg(true));

console.log(me.inKg());
console.log(me.inKg(true));

// Add 20 grams and subrtract a kilo before formating in Kg.
console.log(me.addGrams(20).addKg(-1).inKg(true));
