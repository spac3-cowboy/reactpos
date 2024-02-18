<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cc extends Model
{
    use HasFactory;

    protected $table = 'cc';
    protected $primaryKey = 'id';
    protected $fillable = [
        'emailId',
        'crmEmailId',
        'ccEmail',
        'status',
    ];

    public function email(): BelongsTo
    {
        return $this->belongsTo(Email::class, 'emailId', 'id');
    }

}
