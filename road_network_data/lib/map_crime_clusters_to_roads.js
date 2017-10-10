const fs = require("fs");
const path = require("path");

const CRIME_RADIUS = 100; // in meters

const crimes = require(path.join(
  __dirname,
  "../data/processed/",
  "crimes.json"
));
const roads = require(path.join(__dirname, "../data/processed/", "roads.json"));
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

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
