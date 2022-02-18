/**
 * A revealing module pattern that exposes a set of utility methods for working
 * with JS native Date object.
 */
const time = (function () {
    // An array of month names
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // An array of day names
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // An array of time units
    let units = [
        {
            get: "Seconds",
            set: "Seconds",
            add: "Seconds",
        },
        {
            get: "Minutes",
            set: "Minutes",
            add: "Minutes",
        },
        {
            get: "Hour",
            set: "Hours",
            add: "Hours",
        },
        {
            get: "Date",
            set: "Date",
            add: "Days",
        },
        {
            get: "Month",
            set: "Month",
            add: "Months",
        },
        {
            get: "FullYear",
            set: "Year",
            add: "Years",
        },
    ];

    /**
     * Return a string with the day of the week for a given date in english
     *
     * @param {Date} date date to get the day of the week
     *
     * @return {String} day of week in english
     */
    function getDay(date) {
        let dayIndex = date.getDay();
        return days[dayIndex];
    }

    /**
     * Return a string with the day of the week for a given date in english
     *
     * @param {Date} date date to get the day of the week
     *
     * @return {String} month in english
     */
    function getMonth(date) {
        let monthIndex = date.getMonth();
        return months[monthIndex];
    }

    let addMethods = {};

    for (let unit of units) {
        /**
         * Return the date modified by the specific method unit and given amount
         *
         * @param {Date} date date to use as base
         * @param {Number} value number of units to modify
         *
         * @return {Date} original date modified by value units
         */
        addMethods[`add${unit.add}`] = function (date, value) {
            return date[`set${unit.set}`](date[`get${unit.get}`]() + value);
        };
    }

    return { getDay, getMonth, ...addMethods };
})();
