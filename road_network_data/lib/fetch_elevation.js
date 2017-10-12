const keys = require("./key");
const directionsKey = keys.directionsKey;
let fs = require("fs");
let path = require("path");
let nodes = require(path.join(__dirname, "..", "data/raw", "SOME_FILE.json"));

const remaining = path.join(
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
    console.log(node)

    locationsArr.push(`${lat},${long}`);
  });

  const locations = locationsArr.join("|");
  console.log(locations.slice(0, 10))

  const https = require("https");
  https.get(
    `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${directionsKey}`,
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
          fs.appendFile(remaining, rawData, function(err) {
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

// while (nodes.length > 29000) {
//   let nodesSubset = [];
//   while (nodesSubset.length <= 300) {
//     if (nodes.length === 0) {
//       break;
//     }
//     nodesSubset.push(nodes.shift());
//   }
//   callElevationAPI(nodesSubset);
//   nodesSubset = [];
// }
