<?php

namespace App\Http\Repositories;

use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{
    public function all()
    {
        return Post::with('user')->latest()->paginate(10);
    }

    public function find($id): ?Post
    {
        return Post::find($id);
    }

    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function update(Post $post, array $data): Post
    {
        $post->update($data);
        return $post;
    }

    public function delete(Post $post): bool
    {
        return $post->delete();
    }
}
