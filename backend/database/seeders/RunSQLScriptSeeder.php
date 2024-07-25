<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RunSQLScriptSeeder extends Seeder
{
    /**
     * Run database seeds based on sql script.
     */
    public function run()
    {
        $sqlScriptPath = base_path('truke.sql');
        DB::unprepared(file_get_contents($sqlScriptPath));
    }
}
