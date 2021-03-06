/* ##########################################################
--- <<<     Next launch     >>> ---
---########################################################## */
const nextLaunchUrl = "https://api.spacexdata.com/v4/launches/next";
const nextLaunchContainer = document.querySelector(
  ".index__nextLaunchContainer"
);

const getNextLaunch = async () => {
  try {
    const response = await fetch(nextLaunchUrl);
    const nextLaunchResult = await response.json();
    nextLaunchHtml(nextLaunchResult);
  } catch (error) {
    nextLaunchContainer.innerHTML = displayError(
      "Ooops, an error occured when calling API."
    );
  }
};
getNextLaunch();

const nextLaunchHtml = (nextLaunchResult) => {
  const missionName = nextLaunchResult.name;
  const flightNumber = nextLaunchResult.flight_number;
  const launchDateUTC = nextLaunchResult.date_utc;
  const redditLink = nextLaunchResult.links.reddit.campaign;

  nextLaunchContainer.innerHTML = `
  <div class="index__nextLaunchResults">
    <h2>${missionName}</h2>
    <p> <b>Flight#</b> ${flightNumber} </p>
    <p> 
      <div class="index__icon">
      <img src="assets/icons/rocket-light-icon.png" alt="Rocket icon">
      </div> ${rocketName(nextLaunchResult.rocket)}
    </p> 
    <p>
      <div class="index__icon">
        <img src="assets/icons/calendar-light-icon.png" alt="Calendar icon">
      </div> 
      ${americanDateFormat(launchDateUTC)}
    </p>
    <div class="reddit-link">
      <a target="_blank" href=${redditLink}><div class="index__icon">
      <img src="assets/icons/external-link-red.png" alt="External link icon">
    </div>Campaign threads</a>
    </div>
  </div>`;

  // Countdown timer
  const countdownInterval = setInterval(() => {
    const countdownContainer = document.querySelector("#countdown-container");

    const launchTime = Date.parse(launchDateUTC);
    const now = Date.parse(new Date());
    const totalTimeRemaining = launchTime - now;

    const seconds = Math.floor((totalTimeRemaining / 1000) % 60);
    const minutes = Math.floor((totalTimeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((totalTimeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalTimeRemaining / (1000 * 60 * 60 * 24));

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
      countdownContainer.innerHTML = `<h2 class="countdown__LaunchedMessage">Launched</h2>`;
    }
  }, 1000);
};

/* ############################################################
--- <<<     Upcoming launches     >>> ---
---############################################################ */
const upcomingLaunchUrl = "https://api.spacexdata.com/v4/launches/upcoming";
const upcomingLaunchTable = document.querySelector(
  ".index__upcomingLaunchTable"
);

const getUpcomingLaunches = async () => {
  try {
    const response = await fetch(upcomingLaunchUrl);
    const upcomingLaunchResults = await response.json();

    createTableHtml(upcomingLaunchResults);
  } catch (error) {
    upcomingLaunchTable.innerHTML = displayError(
      "Ooops, an error occured when calling API"
    );
  }
};
getUpcomingLaunches();

const createTableHtml = (upcomingLaunchResults) => {
  upcomingLaunchResults.map((upcomingLaunch) => {
    const launchDateUTC = upcomingLaunch.date_utc;
    const flightNumber = upcomingLaunch.flight_number;
    const missionName = upcomingLaunch.name;
    const rocketNameId = upcomingLaunch.rocket;

    upcomingLaunchTable.innerHTML += `
    <tr class="upcomingLaunch__dataResults tablerow__borderBottom">
      <td class="upcomingLaunch__flightNumber upcomingLaunch__dataTable">${flightNumber}</td>
      <td class="upcomingLaunch__mission upcomingLaunch__dataTable">${missionName}</td>
      <td class="upcomingLaunch__site upcomingLaunch__dataTable">${rocketName(
        rocketNameId
      )}</td>
      <td class="upcomingLaunch__date upcomingLaunch__dataTable">${americanDateFormat(
        launchDateUTC
      )}</td>
    </tr>`;
  });
};

/* ############################################################
--- <<<     Goals and video links     >>> ---
---############################################################ */
const goalsAndLinks = document.querySelector(".index__goalsAndLinks");
goalsAndLinks.innerHTML = indexGoalsLinks;

/* ############################################################
--- <<<     Form Section     >>> ---
---############################################################ */
const contactForm = document.querySelector("#contactForm");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const passedValidation = document.querySelector("#passedValidation");

contactForm.addEventListener("submit", contactFormHandler);

function contactFormHandler(event) {
  event.preventDefault();

  subject.value.trim().length >= 10
    ? (subjectError.style.display = "none")
    : (subjectError.style.display = "block");

  message.value.trim().length >= 25
    ? (messageError.style.display = "none")
    : (messageError.style.display = "block");

  validateEmail(email.value)
    ? (emailError.style.display = "none")
    : (emailError.style.display = "block");

  subject.value.trim().length >= 10 === true &&
  message.value.trim().length >= 25 === true &&
  validateEmail(email.value) === true
    ? (passedValidation.style.display = "block")
    : (passedValidation.style.display = "none");
}

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

/* ############################################################
--- <<<     Footer     >>> ---
---############################################################ */
const indexFooter = document.querySelector(".index__footer");
indexFooter.innerHTML = indexFooterHtml;
