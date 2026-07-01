<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'guests' => 'required|integer|min:1',
            'special_request' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $reservation = Reservation::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Reservation created successfully',
            'data' => $reservation
        ], 201);
    }
}
