<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DesignationController;

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

Route::middleware('permission:create-designation')->post("/", [DesignationController::class, 'createSingleDesignation']);

Route::middleware('permission:readAll-designation')->get("/", [DesignationController::class, 'getAllDesignation']);

Route::middleware('permission:readSingle-designation')->get("/{id}", [DesignationController::class, 'getSingleDesignation']);

Route::middleware('permission:update-designation')->put("/{id}", [DesignationController::class, 'updateSingleDesignation']);

Route::middleware('permission:delete-designation')->patch("/{id}", [DesignationController::class, 'deleteSingleDesignation']);
