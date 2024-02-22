document.addEventListener("DOMContentLoaded", e => {
    getStory()

    const commentBtn = document.querySelector(".blogx-blogger-links-comment");
    commentBtn.addEventListener("click", () => {
        console.log("Hello World!")
    })
})
function getStory() {
    const title = document.querySelector(".blogx-header-title");
    const content = document.querySelector(".blogx-content")
    const profileContaier = document.querySelector(".blogx-blogger-profile");
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('articleId'));

    // get articles from localstorage
    let articlesData = JSON.parse(localStorage.getItem("articles"));

    // get article that corresponds to the article id
    let articles = articlesData.find(article => {
        return article.id === articleId
    })

    title.innerHTML = articles.title
    content.firstElementChild.setAttribute("src", articles.image)
    content.lastElementChild.innerHTML = articles.content
    
    profileContaier.innerHTML = `
        <div class="blogx-blogger-profile-img">
            <img src="./images/blogger-profile.png" alt="">
        </div>
        <div class="blogx-blogger-profile-name">
            <h2>${articles.bloggerName}</h2>
            <div>
                <span>9 min read</span>
                &#x2022;
                <span>${articles.date}</span>
            </div>
        </div>
    `
    
}