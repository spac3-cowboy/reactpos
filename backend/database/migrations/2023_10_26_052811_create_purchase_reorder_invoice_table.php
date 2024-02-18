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
        Schema::create('purchaseReorderInvoice', function (Blueprint $table) {
            $table->id();
            $table->string('reorderInvoiceId');
            $table->unsignedBigInteger('productId');
            $table->integer('productQuantity');
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key constraints
            $table->foreign('productId')->references('id')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchaseReorderInvoice');
    }
};
