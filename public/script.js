const menuBtn = document?.querySelector('.menu');
const closeBtn = document?.querySelector('.close');
const navBar = document?.querySelector('.navbar');

menuBtn?.addEventListener('click', () => {
    navBar?.classList.toggle('active');
    closeBtn?.classList.toggle('active');
    menuBtn?.classList.toggle('active');
})

closeBtn?.addEventListener('click', () => {
    navBar?.classList.toggle('active');
    closeBtn?.classList.toggle('active');
    menuBtn?.classList.toggle('active');
})

const body = document?.querySelector('body');
const darkToggle = document?.querySelector('#dark-toggle');

const themeToggle = ()=>{
    if(localStorage.getItem('theme') === '' || localStorage.getItem('theme') === 'light'){
        body.classList.remove('dark-mode');
        darkToggle.classList.remove('active');
    }
    else{
        body.classList.add('dark-mode');
        darkToggle.classList.add('active');
    }
}

darkToggle.addEventListener("click", ()=>{
    if(localStorage.getItem('theme') == 'light'){
        localStorage.setItem('theme', 'dark');
        themeToggle();
    }else{
        localStorage.setItem('theme','light');
        themeToggle();
    }
})

window.addEventListener('load', themeToggle);



const passwordInput = document?.getElementById("password");
const passwordBtn=  document?.getElementById("password-btn");

passwordBtn?.addEventListener("click", (e)=>{
    e.stopPropagation()
    if(passwordInput?.type === "password"){
        // console.log("pass");
        passwordInput.type = "text";
        passwordInput?.setAttribute("type", "text");
        passwordBtn.textContent = "Hide";
    }
    else if(passwordInput?.type === "text"){
        // console.log("text");
        passwordInput.type = "password";
        passwordInput?.setAttribute("type", "password");
        passwordBtn.textContent = "Show";
    }
})

window.addEventListener("load", async ()=>{
    const showLogIn = document?.querySelectorAll(".showLogIn");
    const showLogOut = document?.querySelectorAll(".showLogOut");
    // console.log(showLogIn, showLogOut)
    if(await checkIsAuth()){
        // console.log("loggedin")
        showLogIn.forEach(element => {
            element.style.display = "block"
        });
        showLogOut.forEach(element => {
            element.style.display = "none"
        })
    }   
    else{
        // console.log("logged outs")
        showLogOut.forEach(element => {
            element.style.display = "block"
        });
        showLogIn.forEach(element => {
            element.style.display = "none"
        })
    }
})

const checkIsAuth = async ()=>{
    const response = await fetch("/user/check-login");
    const data = await response.json();
    // console.log(data);
    if(data.error !== null) return false;
    if(data.error === null) return true;
    // console.log("ehllo")
    return false;

}