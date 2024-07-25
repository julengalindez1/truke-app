<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Provider;

class ProviderSeeder extends Seeder
{
    private \Illuminate\Database\Eloquent\Collection $providers;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->providers = Provider::factory(3)->create();
    }

    /**
     * Get the created providers.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getProviders(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->providers;
    }
}
