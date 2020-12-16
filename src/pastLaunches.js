const pastLaunchUrl = "https://api.spacexdata.com/v4/launches/past";
const containerContainer = document.querySelector(".pastLaunch__container");

const getPastLaunches = async () => {
  try {
    const response = await fetch(pastLaunchUrl);
    const pastLaunchResults = await response.json();
    pastLaunchResults.sort((a, b) => b.flight_number - a.flight_number);

    createPastLaunchesHtml(pastLaunchResults);
  } catch (error) {
    containerContainer.innerHTML = displayError(
      "Ooops, an error occured when calling API"
    );
  }
};
getPastLaunches();

const createPastLaunchesHtml = (pastLaunchResults) => {
  loadingHandler(pastLaunchResults);
  showSubHeaders(pastLaunchResults);

  pastLaunchResults.map((pastLaunch) => {
    containerContainer.innerHTML += createCardsHtml(pastLaunch);
  });
};

const createCardsHtml = (pastLaunch) => {
  const launchDateUTC = pastLaunch.date_utc;
  const missionBadge =
    pastLaunch.links.patch.small || pastLaunch.links.patch.large;
  const missionName = pastLaunch.name;
  const flightNumber = pastLaunch.flight_number;
  const launchSuccess = pastLaunch.success;
  const rocketNameId = pastLaunch.rocket;

  function successMessage() {
    return launchSuccess
      ? `<p class="pastLaunch__successMessage"><SUCCESSFUL>SUCCESSFUL</p>`
      : `<p class="pastLaunch__failedMessage">FAILED</p>`;
  }

  const cardsHtml = `
  <div class="pastLaunch__card">
  <img class="pastLaunch__missionBadge" src=${missionBadge} alt=${missionName}>
  <p class="pastLaunch__date">${americanDateFormat(launchDateUTC)}</p>
  <h3 class="pastLaunch__missionName">${missionName}</h3>
  <p><b>Flight#:</b> ${flightNumber}</p>
  <p><b>Rocket:</b> ${rocketName(rocketNameId)}</p>
  ${successMessage()}
  <div class="button__moreDetails">
  <a href="past-launches-details.html?flight_number=${flightNumber}">Learn more</a>
  </div>
  </div>`;
  return cardsHtml;
};

const loadingHandler = (pastLaunchResults) => {
  const loadingIndicator = document.querySelector(".loader-container");

  return pastLaunchResults
    ? loadingIndicator.classList.add("loader-container--hide")
    : loadingIndicator.classList.remove("loader-container--hide");
};

const showSubHeaders = (pastLaunchResults) => {
  const subHeaders = document.querySelectorAll(".subheader--hide");

  return pastLaunchResults
    ? subHeaders.forEach((sub) => {
        sub.classList.remove("subheader--hide");
      })
    : subHeaders.forEach((sub) => {
        sub.classList.add("subheader--hide");
      });
};

/* ############################################################
--- <<<     Footer     >>> ---
---############################################################ */
const pagesFooter = document.querySelector(".pages__footer");
pagesFooter.innerHTML = pagesFooterHtml;
