const rocketsImgContainer = document.querySelector('.vehicles__rocketsImgContainer');
const rocketsInfoContainer = document.querySelector('.vehicles__rocketsInfoContainer');
const roadsterContainer = document.querySelector('.vehicles__roadsterContainer');
const rocketsURL = "https://api.spacexdata.com/v3/rockets";
const roadsterURL = "https://api.spacexdata.com/v3/roadster";

console.log(rocketsInfoContainer);

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

    const rocketName = vehicle.rocket_name;
    const rocketDuty = vehicle.active;
    const rocketFirstFlight = vehicle.first_flight;
    const rocketMassKG = vehicle.mass.kg;
    const rocketMassLB = vehicle.mass.lb;
    const rocketHeightMeters = vehicle.height.meters;
    const rocketHeightFeet = vehicle.height.feet;
    const rocketDiameterMeters = vehicle.diameter.meters;
    const rocketDiameterFeet = vehicle.diameter.feet;
    const rocketReusable = vehicle.first_stage.reusable;
    const rocketImages = vehicle.flickr_images;
    const rocketSuccessRate = vehicle.success_rate_pct;
    const rocketCostPerLaunch = vehicle.cost_per_launch;
    const rocketEngineType = vehicle.engines.type;
    const rocketDescription = vehicle.description;

    rocketImages.map(image => {

    })
    
    // console.log(rocketImages);
  })
}