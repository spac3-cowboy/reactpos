<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adjustInvoice', function (Blueprint $table) {
            $table->id();
            $table->string('note')->nullable();
            $table->unsignedBigInteger('userId');
            $table->dateTime('date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamps();
        });

        // Add the foreign key
        Schema::table('adjustInvoice', function (Blueprint $table) {
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adjustInvoice');
    }
};
