<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'lesson_id', 'classroom_id', 'duration', 'description', 'random_question', 'random_answer', 'show_answer'
    ];
}
