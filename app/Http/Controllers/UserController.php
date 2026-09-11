<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(){
        $users = User::with(['roles.permissions','permissions'])->get();

        $users = $users->map(function($user){
            return[
                'id'=>$user->id,
                'name'=>$user->name,
                'email'=>$user->email,

                'roles'=>$user->roles->pluck('name')->values(),
                'permissions'=>$user->getAllPermissions()
                ->pluck('name')->values(),
            ];
        });
        return response()->json([
            'users'=>$users
        ]);
    }
    public function show(User $user){
        return response()->json([
            'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->roles->pluck('id')->values(),
            'permissions' => $user->getAllPermissions()
            ->pluck('name')
            ->values(),
        ]
    ]);
    }
    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:8',
            'roles'=>'nullable|array',
            'roles.*'=>'integer|exists:roles,id',
        ]);
        $user =User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        if($request->has('roles')){
            $roles = Role::whereIn('id',$request->roles)->get();
            $user->syncRoles($roles);
        }
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->load('roles'),
        ], 201);
    }
    public function update(User $user, Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'roles' => 'nullable|array',
            'roles.*' => 'integer|exists:roles,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $user->update([
                'password' => $request->password,
            ]);
        }

        if ($request->has('roles')) {
            $roles = Role::whereIn('id', $request->roles)->get();

            $user->syncRoles($roles);
        }

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->load('roles'),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
}
