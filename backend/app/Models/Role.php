<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    //create role model
    protected $table = 'role';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];
    public function rolePermission(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(RolePermission::class, 'roleId');
    }
}
