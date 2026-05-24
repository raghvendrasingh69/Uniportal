<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Check user logged in
        if (!$request->user()) {

            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Check role
        if (!in_array($request->user()->role, $roles)) {

            return response()->json([
                'success' => false,
                'message' => 'Access denied'
            ], 403);
        }

        return $next($request);
    }
}