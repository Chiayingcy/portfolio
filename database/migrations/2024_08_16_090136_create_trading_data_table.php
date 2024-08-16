<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropfirmTable extends Migration
{
    public function up()
    {
        Schema::create('propfirm', function (Blueprint $table) {
            $table->id();
            $table->string('prop_firm');
            $table->string('capital');
            $table->decimal('price', 10, 2);
            $table->decimal('discount', 5, 2);
            $table->decimal('net_price', 10, 2);
            $table->string('code');
            $table->timestamps(); // Add this if you have timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('propfirm');
    }
}
