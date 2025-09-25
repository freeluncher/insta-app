<?php

namespace App\Services\Interfaces;

use App\Models\User;

interface AuthServiceInterface
{
    public function register(array $data): array;

    public function login(string $email, string $password): array;

    public function logout(User $user): void;
}
