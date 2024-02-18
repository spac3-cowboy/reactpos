<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseInvoice extends Model
{
    use HasFactory;
    protected $table = 'purchaseInvoice';
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'totalAmount',
        'discount',
        'paidAmount',
        'dueAmount',
        'supplierId',
        'note',
        'supplierMemoNo',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplierId');
    }

    public function returnPurchaseInvoice(): HasMany
    {
        return $this->hasMany(ReturnPurchaseInvoice::class, 'purchaseInvoiceId');
    }

    public function purchaseInvoiceProduct(): HasMany
    {
        return $this->hasMany(PurchaseInvoiceProduct::class, 'invoiceId');
    }
}
