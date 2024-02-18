<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductBrand extends Model
{
    use HasFactory;

    protected $table = 'productBrand';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];

    public function product(): HasMany
    {
        return $this->hasMany(Product::class, 'productBrandId');
    }
}
