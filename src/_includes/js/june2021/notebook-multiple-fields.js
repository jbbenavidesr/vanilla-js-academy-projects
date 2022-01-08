//
// Variables
//

// DOM Elements
const notes = document.querySelector('[data-notebook="notes"]');

//
// Functions
//

// Helpers

/**
 * Show status message.
 * 
 * @param {Element} parent Parent element in which the message will be shown.
 * @param {String} message content of the message to display
 * @param {Number} time time in miliseconds of the satatus message being displayed.
 */
function showStatus(parent, message, time) {

    // Create element for displaying status
    let notification = document.createElement('small');
    notification.setAttribute('aria-live', 'polite');

    // Inject element to the UI
    parent.append(notification)

    // Display notification message
    setTimeout(function() {
        notification.textContent = message;
    }, 1);

    // Remove notification from the UI
    setTimeout(function() {
        notification.remove();
    }, time);   
};

/**
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * 
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
function serialize (data) {
    let obj = {};
    for (let [key, value] of data) {
        if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
};

// General functions
/**
 * Function that saves the data of a notebook to localStorage.
 * 
 * @param {Element} notebook Form Element containing the notebook.
 */
function saveNotebook(notebook) {

    // Create an object with the information in the notebook
    let data = serialize(new FormData(notebook));

    // Save object to local Storage
    localStorage.setItem(notebook.getAttribute('data-notebook'), JSON.stringify(data));

    // Show notification
    showStatus(notebook, "Contents of the notebook have been saved...", 3000);
}

/**
 * Load contents of notebook from local Storage if available.
 * 
 * @param {Element} notebook Form Element containing the notebook.
 */
function loadNotebook(notebook) {

    // get Data for the notebook
    let data = localStorage.getItem(notebook.getAttribute('data-notebook'));

    // Check if notebook is stored
    if (!data) {
        showStatus(notebook, "No notebook was found.", 3000);
        return;
    }

    // Load information into the notebook
    data = JSON.parse(data);
    for (let key in data) {
        notebook.querySelector(`[name=${key}]`).value = data[key];
    }

}

// Handlers


let handlers = {
    click: function (event) {
        let action = event.target.getAttribute('data-action');
        if (!action || !handlers[action]) return;

        handlers[action](event);
    },

    submit: function (event) {

        // Prevent page reload
        event.preventDefault();

        saveNotebook(event.target);
    },

    /**
     * Delete note
     * @param {Event} event click event of button within a notebook form
     */
    delete: function (event) {
        // Get notebook
        let notebook = event.target.closest('[data-notebook]');

        // get Data for the notebook
        let data = JSON.parse(localStorage.getItem(notebook.getAttribute('data-notebook')));

        // Check if notebook is stored
        if (!data) {
            showStatus(notebook, "No notebook was found.", 3000);
            return;
        }

        localStorage.removeItem(notebook.getAttribute('data-notebook'));

        for (let key in data) {
            notebook.querySelector(`[name=${key}]`).value = '';
        }
        
        showStatus(notebook, "The note has been deleted...", 3000);
    }
}



//
// Initializers and event listeners
//
loadNotebook(notes);

notes.addEventListener('submit', handlers.submit);
document.addEventListener('click', handlers.click);
