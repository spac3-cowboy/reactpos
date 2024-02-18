<?php

namespace Database\Seeders;

use App\Models\ProductSubCategory;
use Illuminate\Database\Seeder;

class ProductSubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Mobile";
        $productSubCategory->productCategoryId = 1;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Laptop";
        $productSubCategory->productCategoryId = 1;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Television";
        $productSubCategory->productCategoryId = 1;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Camera";
        $productSubCategory->productCategoryId = 1;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Headphone";
        $productSubCategory->productCategoryId = 1;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Shirt";
        $productSubCategory->productCategoryId = 2;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Pant";
        $productSubCategory->productCategoryId = 2;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "T-Shirt";
        $productSubCategory->productCategoryId = 2;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Jeans";
        $productSubCategory->productCategoryId = 2;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Shoes";
        $productSubCategory->productCategoryId = 2;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Rice";
        $productSubCategory->productCategoryId = 3;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Oil";
        $productSubCategory->productCategoryId = 3;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Spices";
        $productSubCategory->productCategoryId = 3;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Vegetables";
        $productSubCategory->productCategoryId = 3;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Fruits";
        $productSubCategory->productCategoryId = 3;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Bed";
        $productSubCategory->productCategoryId = 4;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Sofa";
        $productSubCategory->productCategoryId = 4;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Table";
        $productSubCategory->productCategoryId = 4;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Chair";
        $productSubCategory->productCategoryId = 4;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Almirah";
        $productSubCategory->productCategoryId = 4;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Pen";
        $productSubCategory->productCategoryId = 5;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Pencil";
        $productSubCategory->productCategoryId = 5;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Notebook";
        $productSubCategory->productCategoryId = 5;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Paper";
        $productSubCategory->productCategoryId = 5;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Eraser";
        $productSubCategory->productCategoryId = 5;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Bat";
        $productSubCategory->productCategoryId = 6;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Ball";
        $productSubCategory->productCategoryId = 6;
        $productSubCategory->save();

        $productSubCategory = new ProductSubCategory();
        $productSubCategory->name = "Football";
        $productSubCategory->productCategoryId = 6;
        $productSubCategory->save();
    }
}
