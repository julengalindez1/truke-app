<?php

namespace Database\Seeders;

use App\Models\Format;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class VariantSeeder extends Seeder
{
    private \Illuminate\Database\Eloquent\Collection $products;
    private \Illuminate\Database\Eloquent\Collection $formats;

    /**
     * Construct the seeder with products and formats.
     *
     * @param \Illuminate\Database\Eloquent\Collection $products
     * @param \Illuminate\Database\Eloquent\Collection $formats
     */
    public function __construct(\Illuminate\Database\Eloquent\Collection $products, \Illuminate\Database\Eloquent\Collection $formats)
    {
        $this->products = $products;
        $this->formats = $formats;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->products as $product) {
            $randomFormat = $this->formats->random();

            Variant::factory()->create([
                'product_id' => $product->id,
                'format_id' => $randomFormat->id,
                'pvp' => rand(10, 1000),
            ]);
        }
    }
}
