<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix("admin")->group(function () {
    Route::group(['middleware' => ['auth']], function () {

        // dashboard
        Route::get('/dashboard', \App\Http\Controllers\Admin\DashboardController::class)
            ->name('admin.dashboard');

        // lessons
        Route::resource("/lessons", \App\Http\Controllers\Admin\LessonController::class, ['as' => 'admin']);

        // classrooms
        Route::resource("/classrooms", \App\Http\Controllers\Admin\ClassroomController::class, ['as' => 'admin']);

        // students
        Route::get("/students/import", [\App\Http\Controllers\Admin\StudentController::class, "import"])->name('admin.students.import');

        Route::post("/students/import", [\App\Http\Controllers\Admin\StudentController::class, "storeImport"])->name('admin.students.storeImport');

        Route::resource("/students", \App\Http\Controllers\Admin\StudentController::class, ['as' => 'admin']);

        // exams
        Route::resource("/exams", \App\Http\Controllers\Admin\ExamController::class, ['as' => 'admin']);

        // question
        Route::get('/exams/{exam}/questions/create', [\App\Http\Controllers\Admin\ExamController::class, 'createQuestion'])->name('admin.exams.createQuestion');

        Route::post('/exams/{exam}/questions/store', [\App\Http\Controllers\Admin\ExamController::class, 'storeQuestion'])->name('admin.exams.storeQuestion');

        Route::get("/exams/{exam}/questions/import", [\App\Http\Controllers\Admin\ExamController::class, 'import'])->name('admin.exams.questionImport');

        Route::post('/exams/{exam}/questions/import', [\App\Http\Controllers\Admin\ExamController::class, 'storeImport'])->name('admin.exams.questionStoreImport');

        Route::get('/exams/{exam}/questions/{question}/edit', [\App\Http\Controllers\Admin\ExamController::class, "editQuestion"])->name('admin.exams.editQuestion');

        Route::put('/exams/{exam}/questions/{question}/update', [\App\Http\Controllers\Admin\ExamController::class, 'updateQuestion'])->name('admin.exams.updateQuestion');

        Route::delete('/exams/{exam}/questions/{question}/destroy', [\App\Http\Controllers\Admin\ExamController::class, 'destroyQuestion'])->name('admin.exams.destroyQuestion');

        // exam-sessions
        Route::resource("/exam_sessions", \App\Http\Controllers\Admin\ExamSessionController::class, ['as' => 'admin']);

        Route::get('/exam_sessions/{exam_session}/enrolle/create', [\App\Http\Controllers\Admin\ExamSessionController::class, 'createEnrolle'])->name('admin.exam_sessions.createEnrolle');

        Route::post('/exam_sessions/{exam_session}/enrolle/store', [\App\Http\Controllers\Admin\ExamSessionController::class, 'storeEnrolle'])->name('admin.exam_sessions.storeEnrolle');
    });
});
