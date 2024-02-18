<?php

namespace Database\Seeders;

use App\Models\ProductVat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productVats = [
            [
                'title' => "standard",
                'percentage' => 15,
            ],
            [
                'title' => "import and supply",
                'percentage' => 15
            ]
        ];

        foreach ($productVats as $item) {
            $productVat = new ProductVat();
            $productVat->title = $item['title'];
            $productVat->percentage = $item['percentage'];
            $productVat->save();
        }
    }
}
