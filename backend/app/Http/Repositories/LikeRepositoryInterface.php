<?php

namespace App\Http\Repositories;

use App\Models\Like;

interface LikeRepositoryInterface
{
    public function likePost($userId, $postId): Like;
    public function unlikePost($userId, $postId): bool;
    public function isLiked($userId, $postId): bool;
    public function countLikes($postId): int;
}
