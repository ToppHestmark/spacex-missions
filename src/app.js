/* ##########################################################
--- <<<     Next launch     >>> ---
---########################################################## */
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
    errorContainer.innerHTML = displayError("Ooops, An error occured when calling API.")
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
  <p><b>Launch Date:</b> ${americanDateFormat(launchDateUTC)}</p>
  <p><b>Launch Site:</b> ${launchSite}</p>
  <p><b>Rocket Name:</b> ${rocketName}</p>
  </div>`;

  // Countdown timer
  const countdownInterval = setInterval(() => {
    const launchTime = Date.parse(launchDateUTC);
    const now = Date.parse(new Date());
    const totalTimeRemaining = launchTime - now;
    const countdownContainer = document.getElementById('countdown-container');
    
    const seconds = Math.floor((totalTimeRemaining/1000) % 60);
    const minutes = Math.floor((totalTimeRemaining/1000/60) % 60);
    const hours = Math.floor((totalTimeRemaining / (1000*60*60)) % 24);
    const days = Math.floor(totalTimeRemaining / (1000*60*60*24));
    
    countdownContainer.innerHTML = `<div class="countdown__results">
      <div class="countdown__window">
        <p class="countdown__numbers">${days}</p> 
        <p class="countdown__TimeUnit">DAYS</p>
      </div>
      <div class="countdown__window">
        <p class="countdown__numbers">${hours}</p> 
        <p class="countdown__TimeUnit">HOURS</p>
      </div>
      <div class="countdown__window">
        <p class="countdown__numbers">${minutes}</p> 
        <p class="countdown__TimeUnit">MINUTES</p>
      </div>
      <div class="countdown__window">
        <p class="countdown__numbers">${seconds}</p> 
        <p class="countdown__TimeUnit">SECONDS</p>
      </div>
    </div>`;

    if (totalTimeRemaining < 0) {
      clearInterval(countdownInterval);
      countdownContainer.innerHTML = `<h2>Launched</h2>`;
    }
  }, 1000)
} 


/* ############################################################
--- <<<     Upcoming launches     >>> ---
---############################################################ */
const upcomingLaunchUrl = "https://api.spacexdata.com/v3/launches/upcoming";
const upcomingLaunchTable = document.querySelector('.index__upcomingLaunchTable');

async function getUpcomingLaunches() {
  try {
    const response = await fetch(upcomingLaunchUrl);
    const upcomingLaunchResults = await response.json();

    upcomingLaunchResults.map((upcomingLaunch) => {

      const launchDateUTC = upcomingLaunch.launch_date_utc;
      const flightNumber = upcomingLaunch.flight_number;
      const missionName = upcomingLaunch.mission_name;
      const launchSite = upcomingLaunch.launch_site.site_name_long;

      const launchSiteLocation = () => {
        return launchSite === null ? "Not specified" : launchSite;
      };

      upcomingLaunchTable.innerHTML +=  `
      <tr class="upcomingLaunch__dataResults tablerow__borderBottom">
        <td class="upcomingLaunch__flightNumber upcomingLaunch__dataTable">${flightNumber}</td>
        <td class="upcomingLaunch__mission upcomingLaunch__dataTable">${missionName}</td>
        <td class="upcomingLaunch__site upcomingLaunch__dataTable">${launchSiteLocation()}</td>
        <td class="upcomingLaunch__date upcomingLaunch__dataTable">${americanDateFormat(launchDateUTC)}</td>
      </tr>`;
    });
  }
  catch(error) {
    upcomingLaunchContainer.innerHTML = displayError("Ooops, an error occured when calling API")
  }
}
getUpcomingLaunches();


/* ############################################################
--- <<<     Form Section     >>> ---
---############################################################ */
const form = document.querySelector("#contactForm");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const passedValidation = document.querySelector("#passedValidation");

form.addEventListener("submit", contactForm)

function contactForm(event) {
  event.preventDefault();

  subject.value.trim().length >= 10
  ? subjectError.style.display = "none" 
  : subjectError.style.display = "block"

  message.value.trim().length >= 25
  ? messageError.style.display = "none"
  : messageError.style.display = "block"

  validateEmail(email.value)
  ? emailError.style.display = "none"
  : emailError.style.display = "block"

  subject.value.trim().length >= 10 === true
  && message.value.trim().length >= 25 === true
  && validateEmail(email.value) === true
  ? passedValidation.style.display = "block"
  : passedValidation.style.display = "none"
}

const validateEmail = email =>  /\S+@\S+\.\S+/.test(email);