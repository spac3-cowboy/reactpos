<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdjustInvoice extends Model
{
    use HasFactory;

    protected $table = 'adjustInvoice';
    protected $primaryKey = 'id';
    protected $fillable = [
        'adjustType',
        'note',
        'date',
        'userId',
    ];

    public function adjustInvoiceProduct(): HasMany
    {
        return $this->hasMany(AdjustInvoiceProduct::class, 'adjustInvoiceId', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'userId', 'id');
    }
}
