/**
 * Get a date in the future (or past) from a timestamp
 * 
 * @param {Object} options an object with different options that can be given.
 * 							By default, the function returns the date of tomorrow
 * 							formated with the browser's language.
 * 
 * @return {String} A formatted date string
 */
function getFormatedFutureDate (options = {}) {
	
	let {start, delta, deltaUnits, locale, localeStringOptions} = Object.assign({
		start: new Date().getTime(),
		delta: 1,
		deltaUnits: "days",
		locale: navigator.language,
		localeStringOptions: {
			dateStyle: 'long',
			timeStyle: 'short',
			hour12: false,
		},
	}, options);

	const units = {
		miliseconds: 1,
		seconds: 1000,
		minutes: 1000 * 60,
		hours: 1000 * 60 * 60,
		days: 1000 * 60 * 60 * 24,
		years: 1000 * 60 * 60 * 24 * 365,
	}

	// If the start is not a timestamp but a Date object, get the timestamp
	if (Object.prototype.toString.call(start).slice(8, -1).toLocaleLowerCase() === "date")
		{start = start.getTime();}

	// Check if the units are in the possibilities. 
	if (!units[deltaUnits]) {throw "Those units are not allowed";}

	let futureTimestamp = start + delta * units[deltaUnits];
	let futureDate = new Date(futureTimestamp);

	return futureDate.toLocaleString(locale, localeStringOptions);
}

console.log(getFormatedFutureDate()); // Should give tomorrow

console.log(getFormatedFutureDate({
	start: new Date("09/15/1998"),
	delta: 10,
	deltaUnits: "years",
})); // should be somewhere near september 15 2008 (errors are given by leaps)

console.log(getFormatedFutureDate({
	delta: -5,
	start: new Date("11/04/2021").getTime(),
	deltaUnits: "years",
	locale: "fr",
})); 
