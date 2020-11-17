const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";
const pastLaunchContainer2020 = document.querySelector(".pastLaunch__2020");

const getPastLaunches = async () => {
  try {
    const response = await fetch(pastLaunchUrl);
    const pastLaunchResults = await response.json();

    pastLaunchResults.sort((a, b) => b.flight_number - a.flight_number);
    createPastLaunchesHtml(pastLaunchResults);
  }
  catch(error) {
    pastLaunchContainer2020.innerHTML = displayError("An error occured when calling API")
  }
}
getPastLaunches();


const createPastLaunchesHtml = (pastLaunchResults) => {

  const pastLaunchContainer2020 = document.querySelector(".pastLaunch__2020");
  const pastLaunchContainer2019 = document.querySelector(".pastLaunch__2019");
  const pastLaunchContainer2018 = document.querySelector(".pastLaunch__2018");
  const pastLaunchContainer2017 = document.querySelector(".pastLaunch__2017");
  const pastLaunchContainer2016 = document.querySelector(".pastLaunch__2016");
  const pastLaunchContainer2015 = document.querySelector(".pastLaunch__2015");
  const pastLaunchContainer2014 = document.querySelector(".pastLaunch__2014");
  const pastLaunchContainer2013 = document.querySelector(".pastLaunch__2013");
  const pastLaunchContainer2012 = document.querySelector(".pastLaunch__2012");
  const pastLaunchContainer2010 = document.querySelector(".pastLaunch__2010");
  const pastLaunchContainer2009 = document.querySelector(".pastLaunch__2009");
  const pastLaunchContainer2008 = document.querySelector(".pastLaunch__2008");
  const pastLaunchContainer2007 = document.querySelector(".pastLaunch__2007");
  const pastLaunchContainer2006 = document.querySelector(".pastLaunch__2006");

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
        <p><b>Flight:</b> ${flightNumber}</p>
        <p><b>Site:</b> ${launchSite}</p>
        <p><b>Rocket:</b> ${rocketName}</p>
        ${successMessage()}
        <div class="button__moreDetails">
          <a href="past-launches-details.html?flight_number=${flightNumber}">Learn more</a>
        </div>
      </div>`;
    return cardsHtml;
  }
  

  const year2020 = pastLaunchResults.filter(year => year.launch_year === '2020')
  year2020.map(pastLaunch => {
    pastLaunchContainer2020.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2019 = pastLaunchResults.filter(year => year.launch_year === '2019')
  year2019.map(pastLaunch => {
    pastLaunchContainer2019.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2018 = pastLaunchResults.filter(year => year.launch_year === '2018')
  year2018.map(pastLaunch => {
    pastLaunchContainer2018.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2017 = pastLaunchResults.filter(year => year.launch_year === '2017')
  year2017.map(pastLaunch => {
    pastLaunchContainer2017.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2016 = pastLaunchResults.filter(year => year.launch_year === '2016')
  year2016.map(pastLaunch => {
    pastLaunchContainer2016.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2015 = pastLaunchResults.filter(year => year.launch_year === '2015')
  year2015.map(pastLaunch => {
    pastLaunchContainer2015.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2014 = pastLaunchResults.filter(year => year.launch_year === '2014')
  year2014.map(pastLaunch => {
    pastLaunchContainer2014.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2013 = pastLaunchResults.filter(year => year.launch_year === '2013')
  year2013.map(pastLaunch => {
    pastLaunchContainer2013.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2012 = pastLaunchResults.filter(year => year.launch_year === '2012')
  year2012.map(pastLaunch => {
    pastLaunchContainer2012.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2010 = pastLaunchResults.filter(year => year.launch_year === '2010')
  year2010.map(pastLaunch => {
    pastLaunchContainer2010.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2009 = pastLaunchResults.filter(year => year.launch_year === '2009')
  year2009.map(pastLaunch => {
    pastLaunchContainer2009.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2008 = pastLaunchResults.filter(year => year.launch_year === '2008')
  year2008.map(pastLaunch => {
    pastLaunchContainer2008.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2007 = pastLaunchResults.filter(year => year.launch_year === '2007')
  year2007.map(pastLaunch => {
    pastLaunchContainer2007.innerHTML += createCardsHtml(pastLaunch);
  });

  const year2006 = pastLaunchResults.filter(year => year.launch_year === '2006')
  year2006.map(pastLaunch => {
    pastLaunchContainer2006.innerHTML += createCardsHtml(pastLaunch);
  });
};