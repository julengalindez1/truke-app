<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Frutas', 'Verduras', 'Legumbres', 'Cereales', 'Lácteos'];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
