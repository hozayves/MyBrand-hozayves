document.addEventListener('DOMContentLoaded', e => {
    const users = localStorage.getItem("users");
    const newAdmin = {
        id: Date.now(),
        name: "Mukwiye lambert",
        email: "example@abc.abc",
        pwd: 'abc456',
        status: 'admin',
    }
    let newUser = []
    if (!users) {
        newUser.push(newAdmin)
        console.log(newUser)
        localStorage.setItem("users", JSON.stringify(newUser))
    } else {
        console.log("Welcome back")
    }
})


const menuBtn = document.querySelector(".header-hamburger");
const navBar = document.querySelector(".nav");
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add("open");
        navBar.classList.remove("nav-hidden")
        navBar.classList.add("nav-visible")
        menuOpen = true
    } else {
        menuBtn.classList.remove("open");
        navBar.classList.add("nav-hidden")
        navBar.classList.remove("nav-visible")
        menuOpen = false;
    }
})
// 
const blogMore = document.getElementById("setting-icon");
const blogSetting = document.getElementById("settings");
let setting = false;
blogMore.addEventListener("click", () => {
    if (!setting) {
        blogSetting.classList.add("active");
        setting = true
    } else {
        blogSetting.classList.remove("active");
        setting = false;
    }
})