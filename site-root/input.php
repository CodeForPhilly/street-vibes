<?php

$data = JSON::getRequestData();


// write full data to log
file_put_contents(Site::$rootPath.'/site-data/input.log', json_encode($data).PHP_EOL, FILE_APPEND);
\Debug::dumpVar($data, false, 'wrote data to log');


// parse payload
$payload = DataPoint::parsePayload($data['DevEUI_uplink']['payload_hex']);


// record data point to database
$DataPoint = DataPoint::create([
    'DeviceAddress' => $data['DevEUI_uplink']['DevAddr'],
    'Payload' => $data['DevEUI_uplink']['payload_hex'],
    'ReceiverLatitude' => $data['DevEUI_uplink']['LrrLAT'],
    'ReceiverLongitude' => $data['DevEUI_uplink']['LrrLON'],
    'DeviceLatitude' => $payload['Latitude'],
    'DeviceLongitude' => $payload['Longitude'],
    'Temperature' => $payload['Temperature'],
    'Humidity' => $payload['Humidity'],
    'Concentration' => $payload['Concentration']
]);

$DataPoint->save();