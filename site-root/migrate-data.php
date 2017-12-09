<?php

die('already run');

$data = DB::allRecords('SELECT * FROM datapoints_new');

foreach ($data AS $datum) {
    $payload = DataPoint::parsePayload($datum['Payload']);

    $DataPoint = DataPoint::create([
        'Created' => $datum['Created'],
        'DeviceAddress' => $datum['DeviceAddress'],
        'Payload' => $datum['Payload'],
        'ReceiverLatitude' => $datum['Latitude'],
        'ReceiverLongitude' => $datum['Longitude'],
        'DeviceLatitude' => $payload['Latitude'],
        'DeviceLongitude' => $payload['Longitude'],
        'Temperature' => $payload['Temperature'],
        'Humidity' => $payload['Humidity'],
        'Concentration' => $payload['Concentration']
    ], true);
}