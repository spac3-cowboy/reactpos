<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductVatController;

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

Route::middleware('permission:create-vat')->post("/", [ProductVatController::class, 'createProductVat']);

Route::middleware('permission:readAll-vat')->get("/", [ProductVatController::class, 'getAllProductVat']);

Route::middleware('permission:readAll-vat')->get("/statement", [ProductVatController::class, 'productVatDetails']);

Route::middleware('permission:update-vat')->put("/{id}", [ProductVatController::class, 'updateProductVat']);

Route::middleware('permission:delete-vat')->patch("/{id}", [ProductVatController::class, 'deleteProductVat']);
