const fs = require('fs');
const path = require('path');
const nodes = require(path.join(
  __dirname,
  "..",
  "data_nodes/raw",
  "nodes.json"
));

let elevations = require(path.join(
  __dirname,
  "..",
  "data_nodes/processed",
  "elevation_cleaned.json"
));
console.log("hell");
elevations.forEach((elevation, i) => {
  // console.log(elevation, i);
  let lat = elevation.location.lat;
  let lng = elevation.location.lng;
  delete elevation.resolution;
  nodes.forEach(node => {
    // console.log(lat, lng);
    // console.log('node', node);
    if (lat.toString() === (node.latitude) && lng.toString() === (node.longitude)) {
      elevations[i]["id"] = node.id;
      // console.log(elevations[i]);
    }
  });
});

const intersections = path.join(
  __dirname,
  "..",
  'data_nodes/processed',
  'intersections.json'
);
console.log("made it");
fs.writeFile(
  intersections,
  JSON.stringify(elevations),
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);
