// const details = pastLaunchProp.details;
// function detailsDescription() {
//   return details ? `<p class="details_description">${details}</p>` : "";
// }

const pastLaunchesDetailsContainer = document.querySelector(".pastLaunchesDetails__container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flight_number = params.get("flight_number");
const url = "https://api.spacexdata.com/v3/launches/" + flight_number;

async function getDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    createDetailsHtml(details);
  }
  catch(error) {
    pastLaunchesDetailsContainer.innerHTML = displayError("An error occured when calling API");
  }
}
getDetails()


function createDetailsHtml(details) {
    const launchDateUtc = new Date(details.launch_date_utc);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(launchDateUtc)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(launchDateUtc)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(launchDateUtc)
    const dateLaunched = `${mo} ${da}, ${ye}`;
    const missionName = details.mission_name;
    const detailsImage = details.links.flickr_images;
    const launchSite = details.launch_site.site_name_long;
    const flightNumber = details.flight_number;
    const detailsText = details.details;
    const rocketName = details.rocket.rocket_name;
    const rocketType = details.rocket.rocket_type;
    const payloadType = details.rocket.second_stage.payloads[0].payload_type;
    const payloadMass = details.rocket.second_stage.payloads[0].payload_mass_kg;
    const nationality = details.rocket.second_stage.payloads[0].nationality;
    const videoLink = details.links.video_link;

    const launchSuccess = details.launch_success;
    function successFactor() {
      return launchSuccess ? `<span class="pastLaunchesDetails__successMessage">SUCCESSFUL</span>` : `<span class="pastLaunchesDetails__failedMessage">FAILED</span>`;
    }

    if (!detailsImage) {
      return `<p>No image</p>`
    }
    
    pastLaunchesDetailsContainer.innerHTML = `<div class="pastLaunchesDetails__result">
      <h1>${missionName}</h1>
      <img src="${detailsImage}" alt="${missionName}">
      <p class="pastLaunchesDetails__imageText">Photo: SpaceX</p>
      <div class="pastLaunchesDetails__TextContentContainer">
        <p class="pastLaunchesDetails__detailsDescription">${detailsText}</p>
        <p><b>Mission:</b> ${successFactor()}</p>
        <p><b>Date Launched:</b> ${dateLaunched}</p>
        <p><b>Flight Number:</b> ${flightNumber}</p>
        <h2 class="pastLaunchesDetails__subHeader">Mission details:</h2>
        <li>Launch Site: ${launchSite}</li>
        <li>Rocket Name: ${rocketName}</li>
        <li>Rocket Type: ${rocketType}</li>
        <li>Payload Type: ${payloadType}</li>
        <li>Payload Mass: ${payloadMass} kg</li>
        <li>Nationality: ${nationality} </li>
        <div class="pastLaunchesDetails__links">
          <a target="_blank" href="${videoLink}">WATCH VIDEO</a>
        </div>
      </div>
    </div>`
}