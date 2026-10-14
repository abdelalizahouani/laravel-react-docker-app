<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class DishController extends Controller
{
    public function index()
    {
        $dishes = Dish::with('category')->get();

        return response()->json([
            'dishes' => $dishes,
        ]);
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_available' => 'boolean',
        ]);
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('dishes', 'public');
        }
        //*** */
        $dish = Dish::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imagePath,
            'is_available' => $request->is_available ?? true,
        ]);

        return response()->json([
            'message' => 'Dish created successfully',
            'dish' => $dish->load('category'),
            //'dish'=>dd($request->all())
            'image_url'=>$dish->image
                ? asset('storage/' . $dish->image)
                : null,
        ], 201);
    }

    public function update(Request $request, Dish $dish)
    {
        $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_available' => 'boolean',
        ]);
        $imagePath = $dish->image;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('dishes', 'public');
        }

        $dish->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imagePath,
            'is_available' => $request->is_available,
        ]);

        return response()->json([
            'message' => 'Dish updated successfully',
            'dish' => $dish->load('category'),
        ]);
    }

    public function destroy(Dish $dish)
    {
        // Supprimer l'image du stockage
        if($dish->image){
            Storage::disk('public')->delete($dish->image);
        }
        // Supprimer le plat de la base de données
        $dish->delete();

        return response()->json([
            'message' => 'Dish deleted successfully'
        ]);
    }
    public function show(Dish $dish)
    {
        return response()->json([
            'dish' => $dish->load('category'),
        ]);
    }
}
