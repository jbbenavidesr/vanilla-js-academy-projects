import { getDay, addMonths } from "./time.js";

// Create a new Date() object
let halloween = new Date("October 31, 2021");
console.log(halloween);

// Get the day of the week for Halloween
let day = getDay(halloween);
console.log(day);

// Add 4 months to the date
addMonths(halloween, 4);
console.log(halloween);
