<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseInvoiceProduct extends Model
{
    use HasFactory;
    protected $table = 'purchaseInvoiceProduct';
    protected $primaryKey = 'id';
    protected $fillable = [
        'invoiceId',
        'productId',
        'productQuantity',
        'productPurchasePrice',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(PurchaseInvoice::class, 'invoiceId');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'productId');
    }
}
