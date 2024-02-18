<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;

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

Route::post('/', [RoleController::class, 'createSingleRole']);
Route::get('/', [RoleController::class, 'getAllRole']);
Route::get('/{id}', [RoleController::class, 'getSingleRole']);
Route::put('/{id}', [RoleController::class, 'updateSingleRole']);
Route::patch('/{id}', [RoleController::class, 'deleteSingleRole']);

