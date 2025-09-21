<?php

namespace App\Http\Controllers;

use App\Services\LikeServiceInterface;
use Illuminate\Http\Request;

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
        $like = $this->likeService->like($postId);
        return response()->json(['success' => true, 'like' => $like]);
    }

    public function destroy($postId)
    {
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
