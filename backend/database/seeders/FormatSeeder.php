<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Format;

class FormatSeeder extends Seeder
{
    private \Illuminate\Database\Eloquent\Collection $formats;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->formats = Format::factory(10)->create();
    }

    /**
     * Get the created formats.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFormats(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->formats;
    }
}
