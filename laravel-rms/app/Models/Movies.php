<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'release_year', 'imdb_id', 'images', 'omdb_data'];
    
    protected $casts = [
        'images' => 'array',
        'omdb_data' => 'array',
    ];
}
