<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'name' => "Samsung",
                'phone' => "0518162516",
                'address' => "Dhaka",
            ],
            [
                'name' => "Apple",
                'phone' => "0618222516",
                'address' => "Dhaka",
            ],
            [
                'name' => "Xiaomi",
                'phone' => "0188162516",
                'address' => "Dhaka",
            ],
        ];

        foreach ($suppliers as $item) {
            $supplier = new Supplier();
            $supplier->name = $item['name'];
            $supplier->phone = $item['phone'];
            $supplier->address = $item['address'];
            $supplier->save();
        }
    }
}
