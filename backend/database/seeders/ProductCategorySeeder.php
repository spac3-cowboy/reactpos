<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productCategory = new ProductCategory();
        $productCategory->name = 'Electronics';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Clothing';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Grocery';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Furniture';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Stationary';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Sports';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Books';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Toys';
        $productCategory->save();

        $productCategory = new ProductCategory();
        $productCategory->name = 'Others';
        $productCategory->save();
    }
}
