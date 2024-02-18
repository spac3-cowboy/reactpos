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
        Schema::create('saleInvoice', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->double('totalAmount');
            $table->double('discount');
            $table->double('paidAmount');
            $table->double('dueAmount');
            $table->double('profit');
            $table->unsignedBigInteger('customerId');
            $table->unsignedBigInteger('userId');
            $table->string('note')->nullable();
            $table->string('address')->nullable();
            $table->string('orderStatus')->default('pending');
            $table->string('isHold')->default('false');
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key
            $table->foreign('customerId')->references('id')->on('customer')->onDelete('cascade');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saleInvoice');
    }
};
