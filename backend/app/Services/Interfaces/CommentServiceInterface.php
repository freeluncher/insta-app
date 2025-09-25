<?php

namespace App\Services\Interfaces;

interface CommentServiceInterface
{
    public function add($postId, $content);

    public function list($postId);

    public function delete($commentId);
}
