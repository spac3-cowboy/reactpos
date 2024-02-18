<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;

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

Route::middleware('permission:create-supplier')->post("/", [SupplierController::class, 'createSingleSupplier']);

Route::middleware('permission:readAll-supplier')->get("/", [SupplierController::class, 'getAllSupplier']);

Route::middleware('permission:readAll-supplier')->get("/{id}", [SupplierController::class, 'getSingleSupplier']);

Route::middleware('permission:update-supplier')->put("/{id}", [SupplierController::class, 'updateSingleSupplier']);

Route::middleware('permission:delete-supplier')->patch("/{id}", [SupplierController::class, 'deleteSingleSupplier']);
