const keys = require('./key');
const directionsKey = keys.directionsKey;

const https = require('https');
let outsideData = null;

https.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=${directionsKey}`,
    function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        let rawData = "";
        res.on('data', function(chunk) {
            rawData += chunk;
        });
        res.on('end', () => {
            outsideData = rawData;
            // console.log('data', rawData);

        });
    }
);


setTimeout(() => {
    console.log(JSON.parse(outsideData).routes[0].legs);
}, 5000);

