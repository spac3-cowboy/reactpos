<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVat extends Model
{
    use HasFactory;
    protected $table = 'productVat';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'percentage',
        'status',
    ];
}
