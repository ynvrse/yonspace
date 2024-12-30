<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $users = [
            [
                'name' => 'Dion Firmasnyah',
                'email' => 'yon@gmail.com',
                'password' => bcrypt('123123123'),
            ],
            [
                'name' => 'Nisrina Sausan',
                'email' => 'nisrina@gmail.com',
                'password' => bcrypt('123123123'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
