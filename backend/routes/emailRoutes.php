<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;


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

Route::middleware('permission:create-email')->post('/',[EmailController::class,'sendEmail']);
Route::middleware('permission:readAll-email')->get('/',[EmailController::class,'getEmails']);
Route::middleware('permission:readSingle-email')->get('/{id}',[EmailController::class,'getSingleEmail']);
Route::middleware('permission:update-email')->delete('/{id}',[EmailController::class,'deleteEmail']);

