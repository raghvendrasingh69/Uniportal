<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GET USER NOTIFICATIONS
    |--------------------------------------------------------------------------
    */
    public function index()
    {
        $notifications = Notification::where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'notifications' => $notifications
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | MARK NOTIFICATION AS READ
    |--------------------------------------------------------------------------
    */
    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', auth()->id())
            ->find($id);

        if (!$notification) {

            return response()->json([
                'success' => false,
                'message' => 'Notification not found'
            ], 404);
        }

        $notification->is_read = true;

        $notification->save();

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read',
            'notification' => $notification
        ]);
    }
}