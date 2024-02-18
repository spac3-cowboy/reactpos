<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReturnSaleInvoiceController;

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

Route::middleware('permission:create-returnSaleInvoice')->post("/", [ReturnSaleInvoiceController::class, 'createSingleReturnSaleInvoice']);

Route::middleware('permission:readAll-returnSaleInvoice')->get("/", [ReturnSaleInvoiceController::class, 'getAllReturnSaleInvoice']);

Route::middleware('permission:readAll-returnSaleInvoice')->get("/{id}", [ReturnSaleInvoiceController::class, 'getSingleReturnSaleInvoice']);

Route::middleware('permission:delete-returnSaleInvoice')->patch("/{id}", [ReturnSaleInvoiceController::class, 'deleteSingleReturnSaleInvoice']);
