<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductCategory extends Model
{
    use HasFactory;
    protected $table = 'productCategory';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];

    public function productSubCategory(): HasMany
    {
        return $this->hasMany(ProductSubCategory::class, 'productCategoryId');
    }
}
