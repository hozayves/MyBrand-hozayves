// show a message with type of the input
function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small")
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error"
    return type;
}
// show error
function showError(input, message) {
    return showMessage(input, message, false)
}
// show success
function showSuccess(input) {
    return showMessage(input, "", true)
}
// check if an input has a value
function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message)
    }
    return showSuccess(input)
}
// Check if input has valid email
function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false
    }
    // validate email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const email = input.value.trim();
    const words = email.split(/\s+/);
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg)
    }
    return true
}
function validatePassword(input, requiredMsg, invalidMsg) {
    if(!hasValue(input, requiredMsg)){
        return false
    }
    // validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.+\d)[A-Za-z\d]{1,7}$/

    const pwd = input.value.trim()
    if (!passwordRegex.test(pwd)) {
        return showError(input, invalidMsg)
    } 
    return true
}
const form = document.querySelector(".signup-form");

const NAME_REQUIRED = "Please enter your name.";
const EMAIL_REQUIRED = "Please enter your email.";
const EMAIL_INVALID = "Please enter a correct email address format."
const MESSAGE_REQUIRED = "Please enter your message!"
const MESSAGE_SUCCESS = "Thank you for your message."
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
            status: 'visitor'
        }
        // Save a user to local storage
        saveLocalStorage(newUser)

        // Empting a user form
        form.elements['name'].value = ""
        form.elements['email'].value = ""
        form.elements['password'].value = ""
    }
    
})

function saveLocalStorage(signup) {
    let users;
    if (localStorage.getItem("users") === null) {
        users = []
    } else {
        users = JSON.parse(localStorage.getItem('users'))
        console.log(users)
    }
    users.push(signup)
    localStorage.setItem("users", JSON.stringify(users))
}