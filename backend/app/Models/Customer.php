<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customer';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'password',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    public function saleInvoice(): HasMany
    {
        return $this->hasMany(SaleInvoice::class, 'customerId');
    }
}
