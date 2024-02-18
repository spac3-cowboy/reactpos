<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SaleInvoiceProduct extends Model
{
    use HasFactory;
    protected $table = 'saleInvoiceProduct';
    protected $primaryKey = 'id';
    protected $fillable = [
        'productId',
        'invoiceId',
        'productQuantity',
        'productSalePrice',
    ];

    public function saleInvoice(): BelongsTo
    {
        return $this->belongsTo(SaleInvoice::class, 'invoiceId');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'productId');
    }
}
