<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReturnSaleInvoice extends Model
{
    use HasFactory;
    protected $table = 'returnSaleInvoice';
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'totalAmount',
        'note',
        'saleInvoiceId',
    ];

    public function saleInvoice(): BelongsTo
    {
        return $this->belongsTo(SaleInvoice::class, 'saleInvoiceId');
    }

    public function returnSaleInvoiceProduct(): HasMany
    {
        return $this->hasMany(ReturnSaleInvoiceProduct::class, 'invoiceId');
    }
}
