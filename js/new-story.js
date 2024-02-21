import { showMessage, showError, hasValue, showSuccess} from "./helper.js";

// 
const publish = document.querySelector(".writer-publish")
publish.addEventListener('click', (e) => {
    
    const TITLE_REQUIRED = "Enter a title please!?";
    const STORY_REQUIRED = "Enter a story please!";

    const title = document.querySelector(".title")
    const story = document.querySelector(".story")

    let titleValid = hasValue(title, TITLE_REQUIRED)
    let storyValid = hasValue(story, STORY_REQUIRED)

    if (titleValid && storyValid) {
        saveArticle(title.value, story.value)
    }
})
// Save a new story
function saveArticle(title, content) {
    let articles = JSON.parse(localStorage.getItem('articles'))

    if (!articles === null) {
        console.log(articles)
    } else {
        articles = []
    }
    console.log(articles)
}