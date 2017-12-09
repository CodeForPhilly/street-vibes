<?php

if (empty($_GET['payload'])) {
    die('payload required');
}

\Debug::dumpVar(DataPoint::parsePayload($_GET['payload']));