<?php

namespace App\Models;

use App\Models\Dish;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];

    public function dishes()
    {
        return $this->hasMany(Dish::class,'category_id');
    }
}
