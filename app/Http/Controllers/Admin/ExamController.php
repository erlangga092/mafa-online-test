<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::when(request()->q, function ($exams) {
            $exams = $exams->where('title', 'LIKE', '%' . request()->q . '%');
        })->with('lesson', 'classroom', 'questions')->latest()->paginate(5);

        $exams->appends(['q' => request()->q]);

        return Inertia::render('Admin/Exam/index', [
            'exams' => $exams
        ]);
    }

    public function create()
    {
        $lessons = Lesson::all();
        $classrooms = Classroom::all();

        return Inertia::render('Admin/Exam/Create', compact('lessons', 'classrooms'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'lesson_id' => 'required|integer',
            'classroom_id' => 'required|integer',
            'duration' => 'required|integer',
            'description' => 'required',
            'random_question' => 'required',
            'random_answer' => 'required',
            'show_answer' => 'required'
        ]);

        Exam::create([
            'title' => $request->title,
            'lesson_id' => $request->lesson_id,
            'classroom_id' => $request->classroom_id,
            'duration' => $request->duration,
            'description' => $request->description,
            'random_question' => $request->random_question,
            'random_answer' => $request->random_answer,
            'show_answer' => $request->show_answer
        ]);

        return redirect()->route('admin.exams.index');
    }
}
