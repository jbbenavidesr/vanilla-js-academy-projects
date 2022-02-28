/**
 * Some helpers and util information
 */

// An array with month names
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
        set: "FullYear",
        add: "Years",
    },
];

export { months, days, units };
