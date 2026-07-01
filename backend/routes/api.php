<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\MenuController as AdminMenuController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ReservationController as AdminReservationController;

// ===== PUBLIC API =====
Route::get('/menus', [MenuController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);

// Fallback untuk unauthenticated (Sanctum redirect)
Route::get('/login', function () {
    return response()->json([
        'success' => false,
        'message' => 'Unauthenticated. Silakan login terlebih dahulu.'
    ], 401);
})->name('login');

// ===== ADMIN API (with Sanctum auth) =====
Route::prefix('admin')->group(function () {

    // Auth (public)
    Route::post('/login', [AuthController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Categories CRUD
        Route::get('/categories', [AdminCategoryController::class, 'index']);
        Route::post('/categories', [AdminCategoryController::class, 'store']);
        Route::put('/categories/{id}', [AdminCategoryController::class, 'update']);
        Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy']);

        // Menus CRUD
        Route::get('/menus', [AdminMenuController::class, 'index']);
        Route::post('/menus', [AdminMenuController::class, 'store']);
        Route::get('/menus/{id}', [AdminMenuController::class, 'show']);
        Route::put('/menus/{id}', [AdminMenuController::class, 'update']);
        Route::delete('/menus/{id}', [AdminMenuController::class, 'destroy']);

        // Reservations management
        Route::get('/reservations', [AdminReservationController::class, 'index']);
        Route::get('/reservations/{id}', [AdminReservationController::class, 'show']);
        Route::put('/reservations/{id}/status', [AdminReservationController::class, 'updateStatus']);
        Route::delete('/reservations/{id}', [AdminReservationController::class, 'destroy']);
    });
});
