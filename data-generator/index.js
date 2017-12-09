const path = require('path');
const fs = require('fs');
const axios = require('axios');
const _ = require('underscore');
const csvReader = new (require('promised-csv'))(true); // true to remove null rows
const csvPath = path.join(__dirname, 'indego-trips-2017-q3.first100.csv');
const jsonPath = path.join(__dirname, 'indego-trips-2017-q3.first100.json');
const geoJsonPath = path.join(__dirname, 'indego-trips-2017-q3.first100.geojson');


(async () => {
    let columnNames = null;

    const csvData = await csvReader.read(csvPath, row => {
        if (!columnNames) {
            columnNames = row;
            return null;
        }

        row = _.object(columnNames, row);
        row.intensity = Math.round(Math.random() * 10);

        if (!row.start_lat || !row.start_lon || !row.end_lat || !row.end_lon) {
            return null;
        }

        return row;
    });


    const features = [];

    for (let row of csvData) {
        const path = encodeURIComponent(`${row.start_lon},${row.start_lat};${row.end_lon},${row.end_lat}`);

        try {
            const directionsResponse = await axios({
                method: 'get',
                url: `https://api.mapbox.com/directions/v5/mapbox/cycling/${path}.json`,
                params: {
                    access_token: 'sk.eyJ1IjoibGF1cmVuYW5jb25hIiwiYSI6ImNqYXpyNTB6ZjFsa2sycXFrZGV0ZDUxZ2YifQ.JsN9vZa366ji8kzprOWUSQ',
                    geometries: 'geojson'
                }
            });

            row.route = directionsResponse.data.routes[0];
            features.push({
                type: 'Feature',
                geometry: row.route.geometry
            });
        } catch (err) {
            debugger;
        }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(csvData));
    fs.writeFileSync(geoJsonPath, JSON.stringify({
        type: 'FeatureCollection',
        features: features
    }));

    console.log('done, wrote %o rows to %o', csvData.length, jsonPath);
})();