<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(){
        $permissions = Permission::all();
        return response()->json([
            'permissions'=>$permissions
        ]);
    }
    public function show(Permission $permission)
    {
        return response()->json([
            'permission' => $permission
        ]);
    }
    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|unique:permissions,name'
        ]);

        $permissions = Permission::create([
            'name'=>$request->name,
            'guard_name'=>'web'
        ]);

        return response()->json([
            'message'=>'Permission created successfully',
            'permission'=>$permissions
        ],201);
    }

    public function update(Request $request, Permission $permission){
        $request->validate([
            'name'=>'required','string',Rule::unique('permissions','name')->ignore($permission->id),
        ]);

        $permission->update([
            'name'=>$request->name,
        ]);

        return response()->json([
            'message'=>'Permission updated successfully',
            'permission' => $permission
        ]);
    }

    public function destroy(Permission $permission){
        $permission->delete();
        return response()->json([
            'message'=>'Permission deleted successfully',
            //'permission'=>$permission
        ]);
    }    
}
