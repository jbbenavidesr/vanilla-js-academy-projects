// Select elements
let pwds = document.querySelectorAll('[type="password"]');
let toggle = document.querySelector('#show-passwords');

// Add the event listener to the toggle in order to change the display of the password fields
toggle.addEventListener('click', function (event) {
    for (let pwd of pwds) {
        pwd.type = toggle.checked ? 'text' : 'password';
    }
}); 

