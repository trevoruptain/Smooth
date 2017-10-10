const fs = require("fs");
const path = require("path");

const CRIME_RADIUS = 80; // in meters
const processedRoadsExportPath = path.join(
  __dirname,
  "../data/processed/",
  "roads.json"
);

const crimes = require(path.join(
  __dirname,
  "../data/processed/",
  "crimes.json"
)).data;

const roads = require(path.join(__dirname, "../data/raw/", "roads.json"));
const intersections = require(path.join(
  __dirname,
  "../data/processed/",
  "intersections.json"
));

const latToMeters = lat => {
  return 110992.18 * lat;
};

const lngToMeters = lng => {
  return 88101.33 * lng;
};

const distance = (pos1, pos2) => {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
};

const createBounds = (pos1, pos2) => {
  const isInBound = (x, y) => {
    return (
      (x >= Math.min(pos1.x, pos2.x) && y >= Math.min(pos1.y, pos2.y)) &&
      (x <= Math.max(pos1.x, pos2.x) && y <= Math.max(pos1.y, pos2.y))
    );
  };
  return isInBound;
};

roads.slice(0,2).forEach((road, i) => {
  const roadCrimes = [];
  const i1Pos = {
    x: lngToMeters(intersections[road.intersection1_id].location.lng),
    y: latToMeters(intersections[road.intersection1_id].location.lat)
  };
  const i2Pos = {
    x: lngToMeters(intersections[road.intersection2_id].location.lng),
    y: latToMeters(intersections[road.intersection2_id].location.lat)
  };
  const isInBounds = createBounds(i1Pos, i2Pos);

  const m = // slope for intersection 1 to intersection 2
    (i2Pos.y - i1Pos.y) / (i2Pos.x - i1Pos.x);
  const n = -1 / m; // slope for orthogonal line from crime position to road line
  const b_p = -m * i1Pos.x + i1Pos.y; // y-intercept for road line

  crimes.forEach((crime, j) => {
    const crimePos = {
      x: lngToMeters(crime.location.lng),
      y: latToMeters(crime.location.lat)
    };
    const b_c = -n * crimePos.x + crimePos.y;

    const xOrthIntersection = (b_c - b_p) / (m - n);
    const yOrthIntersection = m * xOrthIntersection + b_p;
    const orthIntersectionPos = {x: xOrthIntersection, y: yOrthIntersection};

    if (isInBounds(xOrthIntersection, yOrthIntersection)) {
      if (distance(crimePos, orthIntersectionPos) < CRIME_RADIUS ){
        roadCrimes.push(crime);
      }
    } else {
      const d1 = distance(crimePos, i1Pos);
      const d2 = distance(crimePos, i2Pos);

      if (d1 <= CRIME_RADIUS || d2 <= CRIME_RADIUS) roadCrimes.push(crime);
    }
  });

  roads[i]["crimes"] = roadCrimes;
});

fs.writeFile(processedRoadsExportPath, JSON.stringify(roads), function(
  err
) {
  err ? console.log(err) : console.log("Processed Roads data was sucessfully exported!");
});
