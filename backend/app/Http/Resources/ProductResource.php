<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description_short' => $this->description_short,
            'description_long' => $this->description_long,
            'image' => $this->image,
            'provider_id' => $this->provider_id,
            'category_id' => $this->category_id,
            'provider' => new ProviderResource($this->whenLoaded('provider'))        ];
    }
}
