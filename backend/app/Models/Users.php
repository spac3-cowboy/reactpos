<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Users extends Model
{
    use HasFactory;

    //create user model
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $hidden = ['refreshToken'];
    protected $fillable = [
        'username',
        'password',
        'email',
        'refreshToken',
        'salary',
        'idNo',
        'phone',
        'address',
        'bloodGroup',
        'image',
        'joinDate',
        'leaveDate',
        'roleId',
        'designationId',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    public function designation(): BelongsTo
    {
        return $this->belongsTo(Designation::class, 'designationId');
    }

    public function saleInvoice(): HasMany
    {
        return $this->hasMany(SaleInvoice::class, 'userId');
    }

    public function adjustment(): HasMany
    {
        return $this->hasMany(AdjustInvoice::class, 'userId');
    }

    //usercouponusage
    public function userCouponUsage(): HasMany
    {
        return $this->hasMany(UserCouponUsage::class, 'userId');
    }
    public function qoute(): HasMany
    {
        return $this->hasMany(Quote::class, 'quoteOwnerId');
    }
}
