<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentPurchaseInvoiceController;

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

Route::middleware('permission:create-paymentPurchaseInvoice')->post("/", [PaymentPurchaseInvoiceController::class, 'createPaymentPurchaseInvoice']);

Route::middleware('permission:readAll-paymentPurchaseInvoice')->get("/", [PaymentPurchaseInvoiceController::class, 'getAllPaymentPurchaseInvoice']);
