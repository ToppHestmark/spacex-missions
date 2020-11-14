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
    const wikipediaLinks = history.links.wikipedia;
    const flightNumber = history.flight_number;

    const flight = () => {
      return flightNumber === null ? 'Not specified' : flightNumber;
    };
    const wikipedia = () => {
      return wikipediaLinks === null ? '' : wikipediaLinks;
    };

    console.log(wikipedia());
  })
}