<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;

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

Route::middleware('permission:create-transaction')->post('/', [TransactionController::class, 'createTransaction']);

Route::middleware('permission:readAll-transaction')->get('/', [TransactionController::class, 'getAllTransaction']);

Route::middleware('permission:readSingle-transaction')->get('/{id}', [TransactionController::class, 'getSingleTransaction']);

Route::middleware('permission:update-transaction')->put('/{id}', [TransactionController::class, 'updateSingleTransaction']);

Route::middleware('permission:delete-transaction')->patch('/{id}', [TransactionController::class, 'deleteSingleTransaction']);
