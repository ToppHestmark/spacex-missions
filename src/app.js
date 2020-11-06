const navSlide = () => {
  const burger = document.querySelector(".nav__burger");
  const nav = document.querySelector(".nav__links");
  const navLinks = document.querySelectorAll(".nav__links li");

  burger.addEventListener('click', () => {

    nav.classList.toggle('nav__active');

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

navSlide()