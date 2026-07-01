<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $reservation
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        $reservation->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Status reservasi berhasil diperbarui.',
            'data' => $reservation
        ]);
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reservasi berhasil dihapus.'
        ]);
    }
}
