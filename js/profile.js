import { bloggerArticles, deleteArticleFunc, user } from "./helper.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get("user"));

document.addEventListener("DOMContentLoaded", () => {
    const profile = document.querySelector(".profile-edit").firstElementChild;
    const profileName = document.querySelector(".profile-name");
    const profileArticles = document.querySelector(".profile-articles")
    const profilEditLink = document.querySelector(".edit-link")
    // Profile
    const profileImage = user(userId).image;
    const userNames = user(userId).name
    profileName.textContent = userNames;
    profilEditLink.setAttribute("href", "./profile-edit.html?user="+userId)
    if (profileImage) profile.setAttribute("src", profileImage)
    else profile.setAttribute("src", "./images/profile-null.png")

// Profile articles

if (bloggerArticles(userId)) {
    const articles = bloggerArticles(userId);
    const articleFragment = new DocumentFragment();
    articles.map(({id, content, title, image}) => {
        const articleContainer = document.createElement("div");
        articleContainer.className = "blog-container";
        articleContainer.innerHTML = `
        <div class="blog-container">
            <div class="blog-info">
                <div class="blog-blogger">
                    <div class="blog-blogger-name">
                        <span>20 Jan 2024</span>
                    </div>
                </div>
                <div class="blog-box">
                    <a class="blog-content" href="./blog.html?articleId=${id}">
                            <h1 class="blog-name">${title}</h1>
                            <p class="blog-desc">${content}</p>
                    </a>
                    <a href="./blog.html">
                        <div class="blog-image">
                            <img src="${image}" alt="">
                        </div>
                    </a>
                </div>
            </div>
            <div class="blog-footer">
                <div>
                    <span>Frontend</span>
                    &#32;
                    &#x2022;
                    &#32;
                    <span class="blog-footer-time">10 min read</span>
                </div>
                <div class="blog-footer-setting">
                    <div class="blog-footer-setting-icon setting-icon">
                        <img src="./images/dots.png" alt="">
                    </div>
                    <div class="blog-footer-setting-list settings">
                        <ul>
                            <li><a href="/edit-blog.html?edit=${id}">Edit post</a></li>
                            <li><a class="delete-article">Delete post</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;

        const settingIcon = articleContainer.querySelector('.setting-icon');
        const settingsList = articleContainer.querySelector('.settings');
        const deleteArticle = articleContainer.querySelector(".delete-article")
        // Delete article
        deleteArticle.addEventListener("click", () => {
            deleteArticleFunc(id)
        })
        settingIcon.addEventListener('click', (e) => {
            // Toggle the 'active' class on the setting list
            settingsList.classList.toggle('active')
        })
        //  write blog button
        if(user(userId).status === "admin") {
            settingIcon.parentNode.removeAttribute("style")
        } 
        articleFragment.appendChild(articleContainer)
    })
    profileArticles.appendChild(articleFragment)
    }
})