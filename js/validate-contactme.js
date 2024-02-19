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
// check if a message is more than 10 words
function validateMinWords(input, wordNumb, message) {
    const msg = input.value.trim();
    const words = msg.split(/\s+/);

    if (words.length < 10) {
        return showError(input, message)
    }
    return true
}
const form = document.querySelector(".contactMe");

const NAME_REQUIRED = "Please enter your name.";
const EMAIL_REQUIRED = "Please enter your email.";
const EMAIL_INVALID = "Please enter a correct email address format."
const MESSAGE_REQUIRED = "Please enter your message!"
const MESSAGE_50WORDS_REQUIRED = "Please enter minimum 10 words."
const MESSAGE_SUCCESS = "Thank you for your message."

form.addEventListener("submit", (e) => {
    e.preventDefault()

    // validate form
    let nameValid = hasValue(form.elements["name"], NAME_REQUIRED)
    let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID)
    let messageValid = hasValue(form.elements["message"], MESSAGE_REQUIRED)
    let messageWords = validateMinWords(form.elements["message"], 10, MESSAGE_50WORDS_REQUIRED)

    // if valid, submit form.
    if (nameValid && emailValid && messageValid & messageWords) {
        form.elements["name"].value = ""
        form.elements["email"].value = ""
        form.elements["message"].value = ""
        form.firstElementChild.innerText = MESSAGE_SUCCESS
        setTimeout(() => {
            form.firstElementChild.innerText = ""
        }, 1000)
    }
})