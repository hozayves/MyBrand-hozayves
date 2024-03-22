import {
  hasValue,
  showError,
  showMessage,
  validateEmail,
  validatePassword,
} from "./helper.js";
const apiEndpointURL = "https://blog-apis-nfgp.onrender.com";

const form = document.querySelector(".signup-form");
const formContainer = document.querySelector(".login-form-container");

const NAME_REQUIRED = "Please enter your name.";
const EMAIL_REQUIRED = "Please enter your email.";
const EMAIL_INVALID = "Please enter a correct email address format.";
const PASSWORD_REQUIRED = "Please enter your password";
const PASSWORD_INVALID = "Make your password strong like (abcd#1234!)";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
  let emailValid = validateEmail(
    form.elements["email"],
    EMAIL_REQUIRED,
    EMAIL_INVALID
  );
  let passwordValid = validatePassword(
    form.elements["password"],
    PASSWORD_REQUIRED,
    PASSWORD_INVALID
  );
  if (nameValid && emailValid && passwordValid) {
    let newUser = {
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      password: form.elements["password"].value,
    };
    // Call API for create a new user
    try {
      const response = await fetch(`${apiEndpointURL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      //   Show success message
      showMessage(formContainer, data.message, true);
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 2000);
    } catch (error) {
      showError(messageError, "Please Try again later!");
    }
    // Empting a user form
    form.elements["name"].value = "";
    form.elements["email"].value = "";
    form.elements["password"].value = "";
  }
});
