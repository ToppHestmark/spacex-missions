const vehiclesContainer = document.querySelector('.vehicles__rocketsContainer');
const rocketsURL = "https://api.spacexdata.com/v3/rockets";

const getRockets = async () => {
  try {
    const rocketResponse = await fetch(rocketsURL);
    const rocketResults = await rocketResponse.json();
    createVehiclesHtml(rocketResults)
  }
  catch(error) {
    vehiclesContainer.innerHTML = displayError("Ooops, An error occured when calling API.")
  }
}
getRockets()

const createVehiclesHtml = (rocketResults) => {

  rocketResults.map(vehicle => {

    const vehicleName = vehicle.rocket_name;
    const vehicleDuty = vehicle.active;
    const vehicleFirstFlight = vehicle.first_flight;
    const vehicleMassKG = vehicle.mass.kg;
    const vehicleMassLB = vehicle.mass.lb;
    const vehicleHeightMeters = vehicle.height.meters;
    const vehicleHeightFeet = vehicle.height.feet;
    const vehicleDiameterMeters = vehicle.diameter.meters;
    const vehicleDiameterFeet = vehicle.diameter.feet;
    const vehicleReusable = vehicle.first_stage.reusable;
    const vehicleImage = vehicle.flickr_images[0];
    const vehicleSuccessRate = vehicle.success_rate_pct;
    const vehicleCostPerLaunch = vehicle.cost_per_launch;
    const vehicleEngineType = vehicle.engines.type;
    const vehicleDescription = vehicle.description;

    // Formatting
    const massInLb = String(vehicleMassLB).replace(/(.)(?=(\d{3})+$)/g,'$1.');
    const massInKg = String(vehicleMassKG).replace(/(.)(?=(\d{3})+$)/g,'$1.');
    const costPerLaunch = String(vehicleCostPerLaunch).replace(/(.)(?=(\d{3})+$)/g,'$1.');
    const firstFlightDate = americanDateFormat(vehicleFirstFlight);
    const duty = () => vehicleDuty ? "Active" : "Inactive";
    const reusable = () => vehicleReusable ? "Yes" : "No";

    const mass = `<p> ${massInKg} kg / ${massInLb} lbs</p>`;
    const height = `<p> ${vehicleHeightMeters} m / ${vehicleHeightFeet} ft</p>`;
    const diameter = `<p> ${vehicleDiameterMeters} m / ${vehicleDiameterFeet} ft</p>`;

    vehiclesContainer.innerHTML += `<div class="vehicle__card">
    <h2>${vehicleName}</h2>
      <div class="vehicles__imageContainer">
        <img src=${vehicleImage} alt="${vehicleName}">
      </div>
      <div class="vehicles__description">
        <p>${vehicleDescription}</p>
      </div>
      <div class="vehicle__facts">
        <b>Status:</b> <p>${duty()}</p>
      </div>
      <div class="vehicle__facts">
        <b>First Flight:</b> <p>${firstFlightDate}</p>
      </div>
      <div class="vehicle__facts">
        <b>Success Rate:</b> <p>${vehicleSuccessRate} %</p>
      </div>
      <div class="vehicle__facts">
      <b>Cost per Launch:</b> <p>$ ${costPerLaunch}</p>
      </div>
      <div class="vehicle__facts">
      <b>Height:</b> ${height}
      </div>
      <div class="vehicle__facts">
      <b>Mass:</b> ${mass}
      </div>
      <div class="vehicle__facts">
      <b>Diameter:</b> ${diameter}
      </div>
      <div class="vehicle__facts">
        <b>Engine Type:</b> <p>${vehicleEngineType.toUpperCase()}</p>
      </div>
      <div class="vehicle__facts">
        <b>Engine re-usable:</b> <p>${reusable()} </p>
      </div>
    </div>`;
  });
};

/* ############################################################
--- <<<     Footer     >>> ---
---############################################################ */
const pagesFooter = document.querySelector('.pages__footer');
pagesFooter.innerHTML = pagesFooterHtml;