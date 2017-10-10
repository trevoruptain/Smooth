const key = require("./key");
let fs = require("fs");
let path = require("path");
let nodes = require(path.join(__dirname, "..", "data", "nodes.json"));

const intersectionsPath = path.join(
  __dirname,
  "..",
  "data/processed",
  "intersections.json"
);

const callElevationAPI = function(nodes) {
  const locationsArr = [];
  nodes.forEach(function(node) {
    // const id = node.id;
    const lat = node.latitude;
    const long = node.longitude;

    locationsArr.push(`${lat},${long}`);
  });

  const locations = locationsArr.join("|");

  const https = require("https");
  https.get(
    `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${key}`,
    function(res) {
      // console.log("STATUS: " + res.statusCode);
      // console.log("HEADERS: " + JSON.stringify(res.headers));
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", chunk => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          fs.appendFile(intersectionsPath, rawData, function(err) {
            if (err) {
              console.log(err);
            }
          });
        } catch (e) {
          console.log(e.message);
        }
      });
    }
  );
};

while (nodes.length > 29000) {
  let nodesSubset = [];
  while (nodesSubset.length <= 300) {
    if (nodes.length === 0) {
      break;
    }
    nodesSubset.push(nodes.shift());
  }
  callElevationAPI(nodesSubset);
  nodesSubset = [];
}
