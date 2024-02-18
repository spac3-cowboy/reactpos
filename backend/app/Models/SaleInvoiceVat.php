<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SaleInvoiceVat extends Model
{
    use HasFactory;
    protected $table = 'saleInvoiceVat';
    protected $primaryKey = 'id';
    protected $fillable = [
        'invoiceId',
        'productVatId',
    ];

    public function saleInvoice(): BelongsTo
    {
        return $this->belongsTo(SaleInvoice::class, 'invoiceId');
    }

    public function productVat(): BelongsTo
    {
        return $this->belongsTo(ProductVat::class, 'productVatId');
    }
}
