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
        Schema::create('saleInvoiceProduct', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('productId');
            $table->unsignedBigInteger('invoiceId');
            $table->integer('productQuantity');
            $table->double('productSalePrice');
            $table->timestamps();

            $table->foreign('productId')->references('id')->on('product');
            $table->foreign('invoiceId')->references('id')->on('saleInvoice')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saleInvoiceProduct');
    }
};
