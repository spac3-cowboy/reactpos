<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;

    protected $table = 'email';
    protected $primaryKey = 'id';

    protected $fillable = [
        'senderEmail',
        'receiverEmail',
        'subject',
        'body',
        'emailStatus',
    ];


    public function cc()
    {
        return $this->hasMany(Cc::class, 'emailId');
    }

    public function bcc()
    {
        return $this->hasMany(Bcc::class, 'emailId');
    }
}
