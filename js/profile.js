import { bloggerArticles, deleteArticleFunc, loggedIn } from "./helper.js";

document.addEventListener("DOMContentLoaded", async () => {
  const {
    user: { name, profile: image, admin },
  } = await loggedIn();

  const profile = document.querySelector(".profile-edit").firstElementChild;
  const profileName = document.querySelector(".profile-name");
  const profileArticles = document.querySelector(".profile-articles");
  const profilEditLink = document.querySelector(".edit-link");
  // Profile
  const profileImage = image;
  profileName.textContent = name;
  profilEditLink.setAttribute("href", "./profile-edit.html");
  if (profileImage) profile.setAttribute("src", profileImage);
  else profile.setAttribute("src", "./images/profile-null.png");

  // Profile articles

  if (admin) {
    const { ok, blogs } = await bloggerArticles();
    const articleFragment = new DocumentFragment();
    blogs.map(({ _id, story, title }) => {
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
                    <a class="blog-content" href="./blog.html?articleId=${_id}">
                            <h1 class="blog-name">${title}</h1>
                            <p class="blog-desc">${story}</p>
                    </a>
                    <a href="./blog.html">
                        <div class="blog-image">
                            <img src="" alt="">
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
                            <li><a href="/edit-blog.html?edit=${_id}">Edit post</a></li>
                            <li><a class="delete-article">Delete post</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;

      const settingIcon = articleContainer.querySelector(".setting-icon");
      const settingsList = articleContainer.querySelector(".settings");
      const deleteArticle = articleContainer.querySelector(".delete-article");
      // Delete article
      deleteArticle.addEventListener("click", () => {
        deleteArticleFunc(_id);
      });
      settingIcon.addEventListener("click", (e) => {
        // Toggle the 'active' class on the setting list
        settingsList.classList.toggle("active");
      });
      //  write blog button
      if (admin) {
        settingIcon.parentNode.removeAttribute("style");
      }
      articleFragment.appendChild(articleContainer);
    });
    profileArticles.appendChild(articleFragment);
  }
});
