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
}
