<?php

namespace App\Http\Services;

interface LikeServiceInterface
{
    public function like($postId);
    public function unlike($postId);
    public function isLiked($postId): bool;
    public function countLikes($postId): int;
}
