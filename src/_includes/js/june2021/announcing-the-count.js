//Select elements from DOM
let text = document.querySelector("#text");
let counter = document.querySelector("[data-count]");

// counters
let countHandlers = {
  words: function (textInput) {
	return textInput.value.split(/[\s]+/g).filter(function (item) {
	  return !!(item.trim());
	}).length; 
  },
  char: function (textInput) {
	return textInput.value.length;
  }
};

// Event listener
text.addEventListener('input', function(event) {
  let wordCount = countHandlers.words(event.target)
  let charCount = countHandlers.char(event.target)
  counter.textContent = `You've written ${wordCount} words and ${charCount} characters.`
});