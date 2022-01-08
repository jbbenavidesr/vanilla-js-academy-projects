//Select elements from DOM
let text = document.querySelector("#text");
let counters = document.querySelectorAll("[data-count]");

// counters
let countHandlers = {
  words: function (textInput) {
	return textInput.value.replaceAll('\n', ' ').split(' ').filter(function (item) {
	  return !!(item.trim());
	}).length; 
  },
  char: function (textInput) {
	return textInput.value.length;
  }
};

// Event listener
text.addEventListener('input', function(event) {
  for (let counter of counters) {
	let countHandler = counter.getAttribute('data-count');
	if (!countHandler || !countHandlers[countHandler]) return;
	counter.innerText = countHandlers[countHandler](event.target);
  }
});

// Add Polyfill 
/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){
        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }
        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}