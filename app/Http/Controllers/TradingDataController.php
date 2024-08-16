<?php

namespace App\Http\Controllers;

use App\Models\TradingData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TradingDataController extends Controller
{
    // Method to render the Trading view with data
    public function index()
    {
        return Inertia::render('Trading', [
            'tradingData' => TradingData::all()
        ]);
    }

    // Method to store new trading data
    public function store(Request $request)
    {
        $data = $request->validate([
            'propfirm' => 'required|string',
            'capital' => 'required|string',
            'price' => 'required|numeric',
            'discount' => 'required|numeric',
            'net_price' => 'nullable|string',
            'code' => 'required|string',
        ]);

        TradingData::create($data);
        return redirect()->route('trading'); // Ensure this route is correctly defined
    }

    // Method to update existing trading data
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'propfirm' => 'required|string',
            'capital' => 'required|string',
            'price' => 'required|numeric',
            'discount' => 'required|numeric',
            'net_price' => 'nullable|string',
            'code' => 'required|string',
        ]);

        $tradingData = TradingData::findOrFail($id);
        $tradingData->update($data);
        return redirect()->route('trading'); // Ensure this route is correctly defined
    }

    // Method to delete trading data
    public function destroy($id)
    {
        $tradingData = TradingData::findOrFail($id);
        $tradingData->delete();
        return redirect()->route('trading'); // Ensure this route is correctly defined
    }
}
