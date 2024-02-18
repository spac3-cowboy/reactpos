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
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->unsignedBigInteger('debitId');
            $table->unsignedBigInteger('creditId');
            $table->string('particulars');
            $table->double('amount');
            $table->string('type')->nullable();
            $table->integer('relatedId')->nullable();
            $table->string('status')->default("true");
            $table->timestamps();

            $table->foreign('debitId')->references('id')->on('subAccount');
            $table->foreign('creditId')->references('id')->on('subAccount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
