import { user, hasValue, validateEmail, loggedIn } from "./helper.js";

document.addEventListener("DOMContentLoaded", async () => {
  const {
    user: { name, _id, email, image },
  } = await loggedIn();
  const form = document.querySelector(".signup-form");
  const NAME_REQUIRED = "Please enter your name.";
  const EMAIL_REQUIRED = "Please enter your email.";
  const EMAIL_INVALID = "Please enter a correct email address format.";

  form.elements["name"].value = name;
  form.elements["email"].value = email;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let nameInvalid = hasValue(form.elements["name"], NAME_REQUIRED);
    let emailInvalid = validateEmail(
      form.elements["email"],
      EMAIL_REQUIRED,
      EMAIL_INVALID
    );

    if (nameInvalid && emailInvalid) {
      const updatedUser = {
        name: form.elements["name"].value,
        email: form.elements["email"].value,
      };
      const token = localStorage.getItem("token");
      const endpoint = new URL("http://localhost:9000/api/users");
      endpoint.searchParams.set("access_token", token);
      try {
        const user = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
        const response = await user.json();
        setTimeout(() => {
          window.history.back();
        }, 2000);
        console.log(updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  });

  // update user
  function updateUser(id, name, email, password, profile) {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((user) => user.id === id);

    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].image = profile;
    users[userIndex].pwd = password;

    localStorage.setItem("users", JSON.stringify(users));
  }
});
