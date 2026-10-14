<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Pizzas',
                'description' => 'Nos pizzas artisanales',
                'is_active' => true,
            ],
            [
                'name' => 'Burgers',
                'description' => 'Nos burgers maison',
                'is_active' => true,
            ],
            [
                'name' => 'Plats',
                'description' => 'Nos plats principaux',
                'is_active' => true,
            ],
            [
                'name' => 'Desserts',
                'description' => 'Nos desserts',
                'is_active' => true,
            ],
            [
                'name' => 'Boissons',
                'description' => 'Boissons froides et chaudes',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        
    }
}
