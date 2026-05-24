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
        Schema::create('payments', function (Blueprint $table) {

            $table->id();

            // User who made payment
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Event paid for
            $table->foreignId('event_id')
                ->constrained()
                ->onDelete('cascade');

            // Razorpay payment id
            $table->string('payment_id');

            // Amount paid
            $table->decimal(
                'amount',
                10,
                2
            );

            // payment status
            $table->string('status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};