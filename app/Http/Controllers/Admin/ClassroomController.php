<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function index()
    {
        $classrooms = Classroom::when(request()->q, function ($classrooms) {
            $classrooms = $classrooms->where('title', 'LIKE', '%' . request()->q . '%');
        })->latest()->paginate(5);

        $classrooms->appends(['q' => request()->q]);

        return Inertia::render("Admin/Classroom/index", [
            'classrooms' => $classrooms
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Classroom/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:classrooms'
        ]);

        Classroom::create([
            'title' => $request->title
        ]);

        return redirect()->route('admin.classrooms.index');
    }

    public function edit($id)
    {
        $classroom = Classroom::findOrFail($id);

        return Inertia::render('Admin/Classroom/Edit', compact('classroom'));
    }

    public function update(Request $request, Classroom $classroom)
    {
        $this->validate($request, [
            'title' => 'required|string|unique:classrooms,title,' . $classroom->id,
        ]);

        $classroom->update([
            'title' => $request->title
        ]);

        return redirect()->route('admin.classrooms.index');
    }

    public function destroy($id)
    {
        try {
            $classroom = Classroom::findOrFail($id);
            $classroom->delete();
            return redirect()->route('admin.classrooms.index');
        } catch (\Illuminate\Database\QueryException $e) {
            return back()->withErrors($e->getMessage());
        }
    }
}
