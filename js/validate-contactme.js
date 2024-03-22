import {
  showError,
  hasValue,
  validateEmail,
  validateMinWords,
} from "./helper.js";

const form = document.querySelector(".contactMe");

const NAME_REQUIRED = "Please enter your name.";
const EMAIL_REQUIRED = "Please enter your email.";
const EMAIL_INVALID = "Please enter a correct email address format.";
const MESSAGE_REQUIRED = "Please enter your message!";
const MESSAGE_50WORDS_REQUIRED = "Please enter minimum 10 words.";
const MESSAGE_SUCCESS = "Thank you for your message.";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // validate form
  let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
  let emailValid = validateEmail(
    form.elements["email"],
    EMAIL_REQUIRED,
    EMAIL_INVALID
  );
  let messageValid = hasValue(form.elements["message"], MESSAGE_REQUIRED);
  let messageWords = validateMinWords(
    form.elements["message"],
    10,
    MESSAGE_50WORDS_REQUIRED
  );

  // if valid, submit form.
  if (nameValid && emailValid && messageValid & messageWords) {
    try {
      const res = await fetch(
        "https://blog-apis-nfgp.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      form.elements["name"].value = "";
      form.elements["email"].value = "";
      form.elements["message"].value = "";
      form.firstElementChild.innerText = MESSAGE_SUCCESS;
      setTimeout(() => {
        form.firstElementChild.innerText = "";
      }, 1000);
    }
  }
});
