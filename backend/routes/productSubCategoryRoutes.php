<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductSubCategoryController;

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

Route::middleware('permission:create-productSubCategory')->post("/", [ProductSubCategoryController::class, 'createSingleProductSubCategory']);

Route::middleware('permission:readAll-productSubCategory')->get("/", [ProductSubCategoryController::class, 'getAllProductSubCategory']);

Route::middleware('permission:readAll-productSubCategory')->get("/{id}", [ProductSubCategoryController::class, 'getSingleProductSubCategory']);

Route::middleware('permission:update-productSubCategory')->put("/{id}", [ProductSubCategoryController::class, 'updateSingleProductSubCategory']);

Route::middleware('permission:delete-productSubCategory')->patch("/{id}", [ProductSubCategoryController::class, 'deleteSingleProductSubCategory']);
