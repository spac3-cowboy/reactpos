<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

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

Route::post("/login", [CustomerController::class, 'customerLogin']);

Route::middleware('permission:update-customer')->patch("/reset-password/{id}", [CustomerController::class, 'resetPassword']);

Route::patch("/forgot-password", [CustomerController::class, 'forgotPassword']);

Route::post("/", [CustomerController::class, 'createSingleCustomer']);

Route::middleware('permission:readAll-customer')->get("/", [CustomerController::class, 'getAllCustomer']);

Route::middleware('permission:readSingle-customer')->get("/{id}", [CustomerController::class, 'getSingleCustomer']);

Route::middleware('permission:update-customer')->put("/{id}", [CustomerController::class, 'updateSingleCustomer']);

Route::middleware('permission:delete-customer')->patch("/{id}", [CustomerController::class, 'deleteSingleCustomer']);
