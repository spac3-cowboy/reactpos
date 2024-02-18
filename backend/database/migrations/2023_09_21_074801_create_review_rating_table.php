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
        Schema::create('reviewRating', function (Blueprint $table) {
            $table->id();
            $table->integer('rating');
            $table->string('review')->nullable();
            $table->unsignedBigInteger('productId')->nullable();
            $table->unsignedBigInteger('customerId');
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key relation constraints
            $table->foreign('productId')->references('id')->on('product');
            $table->foreign('customerId')->references('id')->on('customer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviewRating');
    }
};
