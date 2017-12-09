<?php

Git::$repositories['street-vibes'] = [
    'remote' => 'git@github.com:CodeForPhilly/street-vibes.git',
    'originBranch' => 'master',
    'workingBranch' => 'master',
    'trees' => [
        'html-templates',
        'php-classes',
        'php-config',
        'site-root',
        'data-generator'
    ]
];