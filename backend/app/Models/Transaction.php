<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $table = 'transaction';
    protected $primaryKey = 'id';

    protected $fillable = [
        'date',
        'debitId',
        'creditId',
        'particulars',
        'amount',
        'type',
        'relatedId',
        'status',
    ];

    public function debit()
    {
        return $this->belongsTo(SubAccount::class, 'debitId');
    }
    public function credit()
    {
        return $this->belongsTo(SubAccount::class, 'creditId');
    }
}
