<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailConfigController;


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


Route::middleware('permission:create-emailConfig')->post("/", [EmailConfigController::class, 'createEmailConfig']);

Route::middleware('permission:readAll-emailConfig')->get("/", [EmailConfigController::class, 'getAllEmailConfig']);

Route::middleware('permission:readSingle-emailConfig')->get("/{id}", [EmailConfigController::class, 'getSingleEmailConfig']);

Route::middleware('permission:update-emailConfig')->put("/{id}", [EmailConfigController::class, 'updateEmailConfig']);

Route::middleware('permission:delete-emailConfig')->delete("/{id}", [EmailConfigController::class, 'deleteEmailConfig']);

