/**
 * A utility library for working with timestamps.
 */
let stamp = (function () {
    const units = {
        milliseconds: 1,
        seconds: 1000,
        minutes: 1000 * 60,
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24,
        weeks: 1000 * 60 * 60 * 24 * 7,
        years: 1000 * 60 * 60 * 24 * 365,
    };

    // Methods
    /**
     * Generic function for adding timestamps with a given unit
     *
     * @param {Number} start the timestamp to have as a starting point.
     * @param {Number} delta the ammount of units to add to the timestamp.
     * @param {String} units a string with one of the allowed units.
     *
     * @return {Number} timestamp after the addition.
     */
    function addTime(start, delta, deltaUnits) {
        return start + delta * units[deltaUnits];
    }

    /**
     * Returns a formatted date from a timestamp
     *
     * @param {Number} timestamp the stamp that will be used for getting the date.
     * @param {Object} options some options for the formatting.
     *
     * @return {String} formatted date.
     */
    function getDate(timestamp = new Date().getTime(), options = {}) {
        let { locale, formatOptions } = Object.assign({
            locale: navigator.language,
            formatOptions: {
                dateStyle: "long",
                timeStyle: "short",
                hour12: false,
            },
        }, options);

        let date = new Date(timestamp);

        return date.toLocaleString(locale, formatOptions);
    }

    let library = { getDate };

    /**
     * For each of the units in the units object, I add a function
     * to the object that'll be returned. This function has the name
     * addUnit for each of the units, so for days it is addDays
     * The following applies to all the functions:
     *
     * @param {Number} timestamp is the starting point.
     * @param {Number} delta is the number to add to each timestamp.
     *
     * @return {Number} The timestamp after the calculation.
     *
     */
    for (let unit in units) {
        library["add" + unit.replace(unit[0], unit[0].toUpperCase())] =
            function (timestamp = new Date().getTime(), delta = 1) {
                // If the start is not a timestamp but a Date object, get the timestamp
                if (
                    Object.prototype.toString
                        .call(timestamp)
                        .slice(8, -1)
                        .toLocaleLowerCase() === "date"
                ) {
                    timestamp = timestamp.getTime();
                }
                return addTime(timestamp, delta, unit);
            };
    }

    return library;
})();


let now= new Date().getTime();

console.log(stamp.getDate());

let testData = {
    tomorrow: stamp.addDays(now, 1),
    nextWeek: stamp.addWeeks(now, 1),
    nextMonth: stamp.addDays(now, 30),
    nextYear: stamp.addYears(now, 1),
    nextHour: stamp.addHours(now, 1),
};

for (test in testData) {
    console.log(test + ": " + stamp.getDate(testData[test]));
}