<?php

namespace Database\Factories;

use App\Models\Format;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Variant>
 */
class VariantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'format_id' => Format::factory(),
            'pvp' => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}
