<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::when(request()->q, function ($lessons) {
            $lessons = $lessons->where('title', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        // dd($lessons);

        $lessons->appends(['q' => request()->q]);

        return Inertia::render('Admin/Lesson/index', [
            'lessons' => $lessons
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Lesson/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:lessons'
        ]);

        Lesson::create([
            'title' => $request->title
        ]);

        return redirect()->route('admin.lessons.index');
    }
}
