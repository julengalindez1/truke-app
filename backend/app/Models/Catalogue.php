<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalogue extends Model
{
    use HasFactory;

    protected $table = 'catalogues';

    protected $fillable = [
        'id_catalogue',
        'id_product',
        'id_provider'
    ];

    public $timestamps = false;

    public function provider()
    {
        return $this->belongsToMany(Provider::class, 'id_provider');
    }
}
