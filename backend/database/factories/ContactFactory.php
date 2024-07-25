<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['email', 'phone']);

        $nameValues = [
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
        ];

        return [
            'provider_id' => rand(1, 3),
            'type' => $type,
            'name' => $nameValues[$type] ?? fake()->name(),
            'schedule' => fake()->randomElement(['mañana', 'tarde', 'todo el día']),
        ];
    }
}
