const fs = require("fs");
const path = require("path");
const crimeRoadsUtil = require("./crime_clusters_to_roads_util");

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
const intersectionsById = crimeRoadsUtil.intersectionsById(intersections);

let crimeTotal = 0;

roads.forEach((road, i) => {
  if (i % 10000 === 0) console.log(i);
  const roadCrimes = [];
  let i1Pos;
  let i2Pos;

  try {
    i1Pos = {
      x: crimeRoadsUtil.lngToMeters(
        intersectionsById[road.intersection1_id].location.lng
      ),
      y: crimeRoadsUtil.latToMeters(
        intersectionsById[road.intersection1_id].location.lat
      )
    };
    i2Pos = {
      x: crimeRoadsUtil.lngToMeters(
        intersectionsById[road.intersection2_id].location.lng
      ),
      y: crimeRoadsUtil.latToMeters(
        intersectionsById[road.intersection2_id].location.lat
      )
    };
  } catch (e) {
    // statements to handle any exceptions
    console.log(`error`, road);
    roads[i]["crimes"] = [];
    roads[i]["totalCrimeRating"] = 0;
    return;
  }

  const isInBounds = crimeRoadsUtil.createBounds(i1Pos, i2Pos);

  const m = // slope for intersection 1 to intersection 2
    (i2Pos.y - i1Pos.y) / (i2Pos.x - i1Pos.x);
  const n = -1 / m; // slope for orthogonal line from crime position to road line
  const b_p = -m * i1Pos.x + i1Pos.y; // y-intercept for road line

  crimes.forEach((crime, j) => {
    const crimePos = {
      x: crimeRoadsUtil.lngToMeters(crime.location.lng),
      y: crimeRoadsUtil.latToMeters(crime.location.lat)
    };
    const b_c = -n * crimePos.x + crimePos.y;

    const xOrthIntersection = (b_c - b_p) / (m - n);
    const yOrthIntersection = m * xOrthIntersection + b_p;
    const orthIntersectionPos = { x: xOrthIntersection, y: yOrthIntersection };

    if (isInBounds(xOrthIntersection, yOrthIntersection)) {
      if (
        crimeRoadsUtil.distance(crimePos, orthIntersectionPos) <
        crimeRoadsUtil.CRIME_RADIUS
      ) {
        roadCrimes.push(crime);
      }
    } else {
      const d1 = crimeRoadsUtil.distance(crimePos, i1Pos);
      const d2 = crimeRoadsUtil.distance(crimePos, i2Pos);

      if (
        d1 <= crimeRoadsUtil.CRIME_RADIUS ||
        d2 <= crimeRoadsUtil.CRIME_RADIUS
      )
        roadCrimes.push(crime);
    }
  });

  roads[i]["crimesIds"] = roadCrimes.map(crime => crime.id);
  const crimeRating = crimeRoadsUtil.calcCrimeRating(roadCrimes);
  roads[i]["totalCrimeRating"] = crimeRating;
  if (crimeRating) crimeTotal += crimeRating;
});

fs.writeFile(processedRoadsExportPath, JSON.stringify(roads), function(err) {
  err
    ? console.log(err)
    : console.log("Processed Roads data was sucessfully exported!");
});

console.log(`Average crime rating: ${crimeTotal / roads.length}`);
