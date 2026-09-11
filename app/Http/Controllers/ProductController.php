<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
   
    public function index(){
        $products = Product::all();
        return response()->json([
            'products'=>$products
        ]);
    }
    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
        $product = Product::create($validated);
        return response()->json([
            'msg'=> 'Product created successfully',
            'product' => $product
        ], 201);
    }

    public function show(Product $product){
        return response()->json([
            'product'=>$product
        ]);
    }

    public function update(Request $request, Product $product){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
        $product->update($validated);
        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    public function destroy(Product $product){
        $product->delete();
        return response()->json([
            'msg'=>'Product deleted successfully'
        ]);
    }

}
