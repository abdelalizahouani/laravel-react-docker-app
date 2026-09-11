<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// ==================== AUTH ====================

Route::get('/user', function (Request $request) {
    $user = $request->user()->load('roles');

    return response()->json([
        'user' => $user,
        'roles' => $user->roles->pluck('name')->values(),
        'permissions' => $user->getAllPermissions()->pluck('name'),
    ]);
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel API'
    ]);
});

Route::get('/admin-test', function () {
    return response()->json([
        'message' => 'You have products.delete permission'
    ]);
})->middleware(['auth:sanctum', 'permission:products.delete']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');


// ==================== PROTECTED ROUTES ====================

Route::middleware('auth:sanctum')->group(function () {


    // ==================== PRODUCTS ====================

    Route::get('/products', [ProductController::class, 'index'])
        ->middleware('permission:products.view');

    Route::get('/products/{product}', [ProductController::class, 'show'])
        ->middleware('permission:products.view');

    Route::post('/products', [ProductController::class, 'store'])
        ->middleware('permission:products.create');

    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->middleware('permission:products.update');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->middleware('permission:products.delete');


    // ==================== USERS ====================

    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:users.view');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:users.create');

    Route::get('/users/{user}', [UserController::class, 'show'])
        ->middleware('permission:users.view');

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:users.update');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:users.delete');


    // ==================== PERMISSIONS ====================

    Route::get('/permissions', [PermissionController::class, 'index'])
        ->middleware('permission:permissions.view');

    Route::post('/permissions', [PermissionController::class, 'store'])
        ->middleware('permission:permissions.create');

    Route::get('/permissions/{permission}', [PermissionController::class, 'show'])
        ->middleware('permission:permissions.view');

    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])
        ->middleware('permission:permissions.update');

    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])
        ->middleware('permission:permissions.delete');


    // ==================== ROLES ====================

    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:roles.view');

    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:roles.create');

    Route::get('/roles/{role}', [RoleController::class, 'show'])
        ->middleware('permission:roles.view');

    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:roles.update');

    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:roles.delete');

    Route::put('/roles/{role}/permissions', [RoleController::class, 'syncPermissions'])
        ->middleware('permission:roles.permissions');

});