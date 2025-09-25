<?php

namespace App\Services;

use App\Repositories\Interfaces\LikeRepositoryInterface;
use App\Services\Interfaces\LikeServiceInterface;
use Illuminate\Support\Facades\Auth;

class LikeService implements LikeServiceInterface
{
    protected $likes;

    public function __construct(LikeRepositoryInterface $likes)
    {
        $this->likes = $likes;
    }

    public function like($postId)
    {
        $userId = Auth::id();

        return $this->likes->likePost($userId, $postId);
    }

    public function unlike($postId)
    {
        $userId = Auth::id();

        return $this->likes->unlikePost($userId, $postId);
    }

    public function isLiked($postId): bool
    {
        $userId = Auth::id();

        return $this->likes->isLiked($userId, $postId);
    }

    public function countLikes($postId): int
    {
        return $this->likes->countLikes($postId);
    }
}
