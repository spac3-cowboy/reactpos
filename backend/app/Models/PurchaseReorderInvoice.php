<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseReorderInvoice extends Model
{
    use HasFactory;
    protected $table = 'purchaseReorderInvoice';
    protected $fillable = [
        'reorderInvoiceId',
        'productId',
        'productQuantity',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'productId');
    }
}
