<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [

        'user_id',

        'event_id',

        'payment_id',

        'amount',

        'status'
    ];
}