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