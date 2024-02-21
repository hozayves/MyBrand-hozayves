// show a message with type of the input
function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small")
    msg.innerHTML = message;
    // update the class for the input
    msg.className = type ? "success" : "error"
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
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg)
    }
    return true
}

const signForm = document.querySelector(".login-form");
const result = document.querySelector("#result")
signForm.addEventListener('submit', e => {
    e.preventDefault()

    const EMAIL_REQUIRED = "Please enter your email.";
    const EMAIL_INVALID = "Please enter valid email format."
    const PASSWORD_REQUIRED = "Please enter your password"
    const PASSWORD_INCORRECT = "Wrong password. Try again!"

    let emailValid = validateEmail(signForm.elements['email'], EMAIL_REQUIRED, EMAIL_INVALID)
    let passwordValid = hasValue(signForm.elements['password'], PASSWORD_REQUIRED);

    if (emailValid && passwordValid) {
        localStorage_login(signForm.elements['email'], signForm.elements['password'])
    }
})

// local storage
function localStorage_login(email, password) {

    // Check if there is users
    const users = JSON.parse(localStorage.getItem("users"));
    if (users.length > 0) {
        const userEmail = users.find(user => user.email === email.value)
        const userPwd = users.find(user => user.pwd === password.value)

        if (userEmail) {
            showError(result, "")
            if (userPwd) {
                console.log("Logged In")
                localStorage.setItem('loggedInUser', JSON.stringify({...userEmail, loggedIn: true}))
                email.value = "";
                password.value = ""
                setTimeout(() => {
                    window.location.href = 'blogs.html'
                }, 1000)
            } else {
                return showError(password, "Invalid password. Please check your password and try again.")
            }
        } else {
            return showError(result, 'We couldn\'t find an account with that email. signing up if you\'re new account <a href="./signup.html" style="font-weight: 700; font-size: 1rem; ">Sign Up</a>.')
        }
    } else {
        return showError(result, 'We couldn\'t find an account with that email. signing up if you\'re new account <a href="./signup.html" style="font-weight: 700; font-size: 1rem; ">Sign Up</a>.')
    }
}
