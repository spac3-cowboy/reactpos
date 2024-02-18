<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ColorsController;

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

Route::middleware('permission:create-color')->post("/", [ColorsController::class, 'createSingleColors']);

Route::middleware('permission:readAll-color')->get("/", [ColorsController::class, 'getAllColors']);

Route::middleware('permission:readAll-color')->get("/{id}", [ColorsController::class, 'getSingleColors']);

Route::middleware('permission:update-color')->put("/{id}", [ColorsController::class, 'updateSingleColors']);

Route::middleware('permission:delete-color')->patch("/{id}", [ColorsController::class, 'deleteSingleColors']);
