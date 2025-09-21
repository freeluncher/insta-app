<?php

namespace App\Http\Services;

use App\Repositories\CommentRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class CommentService implements CommentServiceInterface
{
    protected $comments;

    public function __construct(CommentRepositoryInterface $comments)
    {
        $this->comments = $comments;
    }

    public function add($postId, $content)
    {
        $userId = Auth::id();
        return $this->comments->addComment($userId, $postId, $content);
    }

    public function list($postId)
    {
        return $this->comments->getComments($postId);
    }

    public function delete($commentId)
    {
        $userId = Auth::id();
        return $this->comments->deleteComment($userId, $commentId);
    }
}
