<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'productThumbnailImage',
        'productSubCategoryId',
        'productBrandId',
        'description',
        'sku',
        'productQuantity',
        'productSalePrice',
        'productPurchasePrice',
        'unitType',
        'unitMeasurement',
        'reorderQuantity',
        'productVat',
    ];

    public function productSubCategory(): BelongsTo
    {
        return $this->belongsTo(ProductSubCategory::class, 'productSubCategoryId');
    }

    public function productBrand(): BelongsTo
    {
        return $this->belongsTo(ProductBrand::class, 'productBrandId');
    }

    public function productColor(): HasMany
    {
        return $this->hasMany(ProductColor::class, 'productId');
    }

    public function reviewRating(): HasMany
    {
        return $this->hasMany(ReviewRating::class, 'productId');
    }
}
