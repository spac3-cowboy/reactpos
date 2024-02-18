<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductColor extends Model
{
    use HasFactory;
    protected $table = 'productColor';
    protected $primaryKey = 'id';
    protected $fillable = [
        'productId',
        'colorId',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'productId');
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Colors::class, 'colorId');
    }
}
