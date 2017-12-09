<?php

Git::$repositories['noUiSlider'] = [
    'remote' => 'https://github.com/leongersen/noUiSlider.git',
    'originBranch' => 'master',
    'workingBranch' => 'master',
    'trees' => [
        'site-root/js/nouislider.js' => 'distribute/nouislider.js',
        'site-root/css/nouislider.css' => 'distribute/nouislider.css'
    ]
];