<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bcc extends Model
{
    use HasFactory;
    protected $table = 'bcc';
    protected $primaryKey = 'id';
    protected $fillable = [
        'emailId',
        'crmEmailId',
        'bccEmail',
        'status',
    ];

    public function email()
    {
        return $this->belongsTo(Email::class, 'emailId', 'id');
    }

}
