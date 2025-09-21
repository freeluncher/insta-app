<?php

namespace App\Repositories;

use App\Models\Like;
use App\Repositories\Interfaces\LikeRepositoryInterface;

class LikeRepository implements LikeRepositoryInterface
{
    public function likePost($userId, $postId): Like
    {
        return Like::firstOrCreate(['user_id' => $userId, 'post_id' => $postId]);
    }

    public function unlikePost($userId, $postId): bool
    {
        return Like::where('user_id', $userId)->where('post_id', $postId)->delete() > 0;
    }

    public function isLiked($userId, $postId): bool
    {
        return Like::where('user_id', $userId)->where('post_id', $postId)->exists();
    }

    public function countLikes($postId): int
    {
        return Like::where('post_id', $postId)->count();
    }
}
