const body = document.querySelector('body');
const nav = document.querySelector("nav");

const navbarSlideFromTheSide = () => {
  const burger = document.querySelector(".nav__burger");
  const navLinksList = document.querySelector(".nav__links");
  const navLinks = document.querySelectorAll(".nav__links li");

  burger.addEventListener('click', () => {

    body.classList.toggle('prevent-scrolling');
    navLinksList.classList.toggle('nav--active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
      link.style.animation = `nav--linksFade 0.5s ease forwards ${index / 7 + 0.2}s`;
      }
    });

    burger.classList.toggle('nav--burgerToggle');
  })
}
navbarSlideFromTheSide()

window.onscroll = () => { 
  const verticalScroll = window.scrollY;

  if (verticalScroll > 100) {
    nav.classList.add("nav--hide")
  } else {
    nav.classList.remove('nav--hide')
  }
 }