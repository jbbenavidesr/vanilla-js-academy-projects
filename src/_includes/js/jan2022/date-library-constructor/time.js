import { days, months, units } from "./utils.js";

/**
 * Time object for working with dates. Works as a wrapper over the native Date object.
 */
function Time(...dateArgs) {
    this.date = new Date(...dateArgs);
}

/**
 * Return a string with the day of the week for a given date in english
 *
 * @return {String} day of week in english
 */
Time.prototype.getDay = function () {
    let dayIndex = this.date.getDay();
    return days[dayIndex];
};

/**
 * Return a string with the day of the week for a given date in english
 *
 * @return {String} month in english
 */
Time.prototype.getMonth = function () {
    let monthIndex = this.date.getMonth();
    return months[monthIndex];
};

for (let unit of units) {
    /**
     * Return the date modified by the specific method unit and given amount
     *
     * @param {Number} value number of units to modify
     *
     * @return {Time} instance of Time with the date modified.
     */
    Time.prototype[`add${unit.add}`] = function (value) {
        this.date[`set${unit.set}`](this.date[`get${unit.get}`]() + value);
        return this;
    };
}

export default Time;
