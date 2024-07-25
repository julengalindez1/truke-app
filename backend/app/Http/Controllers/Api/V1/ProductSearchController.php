<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductSearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $products = Product::search($request->input ?? '')
            ->query(function ($query) {
                $query->select(['products.id', 'products.name', 'products.description_short', 'products.description_long', 'products.image', 'provider_id'])
                    ->with(['provider', 'provider.contacts'])
                    ->orderBy('products.name', 'ASC');
            })
            ->get();

        return response()->json(data: $products, status: 200);
    }
}
