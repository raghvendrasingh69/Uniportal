<?php

namespace App\Models;
use App\Models\EventRegistration;
use App\Models\Bookmark;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'location',
        'city',
        'category',
        'start_date',
        'end_date',
        'banner',
        'max_capacity',
        'price',
        'user_id'
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIP
    |--------------------------------------------------------------------------
    */

    // Event belongs to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function registrations()
{
    return $this->hasMany(EventRegistration::class);
}

public function bookmarks()
{
    return $this->hasMany(Bookmark::class);
}
}