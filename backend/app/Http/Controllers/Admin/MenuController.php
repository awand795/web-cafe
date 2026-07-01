<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with('category')->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $menus
        ]);
    }

    public function show($id)
    {
        $menu = Menu::with('category')->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $menu
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|string|max:500',
            'is_popular' => 'boolean',
        ]);

        $menu = Menu::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil ditambahkan.',
            'data' => $menu->load('category')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|string|max:500',
            'is_popular' => 'boolean',
        ]);

        $menu->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil diperbarui.',
            'data' => $menu->load('category')
        ]);
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil dihapus.'
        ]);
    }
}
