<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Event;

use App\Models\Payment;

use App\Models\EventRegistration;

use Illuminate\Support\Str;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\Notification;

class PaymentController extends Controller
{
    public function mockPayment($id)
    {
        $event = Event::findOrFail($id);

        /*
        |------------------------------------------------------------------
        | CREATE FAKE PAYMENT
        |------------------------------------------------------------------
        */

        $payment = Payment::create([

            'user_id' => auth()->id(),

            'event_id' => $event->id,

            'payment_id' =>
                'TEST_' . strtoupper(Str::random(10)),

            'amount' => $event->price,

            'status' => 'success'
        ]);

        /*
        |------------------------------------------------------------------
        | GENERATE QR TICKET
        |------------------------------------------------------------------
        */

        $ticketCode = strtoupper(
            Str::random(10)
        );

        $qrFileName =
            'tickets/' . $ticketCode . '.svg';

        QrCode::format('svg')
            ->size(300)
            ->generate(

                $ticketCode,

                storage_path(
                    'app/public/' . $qrFileName
                )
            );

        /*
        |------------------------------------------------------------------
        | CREATE REGISTRATION
        |------------------------------------------------------------------
        */

        // Prevent duplicate registration
$alreadyRegistered = EventRegistration::where(

    'user_id',
    auth()->id()

)->where(

    'event_id',
    $event->id

)->exists();

if ($alreadyRegistered) {

    return response()->json([

        'success' => false,

        'message' =>
            'You already registered for this event'
    ], 400);
}

        $registration = EventRegistration::create([

            'user_id' => auth()->id(),

            'event_id' => $event->id,

            'ticket_code' => $ticketCode,

            'qr_code' => $qrFileName
        ]);

        // Notify end user
Notification::create([

    'user_id' => auth()->id(),

    'title' => 'Payment Successful',

    'message' =>
        'Your payment for "' .
        $event->title .
        '" was successful 🚀'
]);

        return response()->json([

            'success' => true,

            'message' =>
                'Mock payment successful 🚀',

            'payment' => $payment,

            'registration' => $registration,

            'qr_url' =>
                asset('storage/' . $qrFileName)
        ]);
    }
}