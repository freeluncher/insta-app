<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\Interfaces\LikeServiceInterface;

class LikeController extends Controller
{
    protected $likeService;

    public function __construct(LikeServiceInterface $likeService)
    {
        $this->middleware('auth:sanctum');
        $this->likeService = $likeService;
    }

    public function store($postId)
    {
        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $this->authorize('like', $post);

        $like = $this->likeService->like($postId);

        return response()->json(['success' => true, 'like' => $like]);
    }

    public function destroy($postId)
    {
        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $this->authorize('like', $post);

        $deleted = $this->likeService->unlike($postId);

        return response()->json(['success' => $deleted]);
    }

    public function count($postId)
    {
        $count = $this->likeService->countLikes($postId);

        return response()->json(['count' => $count]);
    }

    public function isLiked($postId)
    {
        $isLiked = $this->likeService->isLiked($postId);

        return response()->json(['liked' => $isLiked]);
    }
}
