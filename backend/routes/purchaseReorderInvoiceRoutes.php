<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PurchaseReorderInvoiceController;

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

Route::middleware('permission:create-purchaseReorderInvoice')->post("/", [PurchaseReorderInvoiceController::class, 'createPurchaseReorderInvoice']);

Route::middleware('permission:readAll-purchaseReorderInvoice')->get('/', [PurchaseReorderInvoiceController::class, 'getAllPurchaseReorderInvoice']);

Route::middleware('permission:readSingle-purchaseReorderInvoice')->get('/{reorderInvoiceId}', [PurchaseReorderInvoiceController::class, 'getSinglePurchaseReorderInvoice']);

Route::middleware('permission:delete-purchaseReorderInvoice')->delete('/{reorderInvoiceId}', [PurchaseReorderInvoiceController::class, 'deletePurchaseReorderInvoice']);
