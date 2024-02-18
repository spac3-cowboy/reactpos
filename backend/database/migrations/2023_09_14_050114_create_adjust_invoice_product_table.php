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
        Schema::create('adjustInvoiceProduct', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('adjustInvoiceId');
            $table->unsignedBigInteger('productId')->nullable();
            $table->integer('adjustQuantity');
            $table->string('adjustType')->nullable();
            $table->timestamps();

            $table->foreign('adjustInvoiceId')->references('id')->on('adjustInvoice');
            $table->foreign('productId')->references('id')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adjustInvoiceProduct');
    }
};
