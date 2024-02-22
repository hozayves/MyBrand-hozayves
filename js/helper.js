export function helloWorld() {
    return "Hello World!"
}
// show a message with type of the input
export function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small")
    msg.innerHTML = message;
    // update the class for the input
    input.className = type ? "success" : "error"
    return type;
}
// show error
export function showError(input, message) {
    return showMessage(input, message, false)
}
// show success
export function showSuccess(input) {
    return showMessage(input, "", true)
}
// check if an input has a value
export function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message)
    }
    return showSuccess(input)
}
// Check if input has valid email
export function validateEmail(input, requiredMsg, invalidMsg) {
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
export function validatePassword(input, requiredMsg, invalidMsg) {
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
// check if a message is more than 10 words
export function validateMinWords(input, wordNumb, message) {
    const msg = input.value.trim();
    const words = msg.split(/\s+/);

    if (words.length < wordNumb) {
        return showError(input, message)
    }
    return true
}
export function loggedIn() {
    const user = localStorage.getItem("loggedInUser")
    if (user) {
        let activeUser = JSON.parse(localStorage.getItem("loggedInUser"))
        return activeUser
    } else {
        return false
    }
}
