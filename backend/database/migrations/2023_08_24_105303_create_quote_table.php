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
        Schema::create('quote', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quoteOwnerId');
            $table->string('quoteName');
            $table->dateTime('quoteDate')->nullable();
            $table->dateTime('expirationDate')->nullable();
            $table->longText('termsAndConditions')->nullable();
            $table->longText('description')->nullable();
            $table->float('discount')->nullable();
            $table->float('totalAmount')->nullable();
            $table->string('status')->default("true");
            $table->timestamps();

            $table->foreign('quoteOwnerId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote');
    }
};