<?php

namespace App\Services\Interfaces;

interface LikeServiceInterface
{
    public function like($postId);

    public function unlike($postId);

    public function countLikes($postId);

    public function isLiked($postId);
}
