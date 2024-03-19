import {
  showError,
  hasValue,
  validateEmail,
  decodeToken,
  isTokenValid,
} from "./helper.js";

const apiEndpointURL = "https://blog-apis-nfgp.onrender.com";

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
      const response = await fetch(`${apiEndpointURL}/api/auths`, {
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
