<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    private \Illuminate\Database\Eloquent\Collection $products;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->products = Product::factory(10)->create();
    }

    /**
     * Get the created products.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getProducts(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->products;
    }
}
