<?php

namespace App\Http\Services;

use App\Models\Post;

interface PostServiceInterface
{
    public function getAll();
    public function getById($id): ?Post;
    public function create(array $data): Post;
    public function update($id, array $data): ?Post;
    public function delete($id): bool;
}
