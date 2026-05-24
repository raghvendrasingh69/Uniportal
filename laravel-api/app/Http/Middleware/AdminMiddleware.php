<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check login
        if (!$request->user()) {

            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Check admin role
        if ($request->user()->role !== 'admin') {

            return response()->json([
                'success' => false,
                'message' => 'Admin access only'
            ], 403);
        }

        return $next($request);
    }
}