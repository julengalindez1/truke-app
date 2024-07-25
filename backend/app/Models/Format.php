<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Format extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'size',
        //'container_id',
        'weighable',
        'is_divisible',
        'unit_measure'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'variants')->withPivot('pvp');
    }

    // public function unit_measure()
    // {
    //     return $this->belongsTo(UnitMeasure::class);
    // }

    // public function weighable()
    // {
    //     return $this->belongsTo(Weighable::class);
    // }

    // public function container()
    // {
    //     return $this->belongsTo(Container::class');
    // }
}
