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
     * Constructor function
     */
    function Constructor(weight) {
        this.weight = parseFloat(weight);
    }

    for (unit in units) {
        let name = `in${unit}`;

        /**
         * Property that converts current instance to a given unit
         *
         * @returns value in desired units.
         */
        Constructor.prototype[name] = (function () {
            let factor = 1 / units[unit];
            return function () {
                this.weight = this.weight * factor;
            };
        })();
    }

    /**
     * Get result in formatted string
     */
    Constructor.prototype.format = function (unit = "Grams") {
        return `${this.weight.toLocaleString()} ${unit}`;
    };

    return Constructor;
})();

let me = new Weight(70000000);

console.log(me.format("mg"));

me.inKg();

console.log(me.format("kg"));
