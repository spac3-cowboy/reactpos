<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SaleInvoice extends Model
{
    use HasFactory;

    protected $table = 'saleInvoice';
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'totalAmount',
        'discount',
        'paidAmount',
        'dueAmount',
        'profit',
        'customerId',
        'userId',
        'isHold'
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customerId');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'userId');
    }

    public function saleInvoiceProduct(): HasMany
    {
        return $this->hasMany(SaleInvoiceProduct::class, 'invoiceId');
    }

    public function returnSaleInvoice(): HasMany
    {
        return $this->hasMany(ReturnSaleInvoice::class, 'saleInvoiceId');
    }

    public function saleInvoiceVat(): HasMany
    {
        return $this->hasMany(SaleInvoiceVat::class, 'invoiceId');
    }
}
