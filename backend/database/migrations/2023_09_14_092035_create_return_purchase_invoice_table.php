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
        Schema::create('returnPurchaseInvoice', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->double('totalAmount');
            $table->string('note')->nullable();
            $table->unsignedBigInteger('purchaseInvoiceId');
            $table->string('status')->default('true');
            $table->timestamps();

            $table->foreign('purchaseInvoiceId')->references('id')->on('purchaseInvoice');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returnPurchaseInvoice');
    }
};
