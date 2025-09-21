<?php

namespace App\Http\Controllers;

use App\Services\PostServiceInterface;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostServiceInterface $postService)
    {
        $this->middleware('auth:sanctum');
        $this->postService = $postService;
    }

    public function index()
    {
        return response()->json($this->postService->getAll());
    }

    public function show($id)
    {
        $post = $this->postService->getById($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        return response()->json($post);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'caption' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = $this->postService->create($validated);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'caption' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = $this->postService->update($id, $validated);

        if (!$post) {
            return response()->json(['message' => 'Unauthorized or post not found'], 403);
        }

        return response()->json($post);
    }

    public function destroy($id)
    {
        $deleted = $this->postService->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Unauthorized or post not found'], 403);
        }
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
