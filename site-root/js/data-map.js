/* global mapboxgl */
/* global noUiSlider */
/* global moment */
/* global $ */

(function () {
    // global state
    var sensorData, sensorDataLength,
        timestamps = [], timestampMin, timestampMax, timestampDelta, timestampsLength,
        timestampsMap = {},
        markerInitialized = false,
        map, slider, marker, popup;


    // Pull sensor data from api
    $.get("http://street-vibes.poplar.phl.io/data-points?format=json").done(function (data) {
        _loadData(data.data);
    });


    // function library
    function _loadData (data) {
        sensorData = data;
        sensorDataLength = data.length;

        // initialize application
        _analyzeData();
        _setupMap();
        _setupSlider();
    }

    function _analyzeData () {
        var i = 0, datum, timestamp;

        for (; i < sensorDataLength; i++) {
            datum = sensorData[i];
            timestamp = datum.Created;
            timestamps.push(timestamp);
            timestampsMap[timestamp] = datum; // WARNING: this will drop any previous value at the same timestamp, not suitable for multiple vehicles
        }

        timestamps = timestamps.sort();
        timestampsLength = timestamps.length;

        timestampMin = timestamps[0];
        timestampMax = timestamps[timestampsLength - 1];
        timestampDelta = timestampMax - timestampMin;

        console.info('analyzed data, min=%o, max=%o, delta=%o, count=%o', timestampMin, timestampMax, timestampDelta, timestampsLength);
    }


    function _setupMap () {
        var markerEl;

        mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmVuYW5jb25hIiwiYSI6ImNqYXp1aXUxNjFreXYzMm1rajhtOXM0dW0ifQ.ZugYWk7x8Ldyaa3ILvx0ZA';

        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/laurenancona/cjazrhzyn59192slbs8zc501n',
            center: [-75.15, 39.95],
            bearing: 9.2, // Rotate Philly ~9° off of north, thanks Billy Penn.
            zoom: 12,
            maxZoom: 19,
            minZoom: 12,
            //pitch: 60,
            attributionControl: true,
            touchRotate: false
        });

        console.info('map initialized:', map);

        popup = new mapboxgl.Popup({offset: 5, anchor: 'top'});
        popup.setText('This is a marker with some data');

        markerEl = document.createElement('div');
        markerEl.className = 'marker-bus';
        marker = new mapboxgl.Marker(markerEl, {offset: [-27.5, -62]});
    }


    function _setupSlider () {
        var sliderRange = {
                min: timestampMin,
                max: timestampMax
            },
            i = 1, timestamp;

        for (; i < timestampsLength - 1; i++) {
            timestamp = timestamps[i];
            sliderRange[(timestamp - timestampMin) / timestampDelta * 100 + '%'] = timestamp;
        }

        slider = document.getElementById('slider');

        noUiSlider.create(slider, {
            start: timestampMax,
            tooltips: {
                to: function (value) {
                    return moment.unix(value).calendar();
                }
            },
            snap: true,
            range: sliderRange,
            pips: {
                mode: 'range',
                density: 1000,
                filter: function (value) {
                    if (value == timestampMin || value == timestampMax) {
                        return 1;
                    }

                    return 0;
                },
                format: {
                    to: function (value) {
                        return moment.unix(value).format('lll');
                    }
                }
            }
        });

        console.info('slider initialized:', slider);

        slider.noUiSlider.on('update', function (values) {
            console.log('slider update', values);
            _loadDatum(timestampsMap[parseInt(values[0])]);
        });
    }


    function _loadDatum (datum) {
        if (!datum) {
            popup.setText('No data available');
            return;
        }

        marker.setLngLat([datum.ReceiverLongitude, datum.ReceiverLatitude]); // TODO: use device location

        if (!markerInitialized) {
            marker.setPopup(popup);
            marker.addTo(map);
            markerInitialized = true;
        }

        popup.setHTML([
            '<dl>',
            '    <dt>Sample Time</dt><dd>'+moment.unix(datum.Created).format('lll')+'</dd>',
            '    <dt>Temperature</dt><dd>'+datum.Temperature+'</dd>',
            '    <dt>Relative Humidity</dt><dd>'+datum.Humidity+'</dd>',
            '    <dt>Particle Concentration</dt><dd>'+datum.Concentration+'</dd>',
            '</dl>'
        ].join(''));
    }
})();