<?php

namespace App\Http\Controllers\Api;

use App\Models\Notification;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EventRegistrationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | REGISTER FOR EVENT
    |--------------------------------------------------------------------------
    */
    public function register($id)
    {
        $event = Event::find($id);

        // Check event capacity
$totalRegistrations = EventRegistration::where('event_id', $id)
    ->count();

if ($totalRegistrations >= $event->max_capacity) {

    return response()->json([
        'success' => false,
        'message' => 'Event is full'
    ], 400);
}

        if (!$event) {

            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        // Prevent duplicate registration
        $alreadyRegistered = EventRegistration::where('user_id', auth()->id())
            ->where('event_id', $id)
            ->exists();

        if ($alreadyRegistered) {

            return response()->json([
                'success' => false,
                'message' => 'Already registered for this event'
            ], 400);
        }

        // Generate unique ticket code
$ticketCode = strtoupper(Str::random(10));

// QR file name
$qrFileName = 'tickets/' . $ticketCode . '.svg';

// Generate QR code
QrCode::format('svg')
    ->size(300)
    ->generate(
        $ticketCode,
        storage_path('app/public/' . $qrFileName)
    );

// Create registration
$registration = EventRegistration::create([
    'user_id' => auth()->id(),
    'event_id' => $id,
    'ticket_code' => $ticketCode,
    'qr_code' => $qrFileName
]);

// Notify end user
Notification::create([

    'user_id' => auth()->id(),

    'title' => 'Registration Successful',

    'message' =>
        'You successfully registered for event "' .
        $event->title .
        '" 🚀'
]);    

        // Notify organizer
Notification::create([
    'user_id' => $event->user_id,
    'title' => 'New Event Registration',
    'message' => auth()->user()->name . ' registered for your event "' . $event->title . '".'
]);

        return response()->json([
            'success' => true,
            'message' => 'Event registration successful',
            'registration' => $registration,
            'qr_url' => asset('storage/' . $qrFileName),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CANCEL REGISTRATION
    |--------------------------------------------------------------------------
    */
    public function unregister($id)
    {
        $registration = EventRegistration::where('user_id', auth()->id())
            ->where('event_id', $id)
            ->first();

        if (!$registration) {

            return response()->json([
                'success' => false,
                'message' => 'Registration not found'
            ], 404);
        }

        $registration->delete();

        return response()->json([
            'success' => true,
            'message' => 'Registration cancelled successfully'
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | MY REGISTERED EVENTS
    |--------------------------------------------------------------------------
    */
    public function myRegistrations()
    {
        $registrations = EventRegistration::with('event')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'registrations' => $registrations
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | EVENT ATTENDEES
    |--------------------------------------------------------------------------
    */
    public function attendees($id)
    {
        $registrations = EventRegistration::with('user')
            ->where('event_id', $id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'attendees' => $registrations
        ]);
    }
}