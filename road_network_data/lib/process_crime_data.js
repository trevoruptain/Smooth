const processCrimeData = (rawData, crimeRateMap) => {
  const defaultHeader = Object.keys(rawData.meta.view.columns).map(
    key => rawData.meta.view.columns[key].name
  );

  const crimeRating = "crimeRating";
  const location = "location";
  const filterCols = ["X", "Y"];
  const exportColNamesMap = {
    X: "lat",
    Y: "lng",
    Category: "category"
  };

  const exportData = { meta: { name: "crimes" }, data: [] };

  Object.keys(rawData.data)
    .map(key => rawData.data[key])
    .forEach(dataRow => {
      let dataObj = {};

      let locationObj = {};
      filterCols.forEach(colName => {
        let targetObj;

        switch (colName) {
          case "X":
            targetObj = locationObj;
            break;
          case "Y":
            targetObj = locationObj;
            break;
          default:
            targetObj = dataObj;
        }

        const exportColName = exportColNamesMap[colName]
          ? exportColNamesMap[colName]
          : colName;
        targetObj[exportColName] = dataRow[defaultHeader.indexOf(colName)];
      });
      dataObj[location] = locationObj;
      dataObj[crimeRating] =
        CRIME_RATE_MAP[dataRow[defaultHeader.indexOf("Category")]];
      exportData.data.push(dataObj);
    });

  return exportData;
};

const CRIME_RATE_MAP = {
  WARRANTS: 2,
  BURGLARY: 8,
  "WEAPON LAWS": 9,
  "RECOVERED VEHICLE": 6,
  "LARCENY/THEFT": 8,
  "NON-CRIMINAL": 0,
  "OTHER OFFENSES": 1,
  ASSAULT: 9,
  FRAUD: 1,
  "MISSING PERSON": 9,
  "VEHICLE THEFT": 6,
  "SUSPICIOUS OCC": 3,
  "DISORDERLY CONDUCT": 3,
  TRESPASS: 2,
  "DRUG/NARCOTIC": 5,
  VANDALISM: 5,
  ROBBERY: 9,
  "SECONDARY CODES": 0,
  "DRIVING UNDER THE INFLUENCE": 2,
  "FAMILY OFFENSES": 1,
  DRUNKENNESS: 5,
  RUNAWAY: 0,
  "SEX OFFENSES": 9,
  FORCIBLE: 9,
  "STOLEN PROPERTY": 7,
  "BAD CHECKS": 0,
  ARSON: 2,
  KIDNAPPING: 9,
  "LIQUOR LAWS": 0,
  "FORGERY/COUNTERFEITING": 1,
  EXTORTION: 1,
  PROSTITUTION: 5,
  EMBEZZLEMENT: 0,
  LOITERING: 5,
  "NON FORCIBLE": 0,
  BRIBERY: 1,
  SUICIDE: 0,
  GAMBLING: 0,
  "PORNOGRAPHY/OBSCENE MAT": 3,
  TREA: 5
};

module.exports = {
  processCrimeData: processCrimeData,
  CRIME_RATE_MAP: CRIME_RATE_MAP
};
