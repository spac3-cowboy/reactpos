<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReturnPurchaseInvoiceController;

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

Route::middleware('permission:create-returnPurchaseInvoice')->post("/", [ReturnPurchaseInvoiceController::class, 'createSingleReturnPurchaseInvoice']);

Route::middleware('permission:readAll-returnPurchaseInvoice')->get("/", [ReturnPurchaseInvoiceController::class, 'getAllReturnPurchaseInvoice']);

Route::middleware('permission:readAll-returnPurchaseInvoice')->get("/{id}", [ReturnPurchaseInvoiceController::class, 'getSingleReturnPurchaseInvoice']);

Route::middleware('permission:delete-returnPurchaseInvoice')->patch("/{id}", [ReturnPurchaseInvoiceController::class, 'deleteSingleReturnPurchaseInvoice']);
