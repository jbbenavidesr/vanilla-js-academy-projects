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
                return parseFloat(value) * factor;
            };
        }
    }

    /**
     * Get result in formatted string
     */
    function format(value, unit = "Gram") {
        return `${value.toLocaleString()} ${unit}`;
    }

    return { ...conversionFunctions, format };
})();

const weightForm = document.querySelector('[data-target="conversionData"]');
const resultContainer = document.querySelector('[data-target="result"]');

function submitHandler(event) {
    event.preventDefault();

    let data = new FormData(weightForm);

    let value = data.get("value");
    let current = data.get("currentUnit");
    let desired = data.get("desiredUnit");

    if (isNaN(value)) {
        resultContainer.textContent = "Please enter a valid value.";
        return;
    }

    if (current === desired) {
        resultContainer.textContent = `It's the same unit so it's still ${convert.format(
            value,
            current
        )}`;
        return;
    }

    let functionName = `${current.toLowerCase()}To${desired}`;

    let result = convert[functionName](value);

    resultContainer.textContent = `${convert.format(
        value,
        current
    )} is equivalent to ${convert.format(result, desired)}`;
}

weightForm.addEventListener("submit", submitHandler);
