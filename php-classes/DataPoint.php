<?php

class DataPoint extends ActiveRecord
{
    public static $tableName = 'datapoints';
    public static $singularNoun = 'data point';
    public static $pluralNoun = 'data points';

    public static $fields = [
        'DeviceAddress' => [
            'type' => 'string',
            'index' => true
        ],
        'Payload' => [
            'type' => 'string'
        ],
        'ReceiverLatitude' => [
            'type' => 'decimal',
            'length' => '10,8'
        ],
        'ReceiverLongitude' => [
            'type' => 'decimal',
            'length' => '11,8'
        ],
        'DeviceLatitude' => [
            'type' => 'decimal',
            'length' => '10,8'
        ],
        'DeviceLongitude' => [
            'type' => 'decimal',
            'length' => '11,8'
        ],
        'Temperature' => [
            'type' => 'decimal',
            'length' => '3,1'
        ],
        'Humidity' => [
            'type' => 'decimal',
            'length' => '3,1'
        ],
        'Concentration' => [
            'type' => 'decimal',
            'length' => '3,2'
        ]
    ];

    public static function parsePayload($payload)
    {
        $format = substr($payload, 0, 2);
        $data = [];

        switch ($format) {
            case '04':
                list($temperature, $humidity, $concentration, $latitude, $longitude) = sscanf($payload, '04%2x%2x%4x%6x%6x');

                $data['Temperature'] = $temperature;
                $data['Humidity'] = $humidity / 2;
                $data['Concentration'] = $concentration / 100;
                $data['Latitude'] = $latitude / 10000;
                $data['Longitude'] = static::smartbindec(decbin($longitude)) / 10000;
                break;

            default:
                throw new Exception('invalid payload format: '.$format);
        }

        return $data;
    }

    protected static function twoscomp($bin)
    {
        $out = '';
        $mode = 'init';

        for ($x = strlen($bin)-1; $x >= 0; $x--) {
            if ($mode != 'init') {
                $out = ($bin[$x] == '0' ? '1' : '0').$out;
            } else {
                if ($bin[$x] == '1') {
                    $out = '1'.$out;
                    $mode = 'invert';
                } else {
                    $out = '0'.$out;
                }
            }
        }

        return $out;
    }

    protected static function smartbindec($bin)
    {
        if ($bin[0] == 1) {
            return -1 * bindec(static::twoscomp($bin));
        } else {
            return (int) bindec($bin);
        }
    }
}