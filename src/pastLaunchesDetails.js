const pastLaunchesDetailsContainer = document.querySelector(
  ".pastLaunchesDetails__container"
);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const launchId = params.get("launch_id");
const singleFlightURL = "https://api.spacexdata.com/v4/launches/" + launchId;

const getDetails = async () => {
  try {
    const response = await fetch(singleFlightURL);
    const flightDetails = await response.json();

    createDetailsHtml(flightDetails);
  } catch (error) {
    pastLaunchesDetailsContainer.innerHTML = displayError(
      "OOps, an error occured when calling API"
    );
  }
};
getDetails();

const createDetailsHtml = (flightDetails) => {
  const launchDateUTC = new Date(flightDetails.launch_date_utc);
  const missionName = flightDetails.mission_name;
  const detailsImage = flightDetails.links.original;
  const launchSite = flightDetails.launch_site.site_name_long;
  const flightNumber = flightDetails.flight_number;
  const detailsText = flightDetails.details;
  const rocketName = flightDetails.rocket.rocket_name;
  const videoLink = flightDetails.links.video_link;
  const articleLink = flightDetails.links.article_link;
  const launchSuccess = flightDetails.launch_success;
  const payloads = flightDetails.rocket.second_stage.payloads;

  // ----- Payloads-handler and helpers -----
  const missionPayloads = payloads.map((payload) => {
    const payloadId = payload.payload_id;
    const payloadType = payload.payload_type;
    const customer = payload.customers;
    const nationality = payload.nationality;
    const manufacturer = payload.manufacturer;
    const manufacturerHandler = () => {
      return manufacturer === null ? "Not specified" : manufacturer;
    };

    const payloadMassKg = payload.payload_mass_kg;
    const massKg = String(payloadMassKg).replace(/(.)(?=(\d{3})+$)/g, "$1.");
    const payloadMassLbs = Math.floor(payload.payload_mass_lbs);
    const massLbs = String(payloadMassLbs).replace(/(.)(?=(\d{3})+$)/g, "$1.");

    let payloads = "";
    payloads += `
      <h4>${payloadId}</h4>
      <div class="pastLaunchDetails__payload"><b>Payload Type:</b> <p>${payloadType}</p></div>
      <div class="pastLaunchDetails__payload"><b>Customer:</b> <p>${customer}</p></div>
      <div class="pastLaunchDetails__payload"><b>Manufacturer:</b> <p>${manufacturerHandler()}</p></div>
      <div class="pastLaunchDetails__payload"><b>Nationality:</b> <p>${nationality}</p></div>
      <div class="pastLaunchDetails__payload"><b>Mass:</b> <p> ${massKg} kg / ${massLbs} lbs </p> </div>
      `;
    return payloads;
  });

  const successFactor = () => {
    return launchSuccess
      ? `<span class="pastLaunchesDetails__successMessage">SUCCESSFUL</span>`
      : `<span class="pastLaunchesDetails__failedMessage">FAILED</span>`;
  };

  const detailsDescription = () => {
    return detailsText ? detailsText : "No details available.";
  };

  // pastLaunchesDetailsContainer.innerHTML = `
  //   <div class="pastLaunchesDetails__results">
  //     <h1>${missionName}</h1>
  //     <div class="pastLaunchesDetails__contentContainer">
  //         <div class="pastLaunchesDetails__imageContainer">
  //           <img src="${detailsImage}" alt="${missionName}">
  //         </div>
  //         <p class="pastLaunchesDetails__imageText">Photo: SpaceX</p>
  //         <div class="pastLaunchesDetails__TextContentContainer">
  //           <p class="pastLaunchesDetails__date"> ${americanDateFormat(
  //             launchDateUTC
  //           )}</p>
  //           <p class="pastLaunchesDetails__detailsDescription">${detailsDescription()}</p>
  //           <p><b>Flight#:</b> ${flightNumber}</p>
  //           <p><b>Rocket:</b> ${rocketName}</p>
  //           <p><b>Site:</b> ${launchSite}</p>
  //           <p><b>Critical Success Factor:</b> ${successFactor()}</p>
  //           <h3>PAYLOADS</h3>
  //         <div class="pastLauchesDetails__payloads">${missionPayloads}</div>
  //         <div class="pastLaunchesDetails__links">
  //           <a target="_blank" href="${videoLink}">Watch video</a>
  //           <a target="_blank" href="${articleLink}">Read article</a>
  //         </div>
  //         <a class="pastLaunchesDetails__back" href="./../pages/past-launches.html">Back to past launches</a>
  //       </div>
  //     </div>
  //   </div>`;
};

/* ############################################################
--- <<<     Footer     >>> ---
---############################################################ */
const pagesFooter = document.querySelector(".pages__footer");
pagesFooter.innerHTML = pagesFooterHtml;
