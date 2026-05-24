<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | CREATE EVENT
    |--------------------------------------------------------------------------
    */
    public function store(Request $request)
    {
        // Check proposer verification
if (
    auth()->user()->role === 'proposer' &&
    auth()->user()->is_verified == false
) {

    return response()->json([
        'success' => false,
        'message' => 'Your account is not verified by admin'
    ], 403);
}


        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'location' => 'required',
            'city' => 'required',
            'category' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'price' => 'required|numeric|min:0',
            'max_capacity' => 'required|integer|min:1',

            // Banner Validation
            'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $bannerPath = null;

        /*
        |--------------------------------------------------------------------------
        | UPLOAD BANNER
        |--------------------------------------------------------------------------
        */
        if ($request->hasFile('banner')) {

            $bannerPath = $request->file('banner')->store(
                'banners',
                'public'
            );
        }

        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'city' => $request->city,
            'category' => $request->category,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'price' => $request->price,
            'max_capacity' => $request->max_capacity,

            // Save Banner
            'banner' => $bannerPath,
            'status' => 'pending',

            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'event' => $event,

            // Public Banner URL
            'banner_url' => $bannerPath
                ? asset('storage/' . $bannerPath)
                : null
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | GET ALL EVENTS
    |--------------------------------------------------------------------------
    */
   public function index(Request $request)
{
    // Paginate 5 events per page
    $query = Event::where('status', 'approved')
    ->with('user');


    if($request->category) {

    $query->where(
        'category',
        $request->category
    );
}

$events = $query

    ->latest()
    ->paginate(5);

    // Add banner URL
    $events->getCollection()->transform(function ($event) {

        $event->remaining_seats =
    $event->max_capacity -
    \App\Models\EventRegistration::where('event_id', $event->id)->count();

        $event->banner_url = $event->banner
            ? asset('storage/' . $event->banner)
            : null;

        return $event;
    });

    return response()->json([
        'success' => true,
        'events' => $events
    ]);
}

    /*
    |--------------------------------------------------------------------------
    | SINGLE EVENT
    |--------------------------------------------------------------------------
    */
    public function show($id)
    {
        $event = Event::with('user')
        ->where('status', 'approved')
        ->find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        // Banner URL
        $event->banner_url = $event->banner
            ? asset('storage/' . $event->banner)
            : null;

        return response()->json([
            'success' => true,
            'event' => $event
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE EVENT
    |--------------------------------------------------------------------------
    */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        // Only owner can update
        if ($event->user_id != $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // Update banner if uploaded
        if ($request->hasFile('banner')) {

            $bannerPath = $request->file('banner')->store(
                'banners',
                'public'
            );

            $event->banner = $bannerPath;
        }

        $event->update($request->except('banner'));

        $event->save();

        return response()->json([
            'success' => true,
            'message' => 'Event updated successfully',
            'event' => $event,

            'banner_url' => $event->banner
                ? asset('storage/' . $event->banner)
                : null
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE EVENT
    |--------------------------------------------------------------------------
    */
    public function destroy(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        // Only owner can delete
        if ($event->user_id != $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully'
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SEARCH EVENTS
    |--------------------------------------------------------------------------
    */
    public function search(Request $request)
    {
        $keyword = $request->keyword;

        $events = Event::where('title', 'LIKE', "%$keyword%")
            ->orWhere('description', 'LIKE', "%$keyword%")
            ->orWhere('category', 'LIKE', "%$keyword%")
            ->orWhere('city', 'LIKE', "%$keyword%")
            ->get();

        return response()->json([
            'success' => true,
            'events' => $events
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | FILTER EVENTS
    |--------------------------------------------------------------------------
    */
    public function filter(Request $request)
    {
        $query = Event::query();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->city) {
            $query->where('city', $request->city);
        }

        $events = $query->get();

        return response()->json([
            'success' => true,
            'events' => $events
        ]);
    }
     

    public function proposerDashboard()
{
    $userId = auth()->id();

    $totalEvents = Event::where(
        'user_id',
        $userId
    )->count();

    $approvedEvents = Event::where(
        'user_id',
        $userId
    )->where(
        'status',
        'approved'
    )->count();

    $pendingEvents = Event::where(
        'user_id',
        $userId
    )->where(
        'status',
        'pending'
    )->count();

    return response()->json([

        'success' => true,

        'dashboard' => [

            'total_events' => $totalEvents,

            'approved_events' => $approvedEvents,

            'pending_events' => $pendingEvents
        ]
    ]);
}


}