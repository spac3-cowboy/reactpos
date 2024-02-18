<?php


use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AccountController;

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
//Route::middleware('ip')->group(function () {
    Route::middleware('permission:create-transaction')->post('/', [AccountController::class, 'createSubAccount']);
    Route::middleware('permission:readAll-transaction')->get('/', [AccountController::class, 'getAllAccount']);
    Route::middleware('permission:readSingle-transaction')->get('/{id}', [AccountController::class, 'getSingleAccount']);
    Route::middleware('permission:update-transaction')->put('/{id}', [AccountController::class, 'updateSubAccount']);
    Route::middleware('permission:delete-transaction')->patch('/{id}', [AccountController::class, 'deleteSubAccount']);
//});
