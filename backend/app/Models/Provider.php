<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    use HasFactory;

    protected $table = 'providers';
    // use HasFactory;
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    public function contacts()
    {
        return $this->hasMany(Contact::class, 'provider_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
