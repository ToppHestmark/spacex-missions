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
    errorContainer.innerHTML = displayError("An error occured when calling API")
  }
}
getNextLaunch()


function nextLaunchHtml(nextLaunchResult) {
  const missionName = nextLaunchResult.mission_name
  const flightNumber = nextLaunchResult.flight_number
  const launchSite = nextLaunchResult.launch_site.site_name_long
  const rocketName = nextLaunchResult.rocket.rocket_name
  const launchDateUTC = nextLaunchResult.launch_date_utc
  const getDate = new Date(launchDateUTC);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(getDate);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(getDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(getDate);
  const date = `${month} ${day}, ${year}`;

  nextLaunchContainer.innerHTML = `<div class="index__nextLaunchResults">
  <h2>${missionName}</h2>
  <p><b>Flight Number:</b> ${flightNumber}</p>
  <p><b>Launch Date:</b> ${date}</p>
  <p><b>Launch Site:</b> ${launchSite}</p>
  <p><b>Rocket Name:</b> ${rocketName}</p>
  </div>`;

  // Countdown timer
  function getRemainingTime(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return { total, days, hours, minutes, seconds };

  }
  getRemainingTime(launchDateUTC)
  
  function countdownTimer(id, endtime) {
    const countdownContainer = document.getElementById(id);

    const timeinterval = setInterval(() => {
      const timeRemaining = getRemainingTime(endtime);
      countdownContainer.innerHTML = `<div class="countdown__result">
      <div><p class="countdown-numbers">${timeRemaining.days}</p> <p class="countdown__TimeUnit">DAYS</p></div>
      <div><p class="countdown-numbers">${timeRemaining.hours}</p> <p class="countdown__TimeUnit">HOURS</p></div>
      <div><p class="countdown-numbers">${timeRemaining.minutes}</p> <p class="countdown__TimeUnit">MINUTES</p></div>
      <div><p class="countdown-numbers">${timeRemaining.seconds}</p> <p class="countdown__TimeUnit">SECONDS</p></div>
      </div>`

      // Stop counting when passing the deadline
      // if (t.total <= 0) {
      //   clearInterval(timeinterval);
      // }
    },1000);
    timeinterval()
  }
  countdownTimer('countdown-container', launchDateUTC);

} 
