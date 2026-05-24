


<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventRegistrationController;
use App\Http\Controllers\Api\BookmarkController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\PaymentController;

Route::options('/{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Register
Route::post('/register', [AuthController::class, 'register']);

// Login
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| EVENT ROUTES
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::get('/search/events', [EventController::class, 'search']);
Route::get('/filter/events', [EventController::class, 'filter']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Get current user
    Route::get('/user', [AuthController::class, 'user']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/events/register/{id}', [EventRegistrationController::class, 'register']);

    Route::delete('/events/unregister/{id}', [EventRegistrationController::class, 'unregister']);

    Route::get('/my-registrations', [EventRegistrationController::class, 'myRegistrations']);

    Route::get('/event-attendees/{id}', [EventRegistrationController::class, 'attendees']);
    
    Route::post('/events/bookmark/{id}', [BookmarkController::class, 'bookmark']);

    Route::delete('/events/bookmark/{id}', [BookmarkController::class, 'removeBookmark']);

    Route::get('/my-bookmarks', [BookmarkController::class, 'myBookmarks']);

    Route::get('/notifications', [NotificationController::class, 'index']);

    Route::put('/notifications/read/{id}', [NotificationController::class, 'markAsRead']);
    
    Route::get('/ticket/{id}', [TicketController::class, 'show']);

    Route::post('/verify-ticket', [TicketController::class, 'verify']);

    Route::post(
    '/payment/create-order/{id}',
    [PaymentController::class, 'createOrder']
);

Route::post(
    '/payment/verify',
    [PaymentController::class, 'verifyPayment']
);

Route::post(
    '/mock-payment/{id}',
    [PaymentController::class, 'mockPayment']
);
    
    Route::get(
    '/proposer/dashboard',
    [EventController::class, 'proposerDashboard']
);
    /*
    |--------------------------------------------------------------------------
    | PROTECTED EVENT ROUTES
    |--------------------------------------------------------------------------
    */

   Route::middleware('role:admin,proposer')->group(function () {

        Route::post('/events', [EventController::class, 'store']);

        Route::put('/events/{id}', [EventController::class, 'update']);

        Route::delete('/events/{id}', [EventController::class, 'destroy']);

    });

    /*
    |--------------------------------------------------------------------------
    | ADMIN ROUTES
    |--------------------------------------------------------------------------
    */

    Route::middleware('admin')->group(function () {

        Route::get('/admin/users', [AdminController::class, 'users']);

        Route::put('/admin/verify/{id}', [AdminController::class, 'verifyUser']);

        Route::put('/admin/reject/{id}', [AdminController::class, 'rejectUser']);

        Route::get('/admin/pending-events', [AdminController::class, 'pendingEvents']);

        Route::put('/admin/events/approve/{id}', [AdminController::class, 'approveEvent']);

        Route::put('/admin/events/reject/{id}', [AdminController::class, 'rejectEvent']);
        
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    });



});