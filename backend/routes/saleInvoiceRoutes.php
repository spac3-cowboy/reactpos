<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleInvoiceController;

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

Route::middleware('permission:create-saleInvoice')->post("/", [SaleInvoiceController::class, 'createSingleSaleInvoice']);

Route::middleware('permission:readAll-saleInvoice')->get("/", [SaleInvoiceController::class, 'getAllSaleInvoice']);

Route::middleware('permission:readAll-saleInvoice')->get("/hold", [SaleInvoiceController::class, 'getAllHoldInvoice']);

Route::middleware('permission:readSingle-saleInvoice')->get("/{id}", [SaleInvoiceController::class, 'getSingleSaleInvoice']);

Route::middleware('permission:readSingle-saleInvoice')->get("/hold/{id}", [SaleInvoiceController::class, 'getSingleHold']);

Route::middleware('permission:update-saleInvoice')->put("/hold/{id}", [SaleInvoiceController::class, 'updateHoldInvoice']);

Route::middleware('permission:update-saleInvoice')->patch("/order", [SaleInvoiceController::class, 'updateSaleStatus']);
