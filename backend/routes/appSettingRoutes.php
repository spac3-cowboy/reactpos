<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AppSettingController;
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

Route::middleware("permission:readAll-setting")->get('/', [AppSettingController::class, 'getSingleAppSetting']);
Route::middleware(["permission:update-setting", 'fileUploader:1'])->put("/", [AppSettingController::class, 'updateAppSetting']);
