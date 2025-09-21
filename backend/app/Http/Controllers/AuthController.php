<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register (Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['access_token' => $token, 'user' => $user]);
    }

    public function login (Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['access_token' => $token, 'user' => $user]);
    }

    public function logout (Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
