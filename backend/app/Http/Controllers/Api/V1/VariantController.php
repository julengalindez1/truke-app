<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVariantRequest;
use App\Http\Resources\VariantResource;
use App\Models\Variant;
use Illuminate\Http\Request;

class VariantController extends Controller
{
    public function index()
    {
        return VariantResource::collection(Variant::all());
    }

    public function store(StoreVariantRequest $request)
    {
        $variant = Variant::create($request->validated());
        return VariantResource::make($variant);
    }

    public function show(Variant $variant)
    {
        return VariantResource::make($variant);
    }

    public function update(UpdateVariantRequest $request, Variant $variant)
    {
        $variant->update($request->validated());
        return VariantResource::make($variant);
    }

    public function destroy(Variant $variant)
    {
        $variant->delete();
        return response()->noContent();
    }
}
