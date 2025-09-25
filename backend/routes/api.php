<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Health check endpoint
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Post routes
    Route::get('posts', [PostController::class, 'index']);
    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts/{id}', [PostController::class, 'show']);
    Route::put('posts/{id}', [PostController::class, 'update']);
    Route::delete('posts/{id}', [PostController::class, 'destroy']);

    // Like routes
    Route::post('posts/{postId}/like', [LikeController::class, 'store']);
    Route::delete('posts/{postId}/like', [LikeController::class, 'destroy']);
    Route::get('posts/{postId}/likes/count', [LikeController::class, 'count']);
    Route::get('posts/{postId}/likes/is-liked', [LikeController::class, 'isLiked']);

    // Comment routes
    Route::post('posts/{postId}/comments', [CommentController::class, 'store']);
    Route::get('posts/{postId}/comments', [CommentController::class, 'index']);
    Route::delete('comments/{commentId}', [CommentController::class, 'destroy']);
});
