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

// Next launch container
const url = "https://api.spacexdata.com/v3/launches/upcoming";
const nextLaunchUrl = "https://api.spacexdata.com/v3/launches/next";
const errorContainer = document.querySelector(".error-container");
const nextLaunchContainer = document.querySelector(".index__nextLaunchContainer");

async function getNextLaunch() {
  try {
    const response = await fetch(nextLaunchUrl);
    const nextLaunchResult = await response.json();

    nextLaunchHtml(nextLaunchResult)
  }
  catch(error) {
    errorContainer.innerHTML = displayError("Obs, An error occured when calling API.")
  }
}
getNextLaunch()


function nextLaunchHtml(nextLaunchResult) {
  const missionName = nextLaunchResult.mission_name;
  const flightNumber = nextLaunchResult.flight_number;
  const launchSite = nextLaunchResult.launch_site.site_name_long;
  const rocketName = nextLaunchResult.rocket.rocket_name;
  const launchDateUTC = nextLaunchResult.launch_date_utc;

  nextLaunchContainer.innerHTML = `<div class="index__nextLaunchResults">
  <h2>${missionName}</h2>
  <p><b>Flight Number:</b> ${flightNumber}</p>
  <p><b>Launch Date:</b> ${dateFormatter(launchDateUTC)}</p>
  <p><b>Launch Site:</b> ${launchSite}</p>
  <p><b>Rocket Name:</b> ${rocketName}</p>
  </div>`;

  // Countdown timer
  function getRemainingTime(endtime){
    const totalTimeRemaining = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (totalTimeRemaining/1000) % 60 );
    const minutes = Math.floor( (totalTimeRemaining/1000/60) % 60 );
    const hours = Math.floor( (totalTimeRemaining/(1000*60*60)) % 24 );
    const days = Math.floor( totalTimeRemaining/(1000*60*60*24) );
  
    return { days, hours, minutes, seconds };

  }
  getRemainingTime(launchDateUTC)
  
  function countdownTimer(id, endtime) {
    const countdownContainer = document.getElementById(id);

    const countdownInterval = setInterval(() => {
      const timeRemaining = getRemainingTime(endtime);
      countdownContainer.innerHTML = `<div class="countdown__results">
        <div class="countdown__window">
          <p class="countdown__numbers">${timeRemaining.days}</p> 
          <p class="countdown__TimeUnit">DAYS</p>
        </div>
        <div class="countdown__window">
          <p class="countdown__numbers">${timeRemaining.hours}</p> 
          <p class="countdown__TimeUnit">HOURS</p>
        </div>
        <div class="countdown__window">
          <p class="countdown__numbers">${timeRemaining.minutes}</p> 
          <p class="countdown__TimeUnit">MINUTES</p>
        </div>
        <div class="countdown__window">
          <p class="countdown__numbers">${timeRemaining.seconds}</p> 
          <p class="countdown__TimeUnit">SECONDS</p>
        </div>
      </div>`

      // Stop counting when passing the deadline
      if (timeRemaining.totalTimeRemaining <= 0) {
        clearInterval(countdownInterval);
      }
    },1000);
    timeinterval()
  }
  countdownTimer('countdown-container', launchDateUTC);

} 
