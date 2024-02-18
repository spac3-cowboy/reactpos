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
        Schema::create('productSubCategory', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedBigInteger('productCategoryId')->nullable();
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key constraint
            $table->foreign('productCategoryId')->references('id')->on('productCategory');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productSubCategory');
    }
};
