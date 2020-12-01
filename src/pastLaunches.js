const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";
const containerLatest = document.querySelector(".pastLaunch__latest");

const getPastLaunches = async () => {
  try {
    const response = await fetch(pastLaunchUrl);
    const pastLaunchResults = await response.json();
    pastLaunchResults.sort((a, b) => b.flight_number - a.flight_number);

    createPastLaunchesHtml(pastLaunchResults);
  }
  catch(error) {
    containerLatest.innerHTML = displayError("Ooops, an error occured when calling API")
  }
}
getPastLaunches();


const createPastLaunchesHtml = (pastLaunchResults) => {

  loadingHandler(pastLaunchResults)
  showSubHeaders(pastLaunchResults)
  
  // ----- Launches filtered by periods of time -----
  const latestLaunchesCards = pastLaunchResults.filter(year => year.launch_year >= '2020')
      latestLaunchesCards.map(pastLaunch => {
        containerLatest.innerHTML += createCardsHtml(pastLaunch);
    });
  
  const container2019 = document.querySelector(".pastLaunch__2019");
  const launches2019Cards = pastLaunchResults.filter(year => year.launch_year === '2019')
    launches2019Cards.map(pastLaunch => {
      container2019.innerHTML += createCardsHtml(pastLaunch);});
  
  const container2018 = document.querySelector(".pastLaunch__2018");
  const launches2018Cards = pastLaunchResults.filter(year => year.launch_year === '2018')
    launches2018Cards.map(pastLaunch => {
      container2018.innerHTML += createCardsHtml(pastLaunch);
    });
  
  const container2017 = document.querySelector(".pastLaunch__2017");
  const launches2017Cards = pastLaunchResults.filter(year => year.launch_year === '2017')
    launches2017Cards.map(pastLaunch => {
      container2017.innerHTML += createCardsHtml(pastLaunch);
    });
  
  const container2016 = document.querySelector(".pastLaunch__2016");
  const launches2016Cards = pastLaunchResults.filter(year => year.launch_year === '2016')
    launches2016Cards.map(pastLaunch => {
      container2016.innerHTML += createCardsHtml(pastLaunch);
    });
  
  const container2015 = document.querySelector(".pastLaunch__2015");
  const launches2015Cards = pastLaunchResults.filter(year => year.launch_year === '2015')
    launches2015Cards.map(pastLaunch => {
      container2015.innerHTML += createCardsHtml(pastLaunch);
    });
  
  const containerBeyond2014 = document.querySelector(".pastLaunch__beyond2014");
  const beyond2014 = pastLaunchResults.filter(year => year.launch_year <= '2014')
    beyond2014.map(pastLaunch => {
      containerBeyond2014.innerHTML += createCardsHtml(pastLaunch);
    });
};

const createCardsHtml = (pastLaunch) => {
  const launchDateUTC = pastLaunch.launch_date_utc;
  const missionBadge = pastLaunch.links.mission_patch_small;
  const missionName = pastLaunch.mission_name
  const flightNumber = pastLaunch.flight_number;
  const launchSite = pastLaunch.launch_site.site_name_long;
  const rocketName = pastLaunch.rocket.rocket_name;
  const launchSuccess = pastLaunch.launch_success;

  function successMessage() {
    return launchSuccess 
    ? `<p class="pastLaunch__successMessage"><SUCCESSFUL>SUCCESSFUL</p>` 
    : `<p class="pastLaunch__failedMessage">FAILED</p>`;
  };
  
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

const loadingHandler = (pastLaunchResults) => {
  const loadingIndicator = document.querySelector('.loader-container');

  return pastLaunchResults 
  ? loadingIndicator.classList.add('loader-container--hide') 
  : loadingIndicator.classList.remove('loader-container--hide');
}

const showSubHeaders = (pastLaunchResults) => {
  const subHeaders = document.querySelectorAll('.subheader--hide');
  
  return pastLaunchResults 
    ? subHeaders.forEach((sub) => {
      sub.classList.remove('subheader--hide')
      })
    : subHeaders.forEach((sub) => {
      sub.classList.add('subheader--hide')
      })
}

/* ############################################################
--- <<<     Footer     >>> ---
---############################################################ */
const pagesFooter = document.querySelector('.pages__footer');
pagesFooter.innerHTML = pagesFooterHtml;