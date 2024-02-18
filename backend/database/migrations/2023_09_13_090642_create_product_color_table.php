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
        Schema::create('productColor', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('productId');
            $table->unsignedBigInteger('colorId')->nullable();
            $table->string('status')->default('true');
            $table->timestamps();

            $table->foreign('productId')->references('id')->on('product')->onDelete('cascade');
            $table->foreign('colorId')->references('id')->on('colors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productColor');
    }
};
