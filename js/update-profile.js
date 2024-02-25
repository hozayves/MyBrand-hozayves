import { user,showError, showMessage, hasValue, validateEmail, validatePassword } from "./helper.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get("user"))

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");
    const NAME_REQUIRED = "Please enter your name.";
    const EMAIL_REQUIRED = "Please enter your email.";
    const EMAIL_INVALID = "Please enter a correct email address format."
    const PASSWORD_REQUIRED = "Please enter your password"
    const PASSWORD_INVALID = "Your password must contain (abc1234)"

    form.elements["name"].value = user(userId).name;
    form.elements["email"].value = user(userId).email;
    form.elements["password"].value = user(userId).pwd;

    let imageData = user(userId).image;
    form.elements["profile"].addEventListener("change", e => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            imageData = reader.result;
        })
        reader.readAsDataURL(e.target.files[0])
    })

    form.addEventListener("submit", e => {
        e.preventDefault()

        let nameInvalid = hasValue(form.elements["name"], NAME_REQUIRED)
        let emailInvalid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID)
        let passwordInvalid = validatePassword(form.elements["password"], PASSWORD_REQUIRED, PASSWORD_INVALID)

        if (nameInvalid && emailInvalid && passwordInvalid) {
            updateUser(userId, form.elements["name"].value, form.elements["email"].value, form.elements["password"].value, imageData)
        }
    })

    // update user
    function updateUser(id, name, email, password, profile) {
        const users = JSON.parse(localStorage.getItem("users"))
        const userIndex = users.findIndex(user => user.id === id);

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].image = profile;
        users[userIndex].pwd = password;

        localStorage.setItem("users", JSON.stringify(users))
        window.history.back()
    }
})