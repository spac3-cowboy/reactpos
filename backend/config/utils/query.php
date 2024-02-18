<?php

define('DEFAULT_PAGE', 1);
define('DEFAULT_PAGE_LIMIT', 10);

function getPagination($query): array
{
    $page = abs($query['page']) ?: DEFAULT_PAGE;
    $limit = abs($query['count']) ?: DEFAULT_PAGE_LIMIT;
    $skip = ($page - 1) * $limit;

    return [
        'skip' => $skip,
        'limit' => $limit
    ];
}

return [
    'getPagination' => 'getPagination'
];
