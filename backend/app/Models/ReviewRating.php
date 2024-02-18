<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReviewRating extends Model
{
    use HasFactory;
    protected $table = 'reviewRating';
    protected $primaryKey = 'id';
    protected $fillable = [
        'rating',
        'review',
        'productId',
        'customerId',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'productId');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customerId');
    }
}
