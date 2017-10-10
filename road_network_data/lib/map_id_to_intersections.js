const fs = require("fs");
const path = require("path");
const intersectionsPath = require(path.join(
  __dirname,
  "..",
  "data/raw",
  "intersections.json"
));

let elevations = require(path.join(
  __dirname,
  "..",
  "data/intermediate",
  "intersections_with_elevation.json"
));

elevations.forEach((elevation, i) => {
  let lat = elevation.location.lat;
  let lng = elevation.location.lng;
  delete elevation.resolution;
  intersectionsPath.forEach(node => {
    if (lat.toString() === node.latitude && lng.toString() === node.longitude) {
      elevations[i]["id"] = node.id;
    }
  });
});

const intersections = path.join(
  __dirname,
  "..",
  "data/intermediate",
  "intersections.json"
);

fs.writeFile(intersections, JSON.stringify(elevations), function(err) {
  if (err) {
    console.log(err);
  }
});
