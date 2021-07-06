// 
// Variables
//

// DOM elements
const notebookForm = document.querySelector('[data-app="notebook"]');
const saveFields = notebookForm.querySelectorAll('[data-save]');

//
// Functions
//

/**
 * Show status message.
 * 
 * @param {Element} parent Parent element in which the message will be shown.
 * @param {String} message content of the message to display
 * @param {Number} time time in miliseconds of the satatus message being displayed.
 */
function showStatus (parent, message, time) {

	// Create a notification
	let notification = document.createElement('small');
	notification.setAttribute('aria-live', 'polite');

	// Inject it into the DOM
	parent.append(notification);

	// Add text after it's in the UI
	setTimeout(function () {
		notification.textContent = message;
	}, 1);

	// Remove it after 4 seconds
	setTimeout(function () {
		notification.remove();
	}, time);

}


/**
 * save the contents of the notebook form to localStorage
 */
function saveNotebook() {
    for (field of saveFields) {
        let fieldName = "notebook-" + field.getAttribute('data-save');
        localStorage.setItem(fieldName, field.value);
    }
}

/**
 * load contents of notebook from localStorage
 */
function loadNotebook() {
    for (field of saveFields) {
        let fieldName = "notebook-" + field.getAttribute('data-save');
        let savedContent = localStorage.getItem(fieldName);
        if (savedContent) {
            field.value = savedContent;
        }
    }
}

/**
 * Handle the submit of the form by saving the contents.
 */
function submitHandler(event) {
    event.preventDefault();

    saveNotebook();

    showStatus(notebookForm, "Notebook contents have been saved.", 4000)
}

//
// Initializations
//

loadNotebook();

notebookForm.addEventListener('submit', submitHandler)