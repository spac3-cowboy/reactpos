<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuoteController;


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

Route::middleware('permission:create-quote')->post("/", [QuoteController::class, 'createQuote']);

Route::middleware('permission:readAll-quote')->get("/", [QuoteController::class, 'getAllQuote']);

Route::middleware('permission:readSingle-quote')->get("/{id}", [QuoteController::class, 'getSingleQuote']);

Route::middleware('permission:update-quote')->put("/{id}", [QuoteController::class, 'updateQuote']);

Route::middleware('permission:delete-quote')->patch("/{id}", [QuoteController::class, 'deleteQuote']);

