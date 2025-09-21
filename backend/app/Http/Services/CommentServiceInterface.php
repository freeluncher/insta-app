<?php

namespace App\Http\Services;

interface CommentServiceInterface
{
    public function add($postId, $content);
    public function list($postId);
    public function delete($commentId);
}
