<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\ExamGroup;
use App\Models\ExamSession;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $exam_sessions = ExamSession::when(request()->q, function ($exam_sessions) {
            $exam_sessions = $exam_sessions->where('title', 'LIKE', '%' . request()->q . '%');
        })->with('exam.classroom', 'exam.lesson', 'exam_groups')->latest()->paginate(5);

        $exam_sessions->appends(['q' => request()->q]);

        return Inertia::render('Admin/Exam-Session/index', compact('exam_sessions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $exams = Exam::all();
        return Inertia::render('Admin/Exam-Session/Create', compact('exams'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'exam_id' => 'required',
            'start_time' => 'required',
            'end_time' => 'required'
        ]);

        ExamSession::create([
            'title' => $request->title,
            'exam_id' => $request->exam_id,
            'start_time' => date('Y-m-d H:i:s', strtotime($request->start_time)),
            'end_time' => date('Y-m-d H:i:s', strtotime($request->end_time))
        ]);

        return redirect()->route('admin.exam_sessions.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $exam_session = ExamSession::with('exam.classroom', 'exam.lesson')->findOrFail($id);

        $exam_session->setRelation('exam_groups', $exam_session->exam_groups()->with('student.classroom')->paginate(5));

        return Inertia::render("Admin/Exam-Session/Show", [
            'exam_session' => $exam_session
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function createEnrolle(ExamSession $exam_session)
    {
        $exam = $exam_session->exam;

        $students_enrolled = ExamGroup::where('exam_id', $exam->id)->where('exam_session_id', $exam_session->id)->pluck('student_id')->all();

        $students = Student::with('classroom')->where('classroom_id', $exam->classroom_id)->whereNotIn('id', $students_enrolled)->get();


        return Inertia::render('Admin/Exam-Group/Create', compact('exam', 'exam_session', 'students'));
    }

    public function storeEnrolle(Request $request, ExamSession $exam_session)
    {
        $this->validate($request, [
            'student_id' => 'required'
        ]);

        foreach ($request->student_id as $student_id) {
            $student = Student::findOrFail($student_id);

            ExamGroup::create([
                'exam_id' => $request->exam_id,
                'exam_session_id' => $exam_session->id,
                'student_id' => $student->id
            ]);
        }

        return redirect()->route('admin.exam_sessions.show', $exam_session->id);
    }

    public function destroyEnrolle(ExamSession $exam_session, ExamGroup $exam_group)
    {
        $exam_group->delete();
        return redirect()->route('admin.exam_sessions.show', $exam_session->id);
    }
}
