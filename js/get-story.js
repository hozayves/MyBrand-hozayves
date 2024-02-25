import { getComments, hasValue, likeArticle, likeCommentCounter, loggedIn, saveComment, showError, unLikeArticle, user } from "./helper.js";
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('articleId'));
const likeBtn = document.querySelector(".blogx-blogger-links-like");
const commentBtn = document.querySelector(".blogx-blogger-links-comment");

document.addEventListener("DOMContentLoaded", e => {
    getStory()
    // like and comment counter function
    likeCommentCounter(articleId, likeBtn, commentBtn, loggedIn().id)


    // implementation of comment section
    const comment = document.querySelector(".comment");
    const closeComment = document.querySelector(".comment-header-close");
    const commentInput = document.querySelector(".comment-input");
    const commentResponse = document.querySelector(".comment-btn").firstElementChild
    const commentSection = document.querySelector(".comment-section")
    const commentUser = document.querySelector(".comment-user")

    // loading logged in user profile in comment section
    const profile = document.createElement("div")
    profile.className = "comment-user"
    if (loggedIn().profile === "") {
        profile.innerHTML = `
            <img src="./images/profile-sample.png" alt="profile-image">
            <p>${loggedIn().name}</p>
        `
    } else {
        profile.innerHTML = `
            <img src="${loggedIn().profile}" alt="profile-image">
            <p>${loggedIn().name}</p>
        `
    }
    commentUser.appendChild(profile)

    commentBtn.addEventListener("click", () => {
        const COMMENT_REQUIRED = "Comment required please!";
        const commentBox = document.createElement("div");
        commentBox.className = "comment-section-box";
        if (loggedIn()) {
            comment.classList.remove("comment-hidden")
            document.body.style.overflow = "hidden";
            // check if there are existing comment for specific article
            if (getComments(articleId)) {
                const comments = getComments(articleId);
                let commentFragment = new DocumentFragment();
                comments
                    .sort((a, b) => b.commentId - a.commentId)
                    .map(({commentId, comment, timeStamp, userId}) => {
                    const commentBox = document.createElement("div");
                    commentBox.className = "comment-section-box";
                    commentBox.innerHTML = `
                    <div class="comment-user">
                    <img src="${user(userId).image ? user(userId).image : "./images/profile-null.png"}" alt="profile-image">
                    <div class="comment-user-text">
                            <p>${user(userId).name}</p>
                            <span>10 days</span>
                        </div>
                        </div>
                        <p>${comment}</p>
                        `
                        commentFragment.appendChild(commentBox);
                })
                commentSection.appendChild(commentFragment)
            } else {
                console.log("No comment yet")
            }
            // Implementation of saving comment
            commentResponse.addEventListener('click', (e) => {
                e.preventDefault()
                let commentInvalid = hasValue(commentInput, COMMENT_REQUIRED);
                if (commentInvalid) {
                    
                    commentBox.innerHTML = `
                        <div class="comment-user">
                        <img src="${user(loggedIn().id).image ? user(loggedIn().id).image : "./images/profile-null.png"}" alt="profile-image">
                        <div class="comment-user-text">
                            <p>${user(loggedIn().id).name}</p>
                            <span>10 days</span>
                        </div>
                        </div>
                        <p>${commentInput.value}</p>
                    `
                    // Check if comment saved successful
                    if (saveComment(commentInput.value, loggedIn().id, articleId)) {
                        commentSection.firstChild.before(commentBox);
                        // empting comment input
                        commentInput.value = ""
                        showError(commentInput, "")               
                    }
                }
            })

        } else {
            window.location.href = "../login.html"
        }

    })
    closeComment.addEventListener("click", () => {
        document.body.style.overflow = "auto"
        comment.classList.add("comment-hidden")
    })
    // Like implementation
    likeBtn.addEventListener('click', (e) => {
        if (loggedIn()) {
            // Like article
            if(likeBtn.firstElementChild.classList.contains("ri-heart-line")) {
                if (likeArticle(articleId, loggedIn().id)) {
                    likeBtn.firstElementChild.classList.remove("ri-heart-line")
                    likeBtn.firstElementChild.classList.add("ri-heart-fill")
                    likeBtn.lastElementChild.textContent = parseInt(likeBtn.lastElementChild.textContent) + 1;
                    // console.log(likeArticle(articleId, loggedIn().id))
                }
            } else {
                // unLike article
                if (unLikeArticle(articleId, loggedIn().id)) {
                    likeBtn.firstElementChild.classList.remove("ri-heart-fill")
                    likeBtn.firstElementChild.classList.add("ri-heart-line")
                    likeBtn.lastElementChild.textContent = parseInt(likeBtn.lastElementChild.textContent) - 1;
                }
            }
        } else {
            window.location.href = "./login.html"
        }
    })
})
function getStory() {
    const title = document.querySelector(".blogx-header-title");
    const content = document.querySelector(".blogx-content")
    const profileContaier = document.querySelector(".blogx-blogger-profile");
    
    // get articles from localstorage
    let articlesData = JSON.parse(localStorage.getItem("articles"));

    // get article that corresponds to the article id
    let articles = articlesData.find(article => {
        return article.id === articleId
    })

    title.innerHTML = articles.title 
    content.firstElementChild.firstElementChild.setAttribute("src", articles.image)
    content.lastElementChild.innerHTML = articles.content
    
    profileContaier.innerHTML = `
        <div class="blogx-blogger-profile-img">
            <img src="${user(articles.bloggerId).image ? user(articles.bloggerId).image : "./images/profile-null.png"}" alt="">
        </div>
        <div class="blogx-blogger-profile-name">
            <h2>${user(articles.bloggerId).name}</h2>
            <div>
                <span>9 min read</span>
                &#x2022;
                <span>${articles.date}</span>
            </div>
        </div>
    `
    
}