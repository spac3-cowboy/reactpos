<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\RefreshTokenController;

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

Route::post('/login', [UsersController::class, 'login']);
Route::post('/register', [UsersController::class, 'register']);
//refresh token routes
Route::get('/refresh-token', [RefreshTokenController::class, 'validationRefreshToken']);

Route::middleware("permission:readAll-user")->get('/', [UsersController::class, 'getAllUser']);
Route::middleware("permission:readSingle-user")->get('/{id}', [UsersController::class, 'getSingleUser']);
Route::middleware("permission:update-user")->put("/{id}", [UsersController::class, 'updateSingleUser']);
Route::middleware("permission:delete-user")->patch("/{id}", [UsersController::class, 'deleteUser']);


