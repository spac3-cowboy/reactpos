<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PurchaseInvoiceController;

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

Route::middleware('permission:create-purchaseInvoice')->post("/", [PurchaseInvoiceController::class, 'createSinglePurchaseInvoice']);

Route::middleware('permission:readAll-purchaseInvoice')->get("/", [PurchaseInvoiceController::class, 'getAllPurchaseInvoice']);

Route::middleware('permission:readAll-purchaseInvoice')->get("/{id}", [PurchaseInvoiceController::class, 'getSinglePurchaseInvoice']);
