<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        $items = OrderItem::with(['order', 'dish'])->get();

        return response()->json([
            'items' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
            'dish_id' => 'required|integer|exists:dishes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $dish = Dish::findOrFail($request->dish_id);

        $item = OrderItem::create([
            'order_id' => $request->order_id,
            'dish_id' => $request->dish_id,
            'quantity' => $request->quantity,
            'price' => $dish->price,
        ]);

        $item->order->load('items');
        $item->order->calculateTotal();

        return response()->json([
            'message' => 'Order item created successfully',
            'item' => $item->load(['order', 'dish']),
        ], 201);
    }

    public function show(OrderItem $orderItem)
    {
        return response()->json([
            'item' => $orderItem->load(['order', 'dish']),
        ]);
    }

    public function update(Request $request, OrderItem $orderItem)
    {
        $request->validate([
            'dish_id' => 'required|integer|exists:dishes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $dish = Dish::findOrFail($request->dish_id);

        $orderItem->update([
            'dish_id' => $request->dish_id,
            'quantity' => $request->quantity,
            'price' => $dish->price,
        ]);

        $orderItem->order->load('items');
        $orderItem->order->calculateTotal();

        return response()->json([
            'message' => 'Order item updated successfully',
            'item' => $orderItem->load(['order', 'dish']),
        ]);
    }

    public function destroy(OrderItem $orderItem)
    {
        $order = $orderItem->order;

        $orderItem->delete();

        $order->load('items');

        $order->calculateTotal();

        return response()->json([
            'message' => 'Order item deleted successfully'
        ]);
        
    }

}
