{extends designs/site.tpl}

{block title}Data Points &mdash; {$dwoo.parent}{/block}

{block user-tools}{/block}
{block header-bottom}{/block}

{block css}
    {$dwoo.parent}
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.css' rel='stylesheet' />
    {cssmin "nouislider.css+data-map.css" debug=true}
{/block}

{block js-bottom}
    <script src='https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.js'></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
    {jsmin "moment.js+wnumb.js+nouislider.js+data-map.js" debug=true}
{/block}

{block content}
    <header class="page-header">
        <h1 class="header-title title-1">Data Points</h1>
    </header>

    <div id='slider' style='margin-bottom: 50px; margin-top: 60px'></div>
    <div id='map' style='height: 500px;'></div>

    <table class="row-stripes cell-borders">
        <thead>
            <tr>
                <th>Timestamp</th>
                <th>Receiver Location</th>
                <th>Device Address</th>
                <th>Raw Payload</th>
                <th>Device Location</th>
                <th>Temperature</th>
                <th>Relative Humidity</th>
                <th>Particle Concentration</th>
            </tr>
        </thead>

        <tbody>
        {foreach item=DataPoint from=$data}
            <tr>
                <td>{$DataPoint->Created|date_format:'%Y-%m-%d %H:%M:%S'}</td>
                <td>{$DataPoint->ReceiverLatitude},<br> {$DataPoint->ReceiverLongitude}</td>
                <td>{$DataPoint->DeviceAddress}</td>
                <td><code>{$DataPoint->Payload}</code></td>
                <td>{$DataPoint->DeviceLatitude},<br> {$DataPoint->DeviceLongitude}</td>
                <td>{$DataPoint->Temperature}</td>
                <td>{$DataPoint->Humidity}</td>
                <td>{$DataPoint->Concentration}</td>
            </tr>
        {/foreach}
        </tbody>
    </table>
{/block}