<?php

use Illuminate\Support\Str;

function arrayKeysToCamelCase($array): array
{
    $result = [];
    foreach ($array as $key => $value) {
        $key = Str::camel($key);
        if (is_array($value)) {
            $value = arrayKeysToCamelCase($value);
        }
        $result[$key] = $value;
    }
    return $result;
}
