<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Event;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | ADD BOOKMARK
    |--------------------------------------------------------------------------
    */
    public function bookmark($id)
    {
        $event = Event::find($id);

        if (!$event) {

            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        // Prevent duplicate bookmark
        $alreadyBookmarked = Bookmark::where('user_id', auth()->id())
            ->where('event_id', $id)
            ->exists();

        if ($alreadyBookmarked) {

            return response()->json([
                'success' => false,
                'message' => 'Event already bookmarked'
            ], 400);
        }

        $bookmark = Bookmark::create([
            'user_id' => auth()->id(),
            'event_id' => $id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event bookmarked successfully',
            'bookmark' => $bookmark
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REMOVE BOOKMARK
    |--------------------------------------------------------------------------
    */
    public function removeBookmark($id)
    {
        $bookmark = Bookmark::where('user_id', auth()->id())
            ->where('event_id', $id)
            ->first();

        if (!$bookmark) {

            return response()->json([
                'success' => false,
                'message' => 'Bookmark not found'
            ], 404);
        }

        $bookmark->delete();

        return response()->json([
            'success' => true,
            'message' => 'Bookmark removed successfully'
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | MY BOOKMARKS
    |--------------------------------------------------------------------------
    */
    public function myBookmarks()
    {
        $bookmarks = Bookmark::with('event')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'bookmarks' => $bookmarks
        ]);
    }
}