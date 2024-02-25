import { loggedIn, deleteArticleFunc, user } from "./helper.js";
document.addEventListener("DOMContentLoaded", e => {
    articles();
})

// listing blogs
function articles() {
    const blog = document.querySelector(".blog");
    if (localStorage.getItem("articles") === null) {
        blog.innerHTML = "No article yet"
    } else {
        let articles = JSON.parse(localStorage.getItem("articles"));
        articles
            .sort((a, b) => b.id - a.id)
            .map(({id, title, content, image, date, bloggerId,}) => {

            let blogContainer = document.createElement("div");
            blogContainer.className = "blog-container"
            blogContainer.innerHTML = `
            <div class="blog-info">
                <div class="blog-blogger">
                    <img src="${user(bloggerId).image? user(bloggerId).image : './images/profile-null'}" alt="">
                    <div class="blog-blogger-name">
                        <h2>${user(bloggerId).name}</h2>
                        &#32;
                        &#x2022;
                        &#32;
                        <span>${date}</span>
                    </div>
                </div>
                <div class="blog-box">
                    <a class="blog-content" href="./blog.html?articleId=${id}">
                            <h1 class="blog-name">${title}</h1>
                            <p class="blog-desc">${content.substring(0, 204)}</p>
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
                <div class="blog-footer-setting" style="display: none">
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
            `;
            const settingIcon = blogContainer.querySelector('.setting-icon');
            const settingsList = blogContainer.querySelector('.settings');
            const deleteArticle = blogContainer.querySelector(".delete-article")
            // Delete article
            deleteArticle.addEventListener("click", () => {
                deleteArticleFunc(id)
            })
            settingIcon.addEventListener('click', (e) => {
                // Toggle the 'active' class on the setting list
                settingsList.classList.toggle('active')
            })
            //  write blog button
            if(loggedIn().status === "admin") {
                settingIcon.parentNode.removeAttribute("style")
            } 
            blog.appendChild(blogContainer);
            
        })
        
    }
}