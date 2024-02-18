<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageSize extends Model
{
    use HasFactory;
    protected $table = 'pageSize';
    protected $primaryKey = 'id';
    protected $fillable = [
        'pageSizeName',
        'width',
        'height',
        'unit',
    ];
}
