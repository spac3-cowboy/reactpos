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
        Schema::create('coupon', function (Blueprint $table) {
            $table->id();
            $table->string('couponCode')->nullable();
            $table->enum('type', ['flat', 'percentage'])->default('percentage');
            $table->double('value');
            $table->dateTime('startDate');
            $table->dateTime('endDate');
            $table->string('status')->default('true');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupon');
    }
};
