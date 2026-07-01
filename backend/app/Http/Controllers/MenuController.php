<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 8);
        $menus = Menu::with('category')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $menus->items(),
            'pagination' => [
                'current_page' => $menus->currentPage(),
                'last_page' => $menus->lastPage(),
                'per_page' => $menus->perPage(),
                'total' => $menus->total(),
                'from' => $menus->firstItem(),
                'to' => $menus->lastItem(),
            ]
        ]);
    }
}
