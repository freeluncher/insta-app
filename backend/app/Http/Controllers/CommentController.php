<?php

namespace App\Http\Controllers;

use App\Services\CommentServiceInterface;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    protected $commentService;

    public function __construct(CommentServiceInterface $commentService)
    {
        $this->middleware('auth:sanctum');
        $this->commentService = $commentService;
    }

    public function store(Request $request, $postId)
    {
        $validated = $request->validate([
            'content' => 'required|string'
        ]);
        $comment = $this->commentService->add($postId, $validated['content']);
        return response()->json($comment, 201);
    }

    public function index($postId)
    {
        $comments = $this->commentService->list($postId);
        return response()->json($comments);
    }

    public function destroy($commentId)
    {
        $deleted = $this->commentService->delete($commentId);
        if ($deleted) {
            return response()->json(['message' => 'Comment deleted']);
        }
        return response()->json(['message' => 'Not found or unauthorized'], 404);
    }
}
