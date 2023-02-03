import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import Swal from "sweetalert2";

const Create = ({ exam }) => {
  const answerLists = [
    { value: 1, name: "A" },
    { value: 2, name: "B" },
    { value: 3, name: "C" },
    { value: 4, name: "D" },
    { value: 5, name: "E" },
  ];

  const [form, setForm] = React.useState({
    question: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    option_5: "",
    answer: 1,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(`/admin/exams/${exam.id}/questions/store`, form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Soal Ujian Berhasil Disimpan!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Soal - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href={`/admin/exams/${exam.id}`}
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-question-circle"></i> Tambah Soal Ujian
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="table responsive mb-4">
                      <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                        <tbody>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Soal
                            </td>
                            <td>
                              <Editor
                                apiKey="no-api-key"
                                init={{
                                  menubar: false,
                                  plugins: "lists link image emoticons",
                                  toolbar:
                                    "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                                  content_style:
                                    "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                                }}
                                onEditorChange={(value, editor) =>
                                  setForm({
                                    ...form,
                                    question: value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Pilihan A
                            </td>
                            <td>
                              <Editor
                                apiKey="no-api-key"
                                init={{
                                  menubar: false,
                                  plugins: "lists link image emoticons",
                                  toolbar:
                                    "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                                  content_style:
                                    "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                                }}
                                onEditorChange={(value, editor) =>
                                  setForm({
                                    ...form,
                                    option_1: value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Pilihan B
                            </td>
                            <td>
                              <Editor
                                apiKey="no-api-key"
                                init={{
                                  menubar: false,
                                  plugins: "lists link image emoticons",
                                  toolbar:
                                    "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                                  content_style:
                                    "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                                }}
                                onEditorChange={(value, editor) =>
                                  setForm({
                                    ...form,
                                    option_2: value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Pilihan C
                            </td>
                            <td>
                              <Editor
                                apiKey="no-api-key"
                                init={{
                                  menubar: false,
                                  plugins: "lists link image emoticons",
                                  toolbar:
                                    "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                                  content_style:
                                    "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                                }}
                                onEditorChange={(value, editor) =>
                                  setForm({
                                    ...form,
                                    option_3: value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Pilihan D
                            </td>
                            <td>
                              <Editor
                                apiKey="no-api-key"
                                init={{
                                  menubar: false,
                                  plugins: "lists link image emoticons",
                                  toolbar:
                                    "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                                  content_style:
                                    "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                                }}
                                onEditorChange={(value, editor) =>
                                  setForm({
                                    ...form,
                                    option_4: value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Pilihan E
                            </td>
                            <td>
                              <Editor
                                apiKey="no-api-key"
                                init={{
                                  menubar: false,
                                  plugins: "lists link image emoticons",
                                  toolbar:
                                    "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons",
                                  content_style:
                                    "body { font-family:Quicksand, Helvetica,Arial,sans-serif; font-size: 16px }",
                                }}
                                onEditorChange={(value, editor) =>
                                  setForm({
                                    ...form,
                                    option_5: value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "20%" }} className="fw-bold">
                              Jawaban Benar
                            </td>
                            <td>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    answer: e.target.value,
                                  })
                                }
                              >
                                {answerLists?.map((answer) => (
                                  <option value={answer.value}>
                                    {answer.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <button
                      className="btn btn-md btn-primary border-0 shadow me-2"
                      type="submit"
                    >
                      Simpan
                    </button>
                    <button
                      className="btn btn-warning btn-primary border-0 shadow me-2"
                      type="reset"
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
