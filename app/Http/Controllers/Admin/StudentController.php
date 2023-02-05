<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::when(request()->q, function ($students) {
            $students = $students->where('name', 'LIKE', '%' . request()->q . '%');
        })->with('classroom')->latest()->paginate(5);

        $students->appends(['q' => request()->q]);

        return Inertia::render('Admin/Student/index', [
            'students' => $students
        ]);
    }

    public function create()
    {
        $classrooms = Classroom::all();

        return Inertia::render('Admin/Student/Create', [
            'classrooms' => $classrooms
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nisn' => 'required|unique:students',
            'gender' => 'required|string',
            'password' => 'required|confirmed',
            'classroom_id' => 'required'
        ]);

        Student::create([
            'name' => $request->name,
            'nisn' => $request->nisn,
            'gender' => $request->gender,
            'password' => $request->password,
            'classroom_id' => $request->classroom_id
        ]);

        return redirect()->route('admin.students.index');
    }

    public function destroy($id)
    {
        try {
            $student = Student::findOrFail($id);
            $student->delete();
            return redirect()->route('admin.students.index');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors($e->getMessage());
        }
    }

    public function import()
    {
        return Inertia::render("Admin/Student/Import");
    }

    public function storeImport(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        Excel::import(new \App\Imports\StudentsImport(), $request->file('file'));

        return redirect()->route('admin.students.index');
    }
}
