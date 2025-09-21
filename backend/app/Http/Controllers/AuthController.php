<?php

namespace App\Http\Controllers;
use App\Http\Services\AuthServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $result = $this->authService->register($data);

        return response()->json($result, 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        try {
            $result = $this->authService->login($data['email'], $data['password']);
            return response()->json($result);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 422);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $this->authService->logout($user);

        return response()->json(['message' => 'Successfully logged out']);
    }
}
