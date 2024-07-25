<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Format;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Format>
 */
class FormatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $unitMeasures = ['kg', 'gr', 'ml'];
        $names = ['Tarro vidrio', 'Granel', 'Conserva', 'Frutas deshidratadas', 'Congelados'];
        return [
            'name' => $this->faker->randomElement($names),
            'size'=>rand(1,100),
            'weighable'=>rand(1,100),
            'is_divisible'=>rand(0,1),
            //'pvp'=>rand(10,1000),
            'unit_measure' => $this->faker->randomElement($unitMeasures),
        ];
    }
}
