<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'card_id',
        'user_id',
        'parent_id',
        'title',
        'is_completed',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'card_id' => 'integer',
        'user_id' => 'integer',
        'parent_id' => 'integer',
        'is_completed' => 'boolean',
    ];

    protected $with = ['card', 'children', 'user'];

    public function card(): BelongsTo
    {
        return $this->belongsTo(Card::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'parent_id');
    }
    public function children(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_id');
    }

    
}
