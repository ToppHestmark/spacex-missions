const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";
const pastLaunchContainer = document.querySelector(".pastLaunch__container");

const getPastLaunches = async () => {

  try {
    const response = await fetch(pastLaunchUrl);
    const pastLaunchResults = await response.json();
    pastLaunchResults.sort((a, b) => b.flight_number - a.flight_number)

    createPastLaunchesHtml(pastLaunchResults)
  }
  catch(error) {
    pastLaunchContainer.innerHTML = displayError("An error occured when calling API")
  }
}
getPastLaunches();


const createPastLaunchesHtml = (pastLaunchResults) => {

  pastLaunchResults.map(pastLaunch => {
      
    const launchDateUTC = pastLaunch.launch_date_utc;
    const missionBadge = pastLaunch.links.mission_patch_small;
    const missionName = pastLaunch.mission_name
    const flightNumber = pastLaunch.flight_number;
    const launchSite = pastLaunch.launch_site.site_name_long;
    const rocketName = pastLaunch.rocket.rocket_name;
    const launchSuccess = pastLaunch.launch_success;
        
    
    function successMessage() {
      return launchSuccess ? `<p class="pastLaunch__successMessage"><SUCCESSFUL>SUCCESSFUL</p>` : `<p class="pastLaunch__failedMessage">FAILED</p>`;
    }

    pastLaunchContainer.innerHTML +=  `
    <div class="pastLaunch__card">
      <img class="pastLaunch__missionBadge" src=${missionBadge} alt=${missionName}>
      <p class="pastLaunch__date">${americanDateFormat(launchDateUTC)}</p>
      <h2 class="pastLaunch__missionName">${missionName}</h2>
      <p><b>Flight:</b> ${flightNumber}</p>
      <p><b>Site:</b> ${launchSite}</p>
      <p><b>Rocket:</b> ${rocketName}</p>
      ${successMessage()}
      <div class="button__moreDetails">
        <a href="past-launches-details.html?flight_number=${flightNumber}">Learn more</a>
      </div>
    </div>`;
  });
};