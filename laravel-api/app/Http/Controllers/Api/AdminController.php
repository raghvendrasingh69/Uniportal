<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\Bookmark;

class AdminController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GET ALL USERS
    |--------------------------------------------------------------------------
    */
    public function users()
    {
        $users = User::latest()->get();

        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | VERIFY USER
    |--------------------------------------------------------------------------
    */
    public function verifyUser($id)
    {
        $user = User::find($id);

        if (!$user) {

            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->is_verified = true;

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User verified successfully',
            'user' => $user
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REJECT USER
    |--------------------------------------------------------------------------
    */
    public function rejectUser($id)
    {
        $user = User::find($id);

        if (!$user) {

            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->is_verified = false;

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User rejected successfully',
            'user' => $user
        ]);
    }

     /*
|--------------------------------------------------------------------------
| GET PENDING EVENTS
|--------------------------------------------------------------------------
*/
public function pendingEvents()
{
    $events = \App\Models\Event::where('status', 'pending')
        ->latest()
        ->get();

    return response()->json([
        'success' => true,
        'events' => $events
    ]);
}

/*
|--------------------------------------------------------------------------
| APPROVE EVENT
|--------------------------------------------------------------------------
*/
public function approveEvent($id)
{
    $event = \App\Models\Event::find($id);

    if (!$event) {

        return response()->json([
            'success' => false,
            'message' => 'Event not found'
        ], 404);
    }

    $event->status = 'approved';

    $event->save();

    // Create notification
Notification::create([
    'user_id' => $event->user_id,
    'title' => 'Event Approved',
    'message' => 'Your event "' . $event->title . '" has been approved.'
]);

    return response()->json([
        'success' => true,
        'message' => 'Event approved successfully',
        'event' => $event
    ]);
}

/*
|--------------------------------------------------------------------------
| REJECT EVENT
|--------------------------------------------------------------------------
*/
public function rejectEvent($id)
{
    $event = \App\Models\Event::find($id);

    if (!$event) {

        return response()->json([
            'success' => false,
            'message' => 'Event not found'
        ], 404);
    }

    $event->status = 'rejected';

    $event->save();

    // Create notification
Notification::create([
    'user_id' => $event->user_id,
    'title' => 'Event Rejected',
    'message' => 'Your event "' . $event->title . '" has been rejected.'
]);

    return response()->json([
        'success' => true,
        'message' => 'Event rejected successfully',
        'event' => $event
    ]);
}
     /*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/
public function dashboard()
{
    $dashboard = [

        'total_users' => User::count(),

        'total_events' => Event::count(),

        'approved_events' => Event::where('status', 'approved')->count(),

        'pending_events' => Event::where('status', 'pending')->count(),

        'rejected_events' => Event::where('status', 'rejected')->count(),

        'total_registrations' => EventRegistration::count(),

        'total_bookmarks' => Bookmark::count(),
    ];

    return response()->json([
        'success' => true,
        'dashboard' => $dashboard
    ]);
}
}