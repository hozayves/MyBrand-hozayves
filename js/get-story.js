import {
  getComments,
  hasValue,
  likeUnlike,
  likeCommentCounter,
  loggedIn,
  saveComment,
  showError,
  formatTimeAgo,
  calculateReadingTime,
} from "./helper.js";

document.addEventListener("DOMContentLoaded", async (e) => {
  let loggedUser = [];
  if (await loggedIn()) {
    const data = await loggedIn();
    loggedUser.push({
      ok: data.ok,
      _id: data.user._id,
      name: data.user.name,
      admin: data.user.admin,
      image: data.user.profile,
    });
  } else {
    console.log("Logout");
  }
  console.log(loggedUser);
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("articleId");
  const likeBtn = document.querySelector(".blogx-blogger-links-like");
  const commentBtn = document.querySelector(".blogx-blogger-links-comment");
  getStory(articleId);
  // like counter function
  likeCommentCounter(articleId, likeBtn);

  // implementation of comment section
  const comment = document.querySelector(".comment");
  const closeComment = document.querySelector(".comment-header-close");
  const commentInput = document.querySelector(".comment-input");
  const commentResponse =
    document.querySelector(".comment-btn").firstElementChild;
  const commentSection = document.querySelector(".comment-section");
  const commentUser = document.querySelector(".comment-user");

  // loading logged in user profile in comment section
  const profile = document.createElement("div");
  profile.className = "comment-user";
  if (loggedUser.length !== 0) {
    profile.innerHTML = `
            <img src="${
              loggedUser[0].image
                ? `../../upload/image/${loggedUser[0].image}`
                : "./images/profile-null.png"
            }" alt="profile-image">
            <p>${loggedUser[0].name}</p>
        `;
  } else {
    window.location.href = "./login.html";
  }
  commentUser.appendChild(profile);
  // Comment event listener
  commentBtn.addEventListener("click", async () => {
    const COMMENT_REQUIRED = "Comment required please!";
    const commentBox = document.createElement("div");
    commentBox.className = "comment-section-box";
    if (loggedUser.length !== 0) {
      comment.classList.remove("comment-hidden");
      document.body.style.overflow = "hidden";
      // check if there are existing comment for specific article
      if (getComments(articleId)) {
        const comments = await getComments(articleId);
        console.log(comments);
        let commentFragment = new DocumentFragment();
        comments.map((comment) => {
          const commentBox = document.createElement("div");
          commentBox.className = "comment-section-box";
          commentBox.innerHTML = `
                    <div class="comment-user">
                    <img src="${
                      comment.user.profile
                        ? `../../upload/image/${comment.user.profile}`
                        : "./images/profile-null.png"
                    }" alt="profile-image">
                    <div class="comment-user-text">
                            <p>${comment.user.name}</p>
                            <span>${formatTimeAgo(comment.createdAt)}</span>
                        </div>
                        </div>
                        <p>${comment.comment}</p>
                        `;
          commentFragment.appendChild(commentBox);
        });
        commentSection.appendChild(commentFragment);
      } else {
        console.log("No comment yet");
      }
      // Implementation of saving comment
      commentResponse.addEventListener("click", (e) => {
        e.preventDefault();
        let commentInvalid = hasValue(commentInput, COMMENT_REQUIRED);
        if (commentInvalid) {
          commentBox.innerHTML = `
                        <div class="comment-user">
                        <img src="${
                          loggedUser[0].image
                            ? `../../upload/image/${loggedUser[0].image}`
                            : "./images/profile-null.png"
                        }" alt="profile-image">
                        <div class="comment-user-text">
                            <p>${loggedUser[0].name}</p>
                            <span>Just now</span>
                        </div>
                        </div>
                        <p>${commentInput.value}</p>
                    `;
          // Check if comment saved successful
          if (saveComment(commentInput.value, articleId)) {
            commentSection.firstChild.before(commentBox);
            // empting comment input
            commentInput.value = "";
            showError(commentInput, "");
          }
        }
      });
    } else {
      window.location.href = "../login.html";
    }
  });
  closeComment.addEventListener("click", () => {
    document.body.style.overflow = "auto";
    comment.classList.add("comment-hidden");
  });
  // Like event listener
  likeBtn.addEventListener("click", async (e) => {
    console.log("Like");
    if (loggedUser.length !== 0) {
      const { _id } = await loggedIn();
      // Like article
      if (likeBtn.firstElementChild.classList.contains("ri-heart-line")) {
        if (likeUnlike(articleId, _id)) {
          likeBtn.firstElementChild.classList.remove("ri-heart-line");
          likeBtn.firstElementChild.classList.add("ri-heart-fill");
          likeBtn.lastElementChild.textContent =
            parseInt(likeBtn.lastElementChild.textContent) + 1;
          // console.log(likeArticle(articleId, loggedIn().id))
        }
      } else {
        // unLike article
        if (likeUnlike(articleId, _id)) {
          likeBtn.firstElementChild.classList.remove("ri-heart-fill");
          likeBtn.firstElementChild.classList.add("ri-heart-line");
          likeBtn.lastElementChild.textContent =
            parseInt(likeBtn.lastElementChild.textContent) - 1;
        }
      }
    } else {
      window.location.href = "./login.html";
    }
  });
});
// Function to get blog based on its Id
async function getStory(id) {
  const title = document.querySelector(".blogx-header-title");
  const content = document.querySelector(".blogx-content");
  const profileContaier = document.querySelector(".blogx-blogger-profile");

  // get articles from mongodb
  const token = localStorage.getItem("token");
  const endpoint = new URL(`http://localhost:9000/api/blogs/${id}`);
  endpoint.searchParams.set("access_token", token);
  let articlesData = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await articlesData.json();
  const articles = data.blog;

  title.innerHTML = articles.title;
  content.firstElementChild.firstElementChild.setAttribute(
    "src",
    `../../upload/image/${articles.image}`
  );
  content.lastElementChild.innerHTML = articles.story;

  profileContaier.innerHTML = await getBlogger(
    articles.blogger,
    articles.createdAt
  );
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
      <div class="blogx-blogger-profile-img">
            <img src="../../upload/image/${
              profile ? profile : "./images/profile-null.png"
            }" alt="">
        </div>
        <div class="blogx-blogger-profile-name">
            <h2>${name}</h2>
            <div>
                <span>3 min read</span>
                &#x2022;
                <span>${formatTimeAgo(date)}</span>
            </div>
        </div>
      `;
    return htmlContent;
  } catch (error) {
    console.log(error);
  }
}
