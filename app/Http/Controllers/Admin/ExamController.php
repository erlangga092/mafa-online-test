<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Lesson;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

    public function show($id)
    {
        $exam = Exam::with('lesson', 'classroom')->findOrFail($id);
        $exam->setRelation('questions', $exam->questions()->paginate(5));

        return Inertia::render('Admin/Exam/Show', compact('exam'));
    }

    public function edit($id)
    {
        $exam = Exam::with('lesson', 'classroom')->findOrFail($id);
        $lessons = Lesson::all();
        $classrooms = Classroom::all();

        return Inertia::render('Admin/Exam/Edit', compact('exam', 'lessons', 'classrooms'));
    }

    public function update(Request $request, Exam $exam)
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

        $exam->update([
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

    public function destroy($id)
    {
        try {
            $exam = Exam::findOrFail($id);
            $exam->delete();
            return redirect()->route('admin.exams.index');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors($e->getMessage());
        }
    }

    public function createQuestion(Exam $exam)
    {
        return Inertia::render('Admin/Question/Create', [
            'exam' => $exam
        ]);
    }

    public function storeQuestion(Request $request, Exam $exam)
    {
        $this->validate($request, [
            'question' => 'required',
            'option_1' => 'required',
            'option_2' => 'required',
            'option_3' => 'required',
            'option_4' => 'required',
            'option_5' => 'required',
            'answer' => 'required'
        ]);

        Question::create([
            'exam_id' => $exam->id,
            'question' => $request->question,
            'option_1' => $request->option_1,
            'option_2' => $request->option_2,
            'option_3' => $request->option_3,
            'option_4' => $request->option_4,
            'option_5' => $request->option_5,
            'answer' => $request->answer
        ]);

        return redirect()->route('admin.exams.show', $exam->id);
    }

    public function import(Exam $exam)
    {
        return Inertia::render('Admin/Question/Import', compact('exam'));
    }

    public function storeImport(Request $request, Exam $exam)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        Excel::import(new \App\Imports\QuestionImport(), $request->file('file'));
        return redirect()->route('admin.exams.show', $exam->id);
    }

    public function editQuestion(Exam $exam, Question $question)
    {
        return Inertia::render('Admin/Question/Edit', compact('exam', 'question'));
    }

    public function updateQuestion(Request $request, Exam $exam, Question $question)
    {
        $this->validate($request, [
            'question' => 'required',
            'option_1' => 'required',
            'option_2' => 'required',
            'option_3' => 'required',
            'option_4' => 'required',
            'option_5' => 'required',
            'answer' => 'required',
        ]);

        $question->update([
            'question' => $request->question,
            'option_1' => $request->option_1,
            'option_2' => $request->option_2,
            'option_3' => $request->option_3,
            'option_4' => $request->option_4,
            'option_5' => $request->option_5,
            'answer' => $request->answer,
        ]);

        return redirect()->route('admin.exams.show', $exam->id);
    }

    public function destroyQuestion(Exam $exam, Question $question)
    {
        try {
            $question->delete();
            return redirect()->route('admin.exams.show', $exam->id);
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors($e->getMessage());
        }
    }
}
