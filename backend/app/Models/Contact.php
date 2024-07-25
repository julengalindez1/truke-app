<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contacts';

    protected $fillable = [
        'provider_id',
        'name',
        'type',
        'schedule'
    ];

    public $timestamps = false;

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
