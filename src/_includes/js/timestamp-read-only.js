/**
 * A Constructor pattern library for working with timestamps.
 */
let Stamp = (function () {
    const units = {
        milliseconds: 1,
        seconds: 1000,
        minutes: 1000 * 60,
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24,
        weeks: 1000 * 60 * 60 * 24 * 7,
        years: 1000 * 60 * 60 * 24 * 365,
    };

    /**
     * Constructor: Instantiates the object and adds the stamp property.
     */
    function Constructor(timestamp) {
        
        let stamp = timestamp ? new Date(timestamp).getTime() : new Date().getTime();

		Object.defineProperties(this, {
			stamp:{value: stamp},
		})
    }

    // Methods
    /**
     * Generic function for adding timestamps with a given unit
     *
     * @param {Number} delta the ammount of units to add to the timestamp.
     * @param {String} units a string with one of the allowed units.
     *
     * @return {Constructor} Returns a new instance of the Constructor.
     */
    Constructor.prototype._addTime = function (delta, deltaUnits) {
		if (!units[deltaUnits]){
			throw `The units ${deltaUnits} are not supported yet.`
		}

        return new Constructor(this.stamp + delta * units[deltaUnits]);

    }

    /**
     * Returns a formatted date from the instance timestamp
     *
     * @param {Object} options some options for the formatting.
     *
     * @return {String} formatted date.
     */
    Constructor.prototype.getDate = function (options = {}) {
        let { locale, formatOptions } = Object.assign(
            {
                locale: navigator.language,
                formatOptions: {
                    dateStyle: "long",
                    timeStyle: "short",
                    hour12: false,
                },
            },
            options
        );

        let date = new Date(this.stamp);

        return date.toLocaleString(locale, formatOptions);
    };

    /**
     * For each of the units in the units object, I add a function
     * to the object that'll be returned. This function has the name
     * addUnit for each of the units, so for days it is addDays
     * The following applies to all the functions:
     *
     * @param {Number} delta is the number to add to each timestamp.
     *
     * @return {Constructor} instance of the Constructor.
     *
     */
    for (let unit in units) {
        Constructor.prototype[
            "add" + unit.replace(unit[0], unit[0].toUpperCase())
        ] = function (delta = 1) {
            return this._addTime(delta, unit);
        };
    }

    return Constructor;
})();

let now = new Stamp();
let notNow = new Stamp(new Date("09/15/1998"));

console.log("now: " + now.getDate())
console.log("1998: " + notNow.getDate({locale:"de"}));

let aWhileAgo = now.addWeeks().addDays(2).addYears(-3).getDate();

console.log(aWhileAgo);
console.log(now.getDate());