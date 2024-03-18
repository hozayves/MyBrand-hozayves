import {
  loggedIn,
  deleteArticleFunc,
  formatTimeAgo,
  calculateReadingTime,
} from "./helper.js";
document.addEventListener("DOMContentLoaded", (e) => {
  articles();
});

// listing blogs
async function articles() {
  if (await loggedIn()) {
    const { admin } = await loggedIn();
  }
  const data = await fetch("http://localhost:9000/api/blogs", {
    methods: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { blogs } = await data.json();
  console.log(blogs);

  const blog = document.querySelector(".blog");
  if (blogs.length === 0) {
    blog.innerHTML = "No article yet";
  } else {
    let articles = blogs;
    articles.map(
      async ({ _id, title, tags, story, image, createdAt: date, blogger }) => {
        const bloggerHtml = await getBlogger(blogger, date);
        let blogContainer = document.createElement("div");
        blogContainer.className = "blog-container";
        blogContainer.innerHTML = `
            <div class="blog-info">
                <div class="blog-blogger">
                    ${bloggerHtml}
                </div>
                <div class="blog-box">
                    <a class="blog-content" href="./blog.html?articleId=${_id}">
                            <h1 class="blog-name">${title}</h1>
                            <p class="blog-desc">${story.substring(0, 204)}</p>
                    </a>
                    <a href="./blog.html">
                        <div class="blog-image">
                            <img src="../../upload/image/${image}" alt="">
                        </div>
                    </a>
                </div>
            </div>
            <div class="blog-footer">
                <div>
                ${tags.map((tag) => `<span>${tag}</span>`).join("")}
                    &#32;
                    &#x2022;
                    &#32;
                    <span class="blog-footer-time">${calculateReadingTime(
                      story
                    )} read</span>
                </div>
                <div class="blog-footer-setting" style="display: none">
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
            `;
        const settingIcon = blogContainer.querySelector(".setting-icon");
        const settingsList = blogContainer.querySelector(".settings");
        const deleteArticle = blogContainer.querySelector(".delete-article");
        // Delete article
        deleteArticle.addEventListener("click", () => {
          deleteArticleFunc(_id);
        });
        settingIcon.addEventListener("click", (e) => {
          // Toggle the 'active' class on the setting list
          settingsList.classList.toggle("active");
        });
        //  write blog button
        if (await loggedIn()) {
          const {
            user: { admin },
          } = await loggedIn();
          if (admin) settingIcon.parentNode.removeAttribute("style");
        }
        blog.appendChild(blogContainer);
      }
    );
  }
}
async function getBlogger(id, date) {
  const token = localStorage.getItem("token");
  const url = new URL(`http://localhost:9000/api/users/${id}`);
  url.searchParams.set("access_token", token);
  try {
    const blogger = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {
      userWithTime: { name, profile },
    } = await blogger.json();
    // Construct HTML content
    const htmlContent = `
    <img src="../../upload/image/${
      profile ? profile : "./images/profile-null"
    }" alt="">
      <div class="blog-blogger-name">
          <h2>${name}</h2>
          &#32;
          &#x2022;
          &#32;
          <span>${formatTimeAgo(date)}</span>
      </div>
    `;
    return htmlContent;
  } catch (error) {
    console.log(error);
  }
}
