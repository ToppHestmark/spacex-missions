const body = document.querySelector('body');
const nav = document.querySelector("nav");

const navbarSlideFromTheSide = () => {
  const burger = document.querySelector(".nav__burger");
  const navLinksList = document.querySelector(".nav__links");
  const navLinks = document.querySelectorAll(".nav__links li");

  burger.addEventListener('click', () => {

    body.classList.toggle('prevent--scrolling');
    navLinksList.classList.toggle('nav--active');

    navLinks.forEach((link, index) => {
      const easeSpeed = (index / 7 + 0.2);

      if (link.style.animation) {
        link.style.animation = "";
      } else {
      link.style.animation = `nav--linksFade 0.5s ease forwards ${easeSpeed}s`;
      }
    });

    burger.classList.toggle('nav--burgerToggle');
  })
}
navbarSlideFromTheSide()

window.onscroll = () => { 

  const scrollingPosition = Math.ceil(window.scrollY);

  if (scrollingPosition > 100) {
    nav.classList.add("nav--hide")
  } else {
    nav.classList.remove('nav--hide')
  }

  if (scrollingPosition > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

const scrollToTopButton = document.querySelector('.nav__scrollToTopButton');
function scrollToTop() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
}
