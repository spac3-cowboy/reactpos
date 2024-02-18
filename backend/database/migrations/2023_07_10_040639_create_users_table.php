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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('refreshToken')->nullable();
            $table->string('email')->unique()->nullable();
            $table->integer('salary')->nullable();
            $table->string('idNo')->unique();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('bloodGroup')->nullable();
            $table->string('image')->nullable();

            $table->dateTime('joinDate')->nullable();
            $table->dateTime('leaveDate')->nullable();

            $table->string('status')->default('true');
            $table->unsignedBigInteger('roleId');

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('roleId')->references('id')->on('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
