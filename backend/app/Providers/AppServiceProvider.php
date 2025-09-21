<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Repositories\UserRepositoryInterface;
use App\Http\Repositories\UserRepository;
use App\Http\Services\AuthServiceInterface;
use App\Http\Services\AuthService;
use App\Services\PostServiceInterface;
use App\Services\PostService;
use App\Repositories\LikeRepositoryInterface;
use App\Repositories\LikeRepository;
use App\Services\LikeServiceInterface;
use App\Services\LikeService;
use App\Repositories\CommentRepositoryInterface;
use App\Repositories\CommentRepository;
use App\Services\CommentServiceInterface;
use App\Services\CommentService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(PostRepositoryInterface::class, PostRepository::class);
        $this->app->bind(PostServiceInterface::class, PostService::class);
        $this->app->bind(LikeRepositoryInterface::class, LikeRepository::class);
        $this->app->bind(LikeServiceInterface::class, LikeService::class);
        $this->app->bind(CommentRepositoryInterface::class, CommentRepository::class);
        $this->app->bind(CommentServiceInterface::class, CommentService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
