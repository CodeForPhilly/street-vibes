<?php

$dataNode = Site::resolvePath('data-generator/indego-trips-2017-q3.first100.json');

$data = json_decode(file_get_contents($dataNode->RealPath));

JSON::respond($data);