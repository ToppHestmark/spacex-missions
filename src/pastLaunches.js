const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";
const pastLaunchContainer = document.querySelector(".pastLaunch__container");

async function getPastLaunchProp() {

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
getPastLaunchProp();


function createPastLaunchesHtml(pastLaunchResults) {

  pastLaunchResults.map(pastLaunchProp => {
      
    const launchDateUTC = pastLaunchProp.launch_date_utc;
    const missionBadge = pastLaunchProp.links.mission_patch_small;
    const missionName = pastLaunchProp.mission_name
    const flightNumber = pastLaunchProp.flight_number;
    const launchSite = pastLaunchProp.launch_site.site_name_long;
    const rocketName = pastLaunchProp.rocket.rocket_name;
    const launchSuccess = pastLaunchProp.launch_success;
        
    
    function successMessage() {
      return launchSuccess ? `<p class="pastLaunch__successMessage"><SUCCESSFUL>SUCCESSFUL</p>` : `<p class="pastLaunch__failedMessage">FAILED</p>`;
    }

    pastLaunchContainer.innerHTML +=  `
    <div class="pastLaunch__card">
      <img class="pastLaunch__missionBadge" src=${missionBadge} alt=${missionName}>
      <h2 class="pastLaunch__missionName">${missionName}</h2>
      <p class="pastLaunch__date">${americanDateFormat(launchDateUTC)}</p>
      <p><b>Flight Number:</b> ${flightNumber}</p>
      <p><b>Launch Site:</b> ${launchSite}</p>
      <p><b>Rocket:</b> ${rocketName}</p>
      ${successMessage()}
      <div class="button__moreDetails">
        <a href="past-launches-details.html?flight_number=${flightNumber}">Learn more</a>
      </div>
    </div>`;
  });
};