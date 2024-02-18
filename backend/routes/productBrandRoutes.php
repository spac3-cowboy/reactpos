<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductBrandController;

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

Route::middleware('permission:create-productBrand')->post("/", [ProductBrandController::class, 'createSingleProductBrand']);

Route::middleware('permission:readAll-productBrand')->get("/", [ProductBrandController::class, 'getAllProductBrand']);

Route::middleware('permission:readAll-productBrand')->get("/{id}", [ProductBrandController::class, 'getSingleProductBrand']);

Route::middleware('permission:update-productBrand')->put("/{id}", [ProductBrandController::class, 'updateSingleProductBrand']);

Route::middleware('permission:delete-productBrand')->patch("/{id}", [ProductBrandController::class, 'deleteSingleProductBrand']);
