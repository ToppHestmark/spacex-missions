const rocketName = (rocketNameId) => {
  let rocket;
  switch (rocketNameId) {
    case "5e9d0d96eda699382d09d1ee":
      rocket = "Starship";
      break;
    case "5e9d0d95eda69974db09d1ed":
      rocket = "Falcon Heavy";
      break;
    case "5e9d0d95eda69973a809d1ec":
      rocket = "Falcon 9";
      break;
    default:
      rocket = "N/A";
  }
  return rocket;
};
