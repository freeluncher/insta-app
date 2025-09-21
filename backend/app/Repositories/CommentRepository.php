<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\Interfaces\CommentRepositoryInterface;

class CommentRepository implements CommentRepositoryInterface
{
    public function addComment($userId, $postId, $content): Comment
    {
        return Comment::create([
            'user_id' => $userId,
            'post_id' => $postId,
            'content' => $content,
        ]);
    }

    public function getComments($postId)
    {
        return Comment::with('user')->where('post_id', $postId)->orderBy('created_at', 'asc')->get();
    }

    public function deleteComment($userId, $commentId): bool
    {
        $comment = Comment::where('id', $commentId)->where('user_id', $userId)->first();
        if ($comment) {
            return $comment->delete();
        }

        return false;
    }
}
