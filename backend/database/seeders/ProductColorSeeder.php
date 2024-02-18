<?php

namespace Database\Seeders;

use App\Models\ProductColor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productColors = [
            [
                'productId' => 1,
                'colorId' => 1,
            ],
            [
                'productId' => 1,
                'colorId' => 2,
            ],
            [
                'productId' => 1,
                'colorId' => 3,
            ],
            [
                'productId' => 1,
                'colorId' => 4,
            ],
            [
                'productId' => 1,
                'colorId' => 5,
            ],
            [
                'productId' => 2,
                'colorId' => 1,
            ],
            [
                'productId' => 2,
                'colorId' => 2,
            ],
            [
                'productId' => 2,
                'colorId' => 3,
            ],
            [
                'productId' => 2,
                'colorId' => 4,
            ],
            [
                'productId' => 2,
                'colorId' => 5,
            ],
        ];

        foreach ($productColors as $item) {
            $productColor = new ProductColor();
            $productColor->productId = $item['productId'];
            $productColor->colorId = $item['colorId'];
            $productColor->save();
        }
    }
}
