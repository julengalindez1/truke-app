<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    private \Illuminate\Database\Eloquent\Collection $contacts;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->contacts = Contact::factory(8)->create();
    }

    /**
     * Get the created contacts.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getContacts(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->contacts;
    }
}
