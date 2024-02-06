const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.close');
const navBar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navBar.classList.toggle('active');
    closeBtn.classList.toggle('active');
    menuBtn.classList.toggle('active');
})

closeBtn.addEventListener('click', () => {
    navBar.classList.toggle('active');
    closeBtn.classList.toggle('active');
    menuBtn.classList.toggle('active');
})

const body = document.querySelector('body');
const darkToggle = document.querySelector('#dark-toggle');

darkToggle.addEventListener("click", ()=>{
    window.location.reload();
    if(localStorage.getItem('theme') == 'light'){
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme','light');
    }
})

window.addEventListener('load',()=>{
    if(localStorage.getItem('theme') === '' || localStorage.getItem('theme') === 'light'){
        body.classList.remove('dark-mode');
        darkToggle.classList.remove('active');
    }
    else{
        body.classList.add('dark-mode');
        darkToggle.classList.add('active');
    }

})

const passwordInput = document.getElementById("password");
const passwordBtn=  document.getElementById("password-btn");

passwordBtn.addEventListener("click", (e)=>{
    e.stopPropagation()
    console.log(passwordBtn.textContent);
    console.log(passwordInput.type)
    console.log("clicked")
    if(passwordInput.type === "password"){
        console.log("pass");
        passwordInput.type = "text";
        passwordInput.setAttribute("type", "text");
        passwordBtn.textContent = "Hide";
    }
    else if(passwordInput.type === "text"){
        console.log("text");
        passwordInput.type = "password";
        passwordInput.setAttribute("type", "password");
        passwordBtn.textContent = "Show";
    }
})