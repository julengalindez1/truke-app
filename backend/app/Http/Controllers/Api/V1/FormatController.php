<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreFormatRequest;
use App\Http\Requests\UpdateFormatRequest;
use App\Models\Format;
use App\Http\Resources\FormatResource;
use App\Http\Controllers\Controller;

class FormatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FormatResource::collection(Format::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormatRequest $request)
    {
        
        $format = Format::create($request->validated());
        return FormatResource::make($format);
    }

    /**
     * Display the specified resource.
     */
    public function show(Format $format)
    {
        return FormatResource::make($format);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormatRequest $request, Format $format)
    {
        $format->update($request->validated());
        return FormatResource::make($format);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Format $format)
    {
        $format->delete();
        return response()->noContent();
    }
}
