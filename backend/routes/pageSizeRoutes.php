<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageSizeController;


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

Route::middleware('permission:create-pageSize')->post('/',[PageSizeController::class,'createPageSize']);
Route::middleware('permission:readAll-pageSize')->get('/',[PageSizeController::class,'getAllPageSizes']);
Route::middleware('permission:readSingle-pageSize')->get('/{id}',[PageSizeController::class,'getSinglePageSize']);
Route::middleware('permission:update-pageSize')->put('/{id}',[PageSizeController::class,'updatePageSize']);
Route::middleware('permission:delete-pageSize')->patch('/{id}',[PageSizeController::class,'deletePageSize']);
