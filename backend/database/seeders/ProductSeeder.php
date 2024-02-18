<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => "Samsung Galaxy S21 Ultra 5G",
                'productThumbnailImage' => "https://www.gizmochina.com/wp-content/uploads/2021/01/Samsung-Galaxy-S21-Ultra-5G-1.jpg",
                'productSubCategoryId' => 1,
                'productBrandId' => 1,
                'description' => "Samsung Galaxy S21 Ultra 5G",
                'sku' => "123-433-365",
                'productQuantity' => 10,
                'productSalePrice' => 1000,
                'productPurchasePrice' => 900,
                'unitType' => "Piece",
                'unitMeasurement' => 1,
                'reorderQuantity' => 5,
                'productVat' => 10,
            ],
            [
                'name' => "apple iphone 12 pro max",
                'productThumbnailImage' => "https://www.gizmochina.com/wp-content/uploads/2021/apple-iphone-12-pro-max-1.jpg",
                'productSubCategoryId' => 1,
                'productBrandId' => 2,
                'description' => "apple iphone 12 pro max",
                'sku' => "123-953-365",
                'productQuantity' => 10,
                'productSalePrice' => 1000,
                'productPurchasePrice' => 900,
                'unitType' => "Piece",
                'unitMeasurement' => 1,
                'reorderQuantity' => 5,
                'productVat' => 10,
            ],
        ];

        foreach ($products as $item) {
            $product = new Product();
            $product->name = $item['name'];
            $product->productThumbnailImage = $item['productThumbnailImage'];
            $product->productSubCategoryId = $item['productSubCategoryId'];
            $product->productBrandId = $item['productBrandId'];
            $product->description = $item['description'];
            $product->sku = $item['sku'];
            $product->productQuantity = $item['productQuantity'];
            $product->productSalePrice = $item['productSalePrice'];
            $product->productPurchasePrice = $item['productPurchasePrice'];
            $product->unitType = $item['unitType'];
            $product->unitMeasurement = $item['unitMeasurement'];
            $product->reorderQuantity = $item['reorderQuantity'];
            $product->productVat = $item['productVat'];
            $product->save();
        }
    }
}
