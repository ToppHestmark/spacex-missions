const pastLaunchesDetailsContainer = document.querySelector(".pastLaunchesDetails__container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flight_number = params.get("flight_number");
const singleFlightURL = "https://api.spacexdata.com/v3/launches/" + flight_number;

const getDetails = async () => {
  try {
    const response = await fetch(singleFlightURL);
    const flightDetails = await response.json();
    
    createDetailsHtml(flightDetails);
  }
  catch(error) {
    pastLaunchesDetailsContainer.innerHTML = displayError("An error occured when calling API");
  }
}
getDetails()


const createDetailsHtml = (flightDetails) => {
    const launchDateUTC = new Date(flightDetails.launch_date_utc);
    const missionName = flightDetails.mission_name;
    const detailsImage = flightDetails.links.flickr_images;
    const launchSite = flightDetails.launch_site.site_name_long;
    const flightNumber = flightDetails.flight_number;
    const detailsText = flightDetails.details;
    const rocketName = flightDetails.rocket.rocket_name;
    const videoLink = flightDetails.links.video_link;
    const articleLink = flightDetails.links.article_link;
    const launchSuccess = flightDetails.launch_success;
    const payloads = flightDetails.rocket.second_stage.payloads;

    const missionPayloads = payloads.map(payload => {
      const payloadId = `<h4>${payload.payload_id}</h4>`;
      const payloadType = `<li><b>Payload Type:</b> ${payload.payload_type}</li>`;
      const customer = `<li><b>Customer:</b> ${payload.customers}</li>`;
      const manufacturer = `<li><b>Manufacturer:</b> ${payload.manufacturer}</li>`;
      const nationality = `<li><b>Nationality:</b> ${payload.nationality}</li>`;
      const payloadMass = `<li><b>Mass (kg):</b> ${payload.payload_mass_kg}</li>`;

      return `${payloadId} ${payloadType} ${customer} ${manufacturer} ${nationality} ${payloadMass}`;
    });
      
    function successFactor() {
      return launchSuccess ? `<span class="pastLaunchesDetails__successMessage">SUCCESSFUL</span>` : `<span class="pastLaunchesDetails__failedMessage">FAILED</span>`;
    }

    if (!detailsImage) {
      return `<p>No image</p>`
    }

    function detailsDescription() {
      return detailsText ? detailsText : "No details available.";
    }
    
    pastLaunchesDetailsContainer.innerHTML = `
    <div class="pastLaunchesDetails__results">
      <h1>${missionName}</h1>
      <div class="pastLaunchesDetails__contentContainer">
        <img src="${detailsImage}" alt="${missionName}">
        <p class="pastLaunchesDetails__imageText">Photo: SpaceX</p>
        <div class="pastLaunchesDetails__TextContentContainer">
          <p class="pastLaunchesDetails__date"> ${americanDateFormat(launchDateUTC)}</p>
          <p class="pastLaunchesDetails__detailsDescription">${detailsDescription()}</p>
          <p><b>Mission:</b> ${successFactor()}</p>
          <p><b>Flight Number:</b> ${flightNumber}</p>
          <p><b>Launch Site:</b> ${launchSite}</p>
          <p><b>Rocket:</b> ${rocketName}</p>
          <h3>Payloads</h3>
          <div class="pastLauchesDetails__payloads">${missionPayloads}</div>
          <div class="pastLaunchesDetails__links">
          <a target="_blank" href="${videoLink}">Watch video</a>
          <a target="_blank" href="${articleLink}">Read article</a>
        </div>
      </div>
      </div>
    </div>`;
}