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
        Schema::create('emailConfig', function (Blueprint $table) {
            $table->id();
            $table->string('emailConfigName');
            $table->string('emailHost');
            $table->string('emailPort');
            $table->string('emailUser');
            $table->string('emailPass');
            $table->string('status')->default("true");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emailConfig');
    }
};
