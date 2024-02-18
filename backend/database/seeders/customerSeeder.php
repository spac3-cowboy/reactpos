<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class customerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pass = "12345678";
        $password = Hash::make($pass);
        $customer = new Customer();
        $customer->name = 'Doe';
        $customer->email = 'test@gmail.com';
        $customer->password = $password;
        $customer->phone = '1234567890';
        $customer->address = '123 Main St';
        $customer->save();
    }
}
