// First select the elements needed
let textArea = document.querySelector('#text');
let characterCountDisplay = document.querySelector('#character-count');

// Add an event listener on the input.
textArea.addEventListener('input', function (event) {
	// Set the number to display as the length of the string in the content
	characterCountDisplay.innerText = textArea.value.length;
});