const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";
const container2020 = document.querySelector(".pastLaunch__2020");

const getPastLaunches = async () => {
  try {
    const response = await fetch(pastLaunchUrl);
    const pastLaunchResults = await response.json();
    pastLaunchResults.sort((a, b) => b.flight_number - a.flight_number);

    createPastLaunchesHtml(pastLaunchResults);
  }
  catch(error) {
    container2020.innerHTML = displayError("An error occured when calling API")
  }
}
getPastLaunches();


const createPastLaunchesHtml = (pastLaunchResults) => {
  
  const createCardsHtml = (pastLaunch) => {
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
    
    const cardsHtml = `
    <div class="pastLaunch__card">
    <img class="pastLaunch__missionBadge" src=${missionBadge} alt=${missionName}>
    <p class="pastLaunch__date">${americanDateFormat(launchDateUTC)}</p>
    <h3 class="pastLaunch__missionName">${missionName}</h3>
    <p><b>Flight#:</b> ${flightNumber}</p>
    <p><b>Site:</b> ${launchSite}</p>
    <p><b>Rocket:</b> ${rocketName}</p>
    ${successMessage()}
    <div class="button__moreDetails">
    <a href="past-launches-details.html?flight_number=${flightNumber}">Learn more</a>
    </div>
    </div>`;
    return cardsHtml;
  };

  const containerLatest = document.querySelector(".pastLaunch__latest");
  const container2019 = document.querySelector(".pastLaunch__2019");
  const container2018 = document.querySelector(".pastLaunch__2018");
  const container2017 = document.querySelector(".pastLaunch__2017");
  const container2016 = document.querySelector(".pastLaunch__2016");
  const container2015 = document.querySelector(".pastLaunch__2015");
  const container2014 = document.querySelector(".pastLaunch__2014");
  const containerBeyond2013 = document.querySelector(".pastLaunch__beyond2013");

  // ----- Launches filtered by periods of time -----
  const latestLaunches = pastLaunchResults.filter(year => year.launch_year >= '2020')
    latestLaunches.map(pastLaunch => {
    containerLatest.innerHTML += createCardsHtml(pastLaunch);
  });
  
  const launches2019 = pastLaunchResults.filter(year => year.launch_year === '2019')
    launches2019.map(pastLaunch => {
      container2019.innerHTML += createCardsHtml(pastLaunch);});
  
    const launches2018 = pastLaunchResults.filter(year => year.launch_year === '2018')
    launches2018.map(pastLaunch => {
      container2018.innerHTML += createCardsHtml(pastLaunch);
    });
  
    const launches2017 = pastLaunchResults.filter(year => year.launch_year === '2017')
    launches2017.map(pastLaunch => {
      container2017.innerHTML += createCardsHtml(pastLaunch);
    });
  
    const launches2016 = pastLaunchResults.filter(year => year.launch_year === '2016')
    launches2016.map(pastLaunch => {
      container2016.innerHTML += createCardsHtml(pastLaunch);
    });
  
    const year2015 = pastLaunchResults.filter(year => year.launch_year === '2015')
    year2015.map(pastLaunch => {
      container2015.innerHTML += createCardsHtml(pastLaunch);
    });
  
    const launches2014 = pastLaunchResults.filter(year => year.launch_year === '2014')
    launches2014.map(pastLaunch => {
      container2014.innerHTML += createCardsHtml(pastLaunch);
   });
  
    const beyond2013 = pastLaunchResults.filter(year => year.launch_year <= '2013')
    beyond2013.map(pastLaunch => {
      containerBeyond2013.innerHTML += createCardsHtml(pastLaunch);
    });
};

/* ############################################################
--- <<<     Footer     >>> ---
---############################################################ */
const pagesFooter = document.querySelector('.pages__footer');
pagesFooter.innerHTML = pagesFooterHtml;