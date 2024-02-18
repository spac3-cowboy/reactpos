<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdjustInventoryController;

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

Route::middleware('permission:create-adjust')->post("/", [AdjustInventoryController::class, 'createAdjustInventory']);
Route::middleware('permission:readAll-adjust')->get("/", [AdjustInventoryController::class, 'getAllAdjustInvoices']);
Route::middleware('permission:readSingle-adjust')->get("/{id}", [AdjustInventoryController::class, 'getSingleAdjustInvoice']);
