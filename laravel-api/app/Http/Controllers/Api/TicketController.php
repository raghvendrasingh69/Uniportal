<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventRegistration;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | VIEW TICKET
    |--------------------------------------------------------------------------
    */
    public function show($id)
    {
        $ticket = EventRegistration::with('event', 'user')
            ->find($id);

        if (!$ticket) {

            return response()->json([
                'success' => false,
                'message' => 'Ticket not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'ticket' => $ticket,
            'qr_url' => asset('storage/' . $ticket->qr_code)
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | VERIFY TICKET
    |--------------------------------------------------------------------------
    */
    public function verify(Request $request)
    {
        $request->validate([
            'ticket_code' => 'required'
        ]);

        $ticket = EventRegistration::with('event', 'user')
            ->where('ticket_code', $request->ticket_code)
            ->first();

        if (!$ticket) {

            return response()->json([
                'success' => false,
                'message' => 'Invalid ticket'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Valid ticket',
            'ticket' => $ticket
        ]);
    }
}