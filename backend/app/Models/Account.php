<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    protected $table = 'account';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'type',
    ];

    public function subAccount(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SubAccount::class, 'accountId');
    }
}
