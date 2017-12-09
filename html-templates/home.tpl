{extends designs/site.tpl}

{block title}Indego Trips &mdash; {$dwoo.parent}{/block}

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
        <h1 class="header-title title-1">Indego Trips</h1>
    </header>

    <div id='slider' style='margin-bottom: 50px; margin-top: 60px'></div>
    <div id='map' style='height: 500px;'></div>
{/block}