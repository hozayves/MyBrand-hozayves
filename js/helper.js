export function helloWorld() {
    return "Hello World!"
}
// show a message with type of the input
export function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small")
    msg.innerHTML = message;
    // update the class for the input
    input.className = type ? "success" : "error"
    return type;
}
// show error
export function showError(input, message) {
    return showMessage(input, message, false)
}
// show success
export function showSuccess(input) {
    return showMessage(input, "", true)
}
// check if an input has a value
export function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message)
    }
    return showSuccess(input)
}
// Check if input has valid email
export function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false
    }
    // validate email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const email = input.value.trim();
    const words = email.split(/\s+/);
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg)
    }
    return true
}
export function validatePassword(input, requiredMsg, invalidMsg) {
    if(!hasValue(input, requiredMsg)){
        return false
    }
    // validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.+\d)[A-Za-z\d]{1,7}$/

    const pwd = input.value.trim()
    if (!passwordRegex.test(pwd)) {
        return showError(input, invalidMsg)
    } 
    return true
}
// check if a message is more than 10 words
export function validateMinWords(input, wordNumb, message) {
    const msg = input.value.trim();
    const words = msg.split(/\s+/);

    if (words.length < wordNumb) {
        return showError(input, message)
    }
    return true
}
export function loggedIn() {
    const user = localStorage.getItem("loggedInUser")
    if (user) {
        let activeUser = JSON.parse(localStorage.getItem("loggedInUser"))
        return activeUser
    } else {
        return false
    }
}

// Delete article function
export function deleteArticleFunc(id) {
    const articles = JSON.parse(localStorage.getItem("articles"))
    const remainArticles = articles.filter(article => {
        return article.id !== id
    });
    if (remainArticles !== -1) {
        localStorage.setItem("articles", JSON.stringify(remainArticles))
        window.location.href = "./blogs.html";
    }
}
// Get articles for blogger
export function bloggerArticles(userId) {
    const articles = JSON.parse(localStorage.getItem('articles'))
    if (user(userId).status === "admin" && articles !== null) {
        const article = articles.filter(article => article.bloggerId === userId );
        return article
    }
}

// Like function
export function likeArticle(articleId, userId) {
    const articles = JSON.parse(localStorage.getItem("articles"))

    const likeObj = {
        userId,
        articleId,
        timeStamp: new Date()
    }
    const likes = articles.find(article => article.id === articleId).likes
    if (likes.find(like => like.userId !== userId) || likes.length <= 0) {
        likes.push(likeObj)
        localStorage.setItem("articles", JSON.stringify(articles))
        return true
    }
    return false
}
// Unlike function
export function unLikeArticle(articleId, userId) {
    const articles = JSON.parse(localStorage.getItem('articles'))
    if (articles !== null && articles.length > 0) {
        let likes = articles.find(article => article.id === articleId).likes;
        const userLike = likes.find(like => like.userId === userId)

        if (userLike) {
            // remove his/her like from this article
            // filter like except his/her like
            const likeIndex = likes.findIndex(like => like.userId === userId);
            likes.splice(likeIndex, 1)
            localStorage.setItem("articles", JSON.stringify(articles))
            return true 
        }
        return false
    }
}

// like and comment counter 
export function likeCommentCounter(articleId, likeBtn, commentBtn, userId) {
    const articles = JSON.parse(localStorage.getItem("articles"));
    const article = articles.find(article => article.id === articleId)
    const likeLength = article.likes.length;
    const commentLength = article.comment.length === 0 ? "" : article.comment.length;
    likeBtn.querySelector("span").innerText = likeLength;
    commentBtn.querySelector("span").innerText = commentLength;
    const userLike = article.likes.find(user => user.userId === userId)

    if (userId && userLike) {
        likeBtn.firstElementChild.classList.remove("ri-heart-line")
        likeBtn.firstElementChild.classList.add("ri-heart-fill")
        console.log("user-like: "+userLike.userId)
    } else {
        console.log("user does not like")
    }
    
}

// Function for save comment in localstorage
export function saveComment(comment, userId, articleId) {
    const articles = JSON.parse(localStorage.getItem("articles"));
    if (comment && userId && articleId) {
        const article = articles.find(article => article.id === articleId);
        article.comment.push({commentId: Date.now(), comment, userId, articleId, timeStamp: new Date()});
        
        localStorage.setItem('articles', JSON.stringify(articles))
        return true
    }
    return false
}
// function for get comments for particular article in the localstorage
export function getComments(articleId) {
    const articles = JSON.parse(localStorage.getItem("articles"));
    const comment = articles.find(article => article.id === articleId).comment;
    if (comment.length > 0) {
        return comment
    } else {
        return false
    }
}

// function for get information for logged user based on provided userId
export function user(userId) {
    const users = JSON.parse(localStorage.getItem("users"));
    if (userId) {
        const user = users.find(user => user.id === userId)
        return user
    }
}
// function for get a visitor user
export function getUsers() {
    const users = JSON.parse(localStorage.getItem("users"))

    if (users !== null) {
        return users
    }
}
export function saveUser(user) {
    let users;
    if (localStorage.getItem("users") === null) {
        users = []
    } else {
        users = JSON.parse(localStorage.getItem('users'))
    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
}
