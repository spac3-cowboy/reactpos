<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubAccount extends Model
{
    use HasFactory;
    protected $table = 'subAccount';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'accountId',
    ];

    public function account(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Account::class, 'accountId');
    }

    public function debit(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Transaction::class, 'debitId');
    }

    public function credit(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Transaction::class, 'creditId');
    }
}
