<?php

namespace App\Http\Requests;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        // Define your validation rules here
        return [
            'name' => 'nullable|max:255',
            'description_short' => 'nullable|max:255',
            'description_long' => 'nullable|max:500',
            'image' => 'nullable|max:255',
            'category_id' => 'nullable|max:255',
        ];
    }

    public function updateProduct($id)
    {
        $product = Product::findOrFail($id);

        $formDataFilteredByNullValues = array_filter($this->validated(), function ($value) {
            return $value !== null;
        });
        $product->update($formDataFilteredByNullValues);

        return $product;
    }

}
