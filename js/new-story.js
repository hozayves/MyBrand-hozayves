import {hasValue,} from "./helper.js";
import { loggedIn } from "./helper.js";
console.log(loggedIn())
// 
const publish = document.querySelector(".writer-publish")
const title = document.querySelector(".title")
const story = document.querySelector(".story")
const imageFile = document.querySelector(".image")
const result = document.querySelector(".publish-success")

// Image files
let imageData;
imageFile.addEventListener("change", e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        imageData = reader.result;
    })
    reader.readAsDataURL(e.target.files[0])
})


publish.addEventListener('click', (e) => {
    
    const TITLE_REQUIRED = "Enter a title please!?";
    const STORY_REQUIRED = "Enter a story please!";
    const IMAGE_REQUIRED = "Enter a image required";


    let titleValid = hasValue(title, TITLE_REQUIRED)
    let storyValid = hasValue(story, STORY_REQUIRED)
    let imageValid = hasValue(imageFile, IMAGE_REQUIRED)

    if (titleValid && storyValid && imageValid) {
        saveArticle(title.value, story.value);
        title.value = "";
        story.value = "";
        imageFile.value = ""
        result.innerText = "Your story already published."
        setTimeout(() => {
            window.location.href = "./blogs.html"
        }, 1000)
    }
})
// Save a new story
function saveArticle(title, content) {
    let article
    let articleObject = {
        id: Date.now(),
        title: title,
        content: content,
        image: imageData,
        date: new Date(),
        bloggerName: loggedIn().name,
        blogger: [{id: loggedIn().id, name: loggedIn().name, profile: loggedIn().profile}],
        comment: [],
        likes: [],
        tags: ["ux", "backend", "css"]

    }

    if (localStorage.getItem('articles') === null) {
        article = []
    } else {
        article = JSON.parse(localStorage.getItem("articles"))
    }
    article.push(articleObject)
    localStorage.setItem("articles", JSON.stringify(article))
    return true
}