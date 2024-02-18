<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolePermission extends Model
{
    use HasFactory;
    protected $table = 'rolePermission';
    protected $primaryKey = 'id';
    protected $fillable = [
        'roleId',
        'permissionId',
    ];

    public function role(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }
    public function permission(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Permission::class, 'permissionId');
    }
}
