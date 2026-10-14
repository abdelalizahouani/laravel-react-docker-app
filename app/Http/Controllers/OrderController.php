<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user','items.dish'])
            ->latest()
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'status' => 'nullable|string|in:pending,confirmed,preparing,delivered,cancelled',

            'items' => 'required|array|min:1',

            'items.*.dish_id' => 'required|integer|exists:dishes,id',

            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => 0,
            'status' => $request->status ?? 'pending',
        ]);

        foreach ($request->items as $item) {

            $dish = Dish::where('id',$item['dish_id'])->where('is_available',true)
            ->firstOrFail();

            $order->items()->create([
                'dish_id' => $dish->id,
                'quantity' => $item['quantity'],
                'price' => $dish->price,
            ]);
        }

        $order->load('items');

        $order->calculateTotal();

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load([
                'user',
                'items.dish',
            ]),
        ], 201);
    }

    public function show(Order $order)
    {
        return response()->json([

            'order' => $order->load([
                'user',
                'items.dish',
            ]),

        ]);

    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            //'total' => 'required|numeric|min:0',
            'status' => 'required|string|in:pending,confirmed,preparing,delivered,cancelled',
        ]);

        $order->update([
            //'total' => $request->total,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order->load('user'),
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully'
        ]);
    }

    public function myOrders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with([
                'items.dish',
            ])
            ->latest()
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }
}
