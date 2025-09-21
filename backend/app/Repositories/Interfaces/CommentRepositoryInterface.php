<?php

namespace App\Repositories\Interfaces;

use App\Models\Comment;

interface CommentRepositoryInterface
{
    public function addComment($userId, $postId, $content): Comment;

    public function getComments($postId);

    public function deleteComment($userId, $commentId): bool;
}
