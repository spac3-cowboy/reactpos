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
        Schema::create('rolePermission', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('roleId');
            $table->unsignedBigInteger('permissionId');
            $table->foreign('roleId')->references('id')->on('role');
            $table->foreign('permissionId')->references('id')->on('permission');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rolePermission');
    }
};
