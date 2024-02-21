document.addEventListener('DOMContentLoaded', e => {
    const headerUser = document.querySelector(".header-user-hamburger");
    if (loggedIn()) {

         let div = document.createElement("div")
        div.className = 'header-user-hamburger-logged'
        div.innerHTML = '<span>'+ loggedIn().name.substring(0, 11)+'</span><div class="header-user-hamburger-popup profile-hidden"><ul><li><a href="#">Profile</a></li><li><a href="#" id="logout">Logout</a></li></ul></div>';
        headerUser.insertBefore(div, headerUser.lastElementChild);


        //  Open profile menu when user click on his/her name
        const profileName = headerUser.querySelector(".header-user-hamburger-logged");

        profileName.firstElementChild.addEventListener("click", e => {
            const profile = profileName.lastElementChild;
            profile.classList.toggle("profile-hidden")
        })
        //  Close profile menu when clicking outside of it
        document.addEventListener('click', e => {
            // later
        })
        
        // logout user
        const logoutBtn = document.getElementById("logout");
        logoutBtn.addEventListener('click', e => {
            logout()
        })
     } else {
        const a = document.createElement("a");
        a.href="./login.html";
        a.innerHTML = '<img src="./images/profile-icon.png" alt="">'
        headerUser.insertBefore(a, headerUser.lastElementChild)
     }

    
})

function loggedIn() {
    const user = localStorage.getItem("loggedInUser")
    if (user) {
        let activeUser = JSON.parse(localStorage.getItem("loggedInUser"))
        return activeUser
    } else {
        return false
    }
}
function logout() {
    const user = localStorage.getItem("loggedInUser");

    if (user) {
        localStorage.removeItem("loggedInUser")
        const currentPathName = window.location.pathname
        window.location.href = currentPathName;
    }
}
