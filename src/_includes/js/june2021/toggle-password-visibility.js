// Selection of DOM elements.
let pwdInput = document.querySelector('#password');
let pwdToggle = document.querySelector('#show-password');

// event listeners
pwdToggle.addEventListener('click', function (event) {
    if (pwdToggle.checked) {
        pwdInput.type = 'text';
    } else {
        pwdInput.type = 'password';
    };
});