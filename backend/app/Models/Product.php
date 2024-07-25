<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;
 
class Product extends Model
{
    use Searchable;
    use HasFactory;

    protected $fillable = [
        "name",
        "description_short",
        "description_long",
        "image",
        "provider_id",
        "category_id"
    ];

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return ProductFactory::new();
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    /**
     * Get the category associated with the product.
    */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function formats()
    {
        return $this->belongsToMany(Format::class, 'variants')->withPivot('pvp');
    }
    
    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'description_short' => $this->description_short,
            'description_long' => $this->description_long
        ];
    }
}
