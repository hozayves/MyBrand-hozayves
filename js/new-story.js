// show a message with type of the input
function showMessage(input, message, type) {
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error"
    return input
}
// Show error 
function showError(input, message) {
    return showMessage(input, message, false)
}
// Show success
function showSuccess(input) {
    return showMessage(input, "", true)
}
// check if the textboxes has a values
function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message)
    }
    return showSuccess(input)
}

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
        console.log("Publish already Done!!");
    }
})