<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradingData extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'propfirm';

    // Specify which attributes are mass assignable
    protected $fillable = [
        'propfirm',
        'capital',
        'price',
        'discount',
        'net_price',
        'code',
    ];

    // Optional: If you have timestamps in your table, set this to true
    public $timestamps = false;
}
