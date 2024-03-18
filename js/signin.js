import {
  showError,
  hasValue,
  validateEmail,
  decodeToken,
  isTokenValid,
} from "./helper.js";

const signForm = document.querySelector(".login-form");
const result = document.querySelector("#result");
signForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const EMAIL_REQUIRED = "Please enter your email.";
  const EMAIL_INVALID = "Please enter valid email format.";
  const PASSWORD_REQUIRED = "Please enter your password";
  const PASSWORD_INCORRECT = "Wrong password. Try again!";

  let emailValid = validateEmail(
    signForm.elements["email"],
    EMAIL_REQUIRED,
    EMAIL_INVALID
  );
  let passwordValid = hasValue(
    signForm.elements["password"],
    PASSWORD_REQUIRED
  );

  if (emailValid && passwordValid) {
    try {
      const email = signForm.elements["email"].value;
      const pwd = signForm.elements["password"].value;
      const response = await fetch("http://localhost:9000/api/auths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email, password: pwd }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        showError(result, errorData.message);
      } else {
        // Erase error message
        showError(result, "");
        // Extract the JWT token from the response
        const { token } = await response.json();
        // Store the token in the localstorage
        localStorage.setItem("token", token);
        // Redirect to the previous navigation page
        window.location.href = "./blogs.html";
      }
    } catch (error) {
      console.log("Error during login: ", error);
    }
    // localStorage_login(signForm.elements['email'], signForm.elements['password'])
  }
});

// local storage
function localStorage_login(email, password) {
  // Check if there is users
  const users = JSON.parse(localStorage.getItem("users"));
  if (users.length > 0) {
    const userEmail = users.find((user) => user.email === email.value);
    const userPwd = users.find((user) => user.pwd === password.value);

    if (userEmail) {
      showError(result, "");
      if (userPwd) {
        console.log("Logged In");
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...userEmail, loggedIn: true })
        );
        email.value = "";
        password.value = "";
        setTimeout(() => {
          window.location.href = "./blogs.html";
        }, 1000);
      } else {
        return showError(
          password,
          "Invalid password. Please check your password and try again."
        );
      }
    } else {
      return showError(
        result,
        'We couldn\'t find an account with that email. signing up if you\'re new account <a href="./signup.html" style="font-weight: 700; font-size: 1rem; ">Sign Up</a>.'
      );
    }
  } else {
    return showError(
      result,
      'We couldn\'t find an account with that email. signing up if you\'re new account <a href="./signup.html" style="font-weight: 700; font-size: 1rem; ">Sign Up</a>.'
    );
  }
}
