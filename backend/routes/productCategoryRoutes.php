<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductCategoryController;

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

Route::middleware('permission:create-productCategory')->post("/", [ProductCategoryController::class, 'createSingleProductCategory']);

Route::middleware('permission:readAll-productCategory')->get("/", [ProductCategoryController::class, 'getAllProductCategory']);

Route::middleware('permission:readAll-productCategory')->get("/{id}", [ProductCategoryController::class, 'getSingleProductCategory']);

Route::middleware('permission:update-productCategory')->put("/{id}", [ProductCategoryController::class, 'updateSingleProductCategory']);

Route::middleware('permission:delete-productCategory')->patch("/{id}", [ProductCategoryController::class, 'deleteSingleProductCategory']);
