<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailConfig extends Model
{
    use HasFactory;
    protected $table = 'emailConfig';
    protected $primaryKey = 'id';
    protected $fillable = [
        'emailConfigName',
        'emailHost',
        'emailPort',
        'emailUser',
        'emailPass',
    ];
}
