const convert = (function () {
    // Selected grams as base unit and all others have their equivalence to grams.
    // Each number can be thought to be a factor with unit gr/unit.
    const units = {
        Mg: 0.001,
        Grams: 1,
        Kg: 1000,
    };

    const conversionFunctions = {};

    for (current in units) {
        for (desired in units) {
            // Skip conversion to same unit
            if (current == desired) continue;

            let name = `${current.toLowerCase()}To${desired}`;

            // Grams are cancelled and result is the factor: desired/current
            let factor = units[current] / units[desired];

            /**
             * Utitlty function that converts between current and desired unit
             *
             * @param {Number} value The number in the current units.
             * @returns value in desired units.
             */
            conversionFunctions[name] = function (value) {
                return value * factor;
            };
        }
    }

    return conversionFunctions;
})();
