// Select all the password inputs
let pwds = document.querySelectorAll('[data-password]');

// Add an event listener for clicks
document.addEventListener('click', function (event) {
    // If target is not a toggle, exit the function
    if (!event.target.matches('[data-toggle]')) return;

    // Identify the form of the toggle
    let formId = event.target.getAttribute('data-toggle') 

    // loop and change display in passwords of that form
    for (let pwd of pwds) {
        if (pwd.getAttribute('data-password') == formId) {
            pwd.type = event.target.checked ? 'text' : 'password';
        }
    }

}); 