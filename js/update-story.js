import { hasValue } from "./helper.js";
import { loggedIn } from "./helper.js";
const apiEndpointURL = "https://blog-apis-nfgp.onrender.com";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async () => {
  if (await loggedIn()) {
    const {
      ok,
      user: { admin, email, name },
    } = await loggedIn();
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("edit");

    try {
      const res = await fetch(`${apiEndpointURL}/api/blogs/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const article = await res.json();

      //
      const updateStory = document.querySelector(".update");
      const title = document.querySelector(".title");
      const story = document.querySelector(".story");
      const titleValue = (document.querySelector(".title").value =
        article.blog.title);
      const storyValue = (document.querySelector(".story").value =
        article.blog.story);
      const imageFile = document.querySelector(".image");
      const result = document.querySelector(".publish-success");

      // Image files
      let imageData = article.image;
      imageFile.addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          imageData = reader.result;
        });
        reader.readAsDataURL(e.target.files[0]);
      });
      updateStory.addEventListener("click", (e) => {
        const TITLE_REQUIRED = "Enter a title please!?";
        const STORY_REQUIRED = "Enter a story please!";

        let titleValid = hasValue(title, TITLE_REQUIRED);
        let storyValid = hasValue(story, STORY_REQUIRED);

        if (titleValid && storyValid) {
          if (updateArticle(articleId, title.value, story.value)) {
            title.value = "";
            story.value = "";
            imageFile.value = "";
            result.innerText = "Your story already Updated.";
            setTimeout(() => {
              window.location.href = "./blogs.html";
            }, 1000);
          } else {
            console.log("Update goes wrong");
          }
        }
      });
      async function updateArticle(id, title, content) {
        const endpoint = new URL(`${apiEndpointURL}/api/blogs/${id}`);
        endpoint.searchParams.set("access_token", token);
        try {
          const res = await fetch(endpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              content: content,
              image: imageData,
            }),
          });

          const data = await res.json();
          return data.ok;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    window.location.href = "./login.html";
  }
});
