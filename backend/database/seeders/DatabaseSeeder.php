<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $this->call([
            CategorySeeder::class,
        ]);

        $providerSeeder = new ProviderSeeder();
        $providerSeeder->run();
        $this->command->info('Providers seeded successfully.');

        $contactSeeder = new ContactSeeder();
        $contactSeeder->run();
        $this->command->info('Contacts seeded successfully.');

        $formatSeeder = new FormatSeeder();
        $formatSeeder->run();
        $this->command->info('Formats seeded successfully.');

        $productSeeder = new ProductSeeder();
        $productSeeder->run();
        $this->command->info('Products seeded successfully.');

        $variantSeeder = new VariantSeeder($productSeeder->getProducts(), $formatSeeder->getFormats());
        $variantSeeder->run();
        $this->command->info('Variants seeded successfully.');
    }
}
