<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Services\Interfaces\PostServiceInterface;
use Illuminate\Support\Facades\Auth;

class PostService implements PostServiceInterface
{
    protected $posts;

    public function __construct(PostRepositoryInterface $posts)
    {
        $this->posts = $posts;
    }

    public function getAll()
    {
        return $this->posts->getAll();
    }

    public function getById($id): ?Post
    {
        return $this->posts->find($id);
    }

    public function create(array $data): Post
    {
        $data['user_id'] = Auth::id();

        return $this->posts->create($data);
    }

    public function update($id, array $data): ?Post
    {
        $post = $this->posts->find($id);

        if (! $post || $post->user_id != Auth::id()) {
            return null;
        }

        return $this->posts->update($post, $data);
    }

    public function delete($id): bool
    {
        $post = $this->posts->find($id);

        if (! $post || $post->user_id != Auth::id()) {
            return false;
        }

        return $this->posts->delete($post);
    }
}
