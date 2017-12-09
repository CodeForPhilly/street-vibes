# StreetVibes

A demo application from the [HackIoT 2017 hackathon](https://hackiot17.devpost.com/).

- Demo application: [http://streetvib.es](http://streetvib.es)
- Demo presentation: [https://docs.google.com/presentation/d/1oSIVRClkX8BQmC-A7IJldQexNCsobIn1zikJvwvIpdU/edit?usp=sharing](https://docs.google.com/presentation/d/1oSIVRClkX8BQmC-A7IJldQexNCsobIn1zikJvwvIpdU/edit?usp=sharing)

## Interesting files

- [`data-generator/indego-trips-2017-q3.csv`](data-generator/indego-trips-2017-q3.csv): **All** 2017-Q3 indego trips
- [`data-generator/indego-trips-2017-q3.first100.csv`](data-generator/indego-trips-2017-q3.first100.csv): **First 100** 2017-Q3 indego trips
- [`data-generator/index.js`](data-generator/index.js): Tool to generate GeoJSON by combining first 100 trips with mapbox-provided cycling routes between the start/end stations
- [`data-generator/indego-trips-2017-q3.first100.geojson`](data-generator/indego-trips-2017-q3.first100.geojson): **First 100** 2017-Q3 indego trips in GeoJSON with calculated routes
- [`site-root/js/data-map.js`](site-root/js/data-map.js): Mapbox UI for browsing GeoJSON