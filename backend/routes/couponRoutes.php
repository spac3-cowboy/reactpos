<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CouponController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('permission:create-coupon')->post('/', [CouponController::class, 'createCoupon']);

Route::middleware('permission:readAll-coupon')->get('/', [CouponController::class, 'getAllCoupon']);

Route::middleware('permission:readAll-coupon')->get('/valid', [CouponController::class, 'getAllValidCoupon']);

Route::middleware('permission:readSingle-coupon')->get('/{id}', [CouponController::class, 'getSingleCoupon']);

Route::middleware('permission:update-coupon')->put('/{id}', [CouponController::class, 'updateSingleCoupon']);

Route::middleware('permission:delete-coupon')->patch('/{id}', [CouponController::class, 'deleteCoupon']);
