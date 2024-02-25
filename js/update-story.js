import {hasValue,} from "./helper.js";
import { loggedIn } from "./helper.js";
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get("edit"))


let articles = JSON.parse(localStorage.getItem("articles"))
let article = articles.find(article => {
    return article.id === articleId
})
// 
const updateStory = document.querySelector(".update")
const title = document.querySelector(".title")
const story = document.querySelector(".story")
const titleValue = document.querySelector(".title").value = article.title
const storyValue = document.querySelector(".story").value = article.content
const imageFile = document.querySelector(".image")
const result = document.querySelector(".publish-success")

// Image files
let imageData = article.image;
imageFile.addEventListener("change", e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        imageData = reader.result;
    })
    reader.readAsDataURL(e.target.files[0])
})
updateStory.addEventListener('click', (e) => {
    
    const TITLE_REQUIRED = "Enter a title please!?";
    const STORY_REQUIRED = "Enter a story please!";

    let titleValid = hasValue(title, TITLE_REQUIRED)
    let storyValid = hasValue(story, STORY_REQUIRED)

    if (titleValid && storyValid) {
        updateArticle(articleId, title.value, story.value);
        title.value = "";
        story.value = "";
        imageFile.value = ""
        result.innerText = "Your story already Updated."
        setTimeout(() => {
            window.location.href = "./blogs.html"
        }, 1000)
    }
})
function updateArticle(id, title, content) {

    const articleIndex = articles.findIndex(article => {
        return article.id === id
    })
    articles[articleIndex].title = title
    articles[articleIndex].content = content
    articles[articleIndex].image = imageData
    localStorage.setItem("articles", JSON.stringify(articles))

}