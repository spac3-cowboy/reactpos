<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quote extends Model
{
    use HasFactory;

    protected $table = 'quote';
    protected $primaryKey = 'id';
    protected $fillable = [
        'quoteOwnerId',
        'quoteName',
        'quoteDate',
        'expirationDate',
        'quoteStageId',
        'termsAndConditions',
        'description',
        'discount',
        'totalAmount',
    ];

    public function quoteOwner(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'quoteOwnerId');
    }

    // public function quoteStage():BelongsTo
    // {
    //     return $this->belongsTo(QuoteStage::class, 'quoteStageId');
    // }

    public function quoteProduct():HasMany
    {
        return $this->hasMany(QuoteProduct::class, 'quoteId');
    }

}
