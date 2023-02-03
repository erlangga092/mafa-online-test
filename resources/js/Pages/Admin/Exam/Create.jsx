import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import Swal from "sweetalert2";

const Create = ({ errors, lessons, classrooms }) => {
  const [form, setForm] = React.useState({
    title: "",
    lesson_id: "",
    classroom_id: "",
    description: "",
    random_question: "Y",
    random_answer: "Y",
    show_answer: "N",
    duration: 1,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/admin/exams", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Ujian Berhasil Disimpan!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Ujian - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href="/admin/exams"
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-bookmark"></i> Tambah Ujian
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label>Nama Ujian</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan Nama Ujian"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            title: e.target.value,
                          })
                        }
                      />

                      {errors?.title && (
                        <div className="alert alert-danger mt-2">
                          {errors.title}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Mata Pelajaran</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                lesson_id: e.target.value,
                              })
                            }
                          >
                            {lessons?.map((lesson) => (
                              <option value={lesson.id} key={lesson.id}>
                                {lesson.title}
                              </option>
                            ))}
                          </select>
                          {errors?.lesson_id && (
                            <div className="alert alert-danger mt-2">
                              {errors.lesson_id}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Kelas</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                classroom_id: e.target.value,
                              })
                            }
                          >
                            {classrooms?.map((classroom) => (
                              <option value={classroom.id} key={classroom.id}>
                                {classroom.title}
                              </option>
                            ))}
                          </select>
                          {errors?.classroom_id && (
                            <div className="alert alert-danger mt-2">
                              {errors.classroom_id}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="">Deskripsi</label>
                      <Editor
                        api-key="no-api-key"
                        init={{
                          menubar: false,
                          plugins: "lists link image emoticons",
                          toolbar:
                            "undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                          content_style:
                            "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                        }}
                        onEditorChange={(value, editor) => {
                          setForm({
                            ...form,
                            description: value,
                          });
                        }}
                      />
                      {errors?.description && (
                        <div className="alert alert-danger mt-2">
                          {errors?.description}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Acak Soal</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                random_question: e.target.value,
                              })
                            }
                          >
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </select>
                          {errors?.random_question && (
                            <div className="alert alert-danger mt-2">
                              {errors?.random_question}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Acak Jawaban</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                random_answer: e.target.value,
                              })
                            }
                          >
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </select>
                          {errors?.random_answer && (
                            <div className="alert alert-danger mt-2">
                              {errors?.random_answer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Tampilkan Hasil</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                show_answer: e.target.value,
                              })
                            }
                          >
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </select>
                          {errors?.show_answer && (
                            <div className="alert alert-danger mt-2">
                              {errors?.show_answer}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Durasi (menit)</label>
                          <input
                            type="number"
                            min={1}
                            className="form-control"
                            placeholder="Masukkan Durasi Ujian (Menit)"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                duration: e.target.value,
                              })
                            }
                          />
                          {errors?.duration && (
                            <div className="alert alert-danger mt-2">
                              {errors?.duration}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-md btn-primary border-0 shadow me-2"
                    >
                      Simpan
                    </button>
                    <button
                      type="reset"
                      className="btn btn-md btn-warning border-0 shadow"
                    >
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Create;
