<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'format_id' => $this->format_id,
            'pvp' => $this->pvp,
            'product' => new ProductResource($this->whenLoaded('product')),
            'format' => new FormatResource($this->whenLoaded('format')),
        ];
    }
}
