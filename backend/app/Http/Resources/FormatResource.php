<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormatResource extends JsonResource
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
            'size' => $this->size,
            'weighable' => $this->weighable,
            'is_divisible' => $this->s_divisible,
            //'pvp' => $this->pvp,
            //'product_id' => $this->product_id,
            'unit_measure' => $this->unit_measure
        ];
    }
}
