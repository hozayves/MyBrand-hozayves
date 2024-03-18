import { hasValue } from "./helper.js";
import { loggedIn } from "./helper.js";
//
const publish = document.querySelector(".writer-publish");
const result = document.querySelector(".publish-success");
const title = document.querySelector(".title");
const story = document.querySelector(".story");
const tags = document.querySelector(".tags");
const imageFile = document.querySelector(".image");

publish.addEventListener("click", async (e) => {
  e.preventDefault();
  const TITLE_REQUIRED = "Enter a title please!?";
  const STORY_REQUIRED = "Enter a story please!";
  const IMAGE_REQUIRED = "Enter a image required";
  const TAGS_REQUIRED = "Enter a tag required";

  let titleValid = hasValue(title, TITLE_REQUIRED);
  let storyValid = hasValue(story, STORY_REQUIRED);
  let tagsValid = hasValue(tags, TAGS_REQUIRED);
  let imageValid = hasValue(imageFile, IMAGE_REQUIRED);

  if (titleValid && storyValid && imageValid && tagsValid) {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("story", story.value);
    formData.append("tags", tags.value);
    formData.append("image", imageFile.files[0]);

    console.log(formData);

    const token = localStorage.getItem("token");
    const endpoint = new URL("http://localhost:9000/api/blogs");
    endpoint.searchParams.set("access_token", token);
    const newStory = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    const { ok } = await newStory.json();

    if (ok) {
      title.value = "";
      story.value = "";
      imageFile.value = "";
      result.innerText = "Your story already published.";
      setTimeout(() => {
        window.location.href = "./blogs.html";
      }, 1000);
    }
  }
});
// Save a new story
function saveArticle(title, content) {
  let article;
  let articleObject = {
    id: Date.now(),
    title: title,
    content: content,
    image: imageData,
    date: new Date(),
    bloggerId: loggedIn().id,
    comment: [],
    likes: [],
    tags: ["ux", "backend", "css"],
  };

  if (localStorage.getItem("articles") === null) {
    article = [];
  } else {
    article = JSON.parse(localStorage.getItem("articles"));
  }
  article.push(articleObject);
  localStorage.setItem("articles", JSON.stringify(article));
  return true;
}
