<?php

namespace Database\Seeders;

use App\Models\ProductBrand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Samsung',
            'Apple',
            'Huawei',
            'Xiaomi',
            'Oppo',
            'Dell',
            'HP',
            'Lenovo',
            'Asus',
            'Sony',
            'LG',
            'Panasonic',
            'Philips',
            'Hitachi',
            'Toshiba',
            'Sharp',
        ];

        foreach ($brands as $brand) {
            $productBrand = new ProductBrand();
            $productBrand->name = $brand;
            $productBrand->save();
        }
    }
}
