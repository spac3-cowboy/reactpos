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
        Schema::create('returnSaleInvoiceProduct', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoiceId');
            $table->unsignedBigInteger('productId')->nullable();
            $table->integer('productQuantity');
            $table->double('productSalePrice');
            $table->timestamps();

            // foreign key relation constraints
            $table->foreign('invoiceId')->references('id')->on('returnSaleInvoice')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('productId')->references('id')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returnSaleInvoiceProduct');
    }
};
