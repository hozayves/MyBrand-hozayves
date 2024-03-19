const token = localStorage.getItem("token");
const baseURL = "https://blog-apis-nfgp.onrender.com";

// show a message with type of the input
export function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerHTML = message;
  // update the class for the input
  input.className = type ? "success" : "error";
  msg.className = type ? "success" : "error";
  return type;
}
// show error
export function showError(input, message) {
  return showMessage(input, message, false);
}
// show success
export function showSuccess(input) {
  return showMessage(input, "", true);
}
// check if an input has a value
export function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}
// Check if input has valid email
export function validateEmail(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = input.value.trim();
  const words = email.split(/\s+/);
  if (!emailRegex.test(email)) {
    return showError(input, invalidMsg);
  }
  return true;
}
export function validatePassword(input, requiredMsg, invalidMsg) {
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate password
  const passwordRegex = /^(?=.*[A-Za-z])(?=.+\d)[A-Za-z\d]{1,7}$/;

  const pwd = input.value.trim();
  if (!passwordRegex.test(pwd)) {
    return showError(input, invalidMsg);
  }
  return true;
}
// check if a message is more than 10 words
export function validateMinWords(input, wordNumb, message) {
  const msg = input.value.trim();
  const words = msg.split(/\s+/);

  if (words.length < wordNumb) {
    return showError(input, message);
  }
  return true;
}
// Function to
export async function loggedIn() {
  if (!token) return false;
  try {
    const endpoint = new URL(`${baseURL}/api/users/me`);
    endpoint.searchParams.set("access_token", token);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Delete article function
export async function deleteArticleFunc(id) {
  try {
    const endpoint = new URL(`${baseURL}/api/blogs/${id}`);
    endpoint.searchParams.set("access_token", token);
    const blog = await fetch(endpoint, {
      method: "DELETE",
    });
    const data = await blog.json();
    if (data.ok) {
      console.log("Delete successful");
    } else {
      alert("Nooooooooo");
      console.log(data);
    }
  } catch (error) {
    console.log(error.message);
  }
}
// Get articles for blogger
export async function bloggerArticles() {
  try {
    const endpoint = new URL(`${baseURL}/api/blogs`);
    endpoint.searchParams.set("access_token", token);
    const blog = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Autherization: token,
      },
    });
    const data = await blog.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Function to like and unlike an article
export async function likeUnlike(articleId, userId) {
  console.log("Like Articles");
  try {
    const endpoint = new URL(`${baseURL}/api/likes/${articleId}`);
    endpoint.searchParams.set("access_token", token);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Types": "application/json" },
      body: JSON.stringify({ user: userId }),
    });
    const response = await res.json();
    if (response.ok) return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    console.log("Success");
  }
}

// Function for counting a likes
export async function likeCommentCounter(articleId, likeBtn) {
  try {
    const endpoint = new URL(`${baseURL}/api/likes/${articleId}`);
    token && endpoint.searchParams.set("access_token", token);
    const article = await fetch(endpoint);
    const { likeCount, isLiked } = await article.json();
    likeBtn.querySelector("span").innerText = likeCount;

    if (isLiked) {
      likeBtn.firstElementChild.classList.remove("ri-heart-line");
      likeBtn.firstElementChild.classList.add("ri-heart-fill");
      console.log("user-like: ");
    } else {
      console.log("user does not like");
    }
  } catch (error) {
    console.log(error);
  }
}

// Function for save comment in localstorage
export async function saveComment(comment, articleId) {
  try {
    const endpoint = new URL(`${baseURL}/api/comments/${articleId}`);
    endpoint.searchParams.set("access_token", token);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    const data = await res.json();
    if (!data.ok) return false;

    return data;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    console.log("Commented.");
  }
}
// function for get comments for particular article in the localstorage
export async function getComments(articleId) {
  try {
    const endpoint = new URL(`${baseURL}/api/comments/${articleId}`);
    endpoint.searchParams.set("access_token", token);

    const res = await fetch(endpoint);
    const { ok, comments } = await res.json();
    if (ok) {
      return comments;
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    console.log("Comment fetched.");
  }
  const articles = JSON.parse(localStorage.getItem("articles"));
  const comment = articles.find((article) => article.id === articleId).comment;
  if (comment.length > 0) {
    return comment;
  } else {
    return false;
  }
}

// functin for getting contact message
export function contactMe() {}
export function saveUser(user) {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
// Function to format time in format of time ago
export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  // Convert milliseconds to minutes
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "Just now";
  } else if (minutes === 1) {
    return "1 minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else {
    // Convert minutes to hours
    const hours = Math.floor(minutes / 60);

    if (hours === 1) {
      return "1 hour ago";
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      // Convert hours to days
      const days = Math.floor(hours / 24);

      if (days === 1) {
        return "1 day ago";
      } else {
        return `${days} days ago`;
      }
    }
  }
}
// Function to calculate reading time
export function calculateReadingTime(text, wordsPerMinute = 200) {
  // Calculate number of words in the text
  const wordCount = text.split(/\s+/).length;

  // Calculate reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  // Format reading time
  const hours = Math.floor(readingTimeMinutes / 60);
  const minutes = readingTimeMinutes % 60;

  let readingTime = "";
  if (hours > 0) {
    readingTime += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) {
      readingTime += ` ${minutes} min${minutes > 1 ? "s" : ""}`;
    }
  } else {
    readingTime += `${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  return readingTime;
}
/**
 * Token decoding
 * Decode the token to extract information, including the expiration time (`exp` claim) and any other relevant details. Tokens are often encoded in javascript JSON Web Token(JWT) format
 */
export function decodeToken(token) {
  try {
    const decode = JSON.parse(atob(token.split(".")[1]));
    return decode;
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
}
/**
 * Expiration Time Check:
 * Check the expiration time ('exp') against the current time to determine if the token
 * is still valid
 */
export function isTokenValid(token) {
  const decodedToken = decodeToken(token);
  console.log(decodedToken);
  if (!decodeToken) return false;

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  return decodedToken.exp > currentTime;
}
/**
 * Token Refresh
 * If your application supports token refreshing and the token is close to expiration
 * you might consider refreshing the token to obtain a new without requiring the user
 * reauthenticate
 */
export function refreshTokenIfNeeded(token) {
  if (isTokenValid(token))
    // Token is still valid, no need to refresh
    return token;

  // Perform token refresh logic here
  // ....

  // Return the refreshed token or handle or handle reauthentication as needed
}
