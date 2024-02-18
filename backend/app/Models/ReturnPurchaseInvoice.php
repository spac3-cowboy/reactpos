<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReturnPurchaseInvoice extends Model
{
    use HasFactory;
    protected $table = 'returnPurchaseInvoice';
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'totalAmount',
        'note',
        'purchaseInvoiceId',
    ];

    public function purchaseInvoice(): BelongsTo
    {
        return $this->belongsTo(PurchaseInvoice::class, 'purchaseInvoiceId');
    }

    public function returnPurchaseInvoiceProduct(): HasMany
    {
        return $this->hasMany(ReturnPurchaseInvoiceProduct::class, 'invoiceId');
    }
}
