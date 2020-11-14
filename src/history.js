const historyUrl = "https://api.spacexdata.com/v3/history";
const historyContainer = document.querySelector(".history__container");

async function getHistory() {
  try {
    const response = await fetch(historyUrl);
    const historyResults = await response.json();

    createHistoryHtml(historyResults)
  }
  catch(error) {
    historyContainer.innerHTML = displayError("Ooops, An error occured when calling API.")
  }
}
getHistory()

function createHistoryHtml(historyResults) {

  historyResults.map(history => {

    const title = history.title;
    const eventDate = history.event_date_utc;
    const details = history.details;
    const articleLink = history.links.article;
    const flightNumber = history.flight_number;

    const flight = () => {
      return flightNumber === null ? 'N/A' : flightNumber;
    };

    console.log();

    historyContainer.innerHTML += `
    <div class="history__card">
      <div class="history__cardText">
        <h2>${title}</h2>
        <p><b>Flight #:</b> ${flight()}</p>
        <p>Date: ${americanDateFormat(eventDate)}</p>
        <p>${details}</p>
        <div class="history__link">
          <a target="_blank" href="${articleLink}">Read article</a>
        </div>
      </div>
    </div>`;
  });
};