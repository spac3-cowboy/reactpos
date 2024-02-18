<?php

use Illuminate\Support\Str;

function takeUptoThreeDecimal($number): float
{
    return (float) number_format((float) $number, 3, '.', '');
}
