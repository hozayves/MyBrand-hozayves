import {hasValue, saveUser, validateEmail, validatePassword } from "./helper.js";

const form = document.querySelector(".signup-form");

const NAME_REQUIRED = "Please enter your name.";
const EMAIL_REQUIRED = "Please enter your email.";
const EMAIL_INVALID = "Please enter a correct email address format."
const PASSWORD_REQUIRED = "Please enter your password"
const PASSWORD_INVALID = "Your password must contain (abc1234) "

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let nameValid = hasValue(form.elements['name'], NAME_REQUIRED)
    let emailValid = validateEmail(form.elements['email'], EMAIL_REQUIRED, EMAIL_INVALID)
    let passwordValid = validatePassword(form.elements['password'], PASSWORD_REQUIRED, PASSWORD_INVALID)

    if (nameValid && emailValid, passwordValid) {
        let newUser = {
            id: Date.now(),
            name: form.elements['name'].value,
            email: form.elements['email'].value,
            pwd: form.elements['password'].value,
            status: 'visitor',
            profile: ""
        }
        // Save a user to local storage
        saveUser(newUser)

        // Empting a user form
        form.elements['name'].value = ""
        form.elements['email'].value = ""
        form.elements['password'].value = ""
    }
    
})
