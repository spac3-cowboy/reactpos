<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('productThumbnailImage')->nullable();
            $table->unsignedBigInteger('productSubCategoryId')->nullable();
            $table->unsignedBigInteger('productBrandId')->nullable();
            $table->string('description')->nullable();
            $table->string('sku')->nullable()->unique();
            $table->integer('productQuantity');
            $table->double('productSalePrice');
            $table->double('productPurchasePrice');

            $table->string('unitType')->nullable();
            $table->double('unitMeasurement')->nullable();
            $table->integer('reorderQuantity')->nullable();
            $table->double('productVat')->nullable();

            $table->string('status')->default('true');
            $table->timestamps();

            $table->foreign('productSubCategoryId')->references('id')->on('productSubCategory');
            $table->foreign('productBrandId')->references('id')->on('productBrand');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
