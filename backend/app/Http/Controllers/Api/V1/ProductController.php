<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $name = request()->input('name');
        $categoryId = request()->input('category_id');

        $products = Product::query();

        if ($name) {
            $products->where('name', 'like', '%' . $name . '%');
        }

        if ($categoryId) {
            $products->where('category_id', $categoryId);
        }

        // $filteredProducts = $products->with('provider')->get();
        // $filteredProducts = $products->get()->each->load('provider');
        $filteredProducts = $products->with(['provider.contacts'])->get();
        return ProductResource::collection($filteredProducts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        return ProductResource::make($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return ProductResource::make($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $product = $request->updateProduct($id);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
