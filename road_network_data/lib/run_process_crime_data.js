// file R/W resources
const fs = require("fs");
const path = require("path");
// crime resources
const processCrimeData = require("./process_crime_data.js");
const rawCrimeData = require(path.join(
  __dirname,
  "../data/raw/",
  "2017_crimes.json"
));
const crimesExportPath = path.join(
  __dirname,
  "../data/processed/",
  "crimes.json"
);

// process crime data and export
const processedCrimeData = processCrimeData.processCrimeData(
  rawCrimeData,
  processCrimeData.CRIME_RATE_MAP
);

fs.writeFile(crimesExportPath, JSON.stringify(processedCrimeData), function(
  err
) {
  err ? console.log(err) : console.log("Crimes data was sucessfully exported!");
});
