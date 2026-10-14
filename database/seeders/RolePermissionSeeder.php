<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // ==================== PERMISSIONS ====================

        $permissions = [

            // Products
            'products.view',
            'products.create',
            'products.update',
            'products.delete',

            // Users
            'users.view',
            'users.create',
            'users.update',
            'users.delete',

            // Permissions
            'permissions.view',
            'permissions.create',
            'permissions.update',
            'permissions.delete',

            // Roles
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            'roles.permissions',

            //category
            'categories.view',
            'categories.create',
            'categories.update',
            'categories.delete',

            //dishes
            'dishes.view',
            'dishes.create',
            'dishes.update',
            'dishes.delete',

            //orders
            'orders.view',
            'orders.create',
            'orders.update',
            'orders.show',
            'orders.delete'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }


        // ==================== ROLES ====================

        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $manager = Role::firstOrCreate([
            'name' => 'manager',
            'guard_name' => 'web',
        ]);

        $user = Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'web',
        ]);


        // ==================== ADMIN ====================

        $admin->syncPermissions([
            'products.view',
            'products.create',
            'products.update',
            'products.delete',

            'users.view',
            'users.create',
            'users.update',
            'users.delete',

            'permissions.view',
            'permissions.create',
            'permissions.update',
            'permissions.delete',

            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            'roles.permissions',

            //category
            'categories.view',
            'categories.create',
            'categories.update',
            'categories.delete',
            
            //dishes
            'dishes.view',
            'dishes.create',
            'dishes.update',
            'dishes.delete',

            //orders
            'orders.view',
            'orders.create',
            'orders.update',
            'orders.show',
            'orders.delete'
        ]);


        // ==================== MANAGER ====================

        $manager->syncPermissions([
            'products.view',
            'products.create',
            'products.update',

            'users.view',
            'users.create',
            'users.update',

            'permissions.view',

            'roles.view',
            'roles.create',
            'roles.permissions',
        ]);


        // ==================== USER ====================

        $user->syncPermissions([
            'products.view',
            'users.view',
            'orders.view',
        ]);
    }
}