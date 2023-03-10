import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Show = ({ exam }) => {
  const onDeleteQuestion = (e, ID) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/exams/${exam.id}/questions/${ID}/destroy`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Soal Ujian Berhasil Dihapus!",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          },
          onError: (errors) => {
            Swal.fire({
              title: "Failed!",
              text: errors[0],
              icon: "failed",
              showConfirmButton: true,
            });
          },
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Detail Ujian - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href="/admin/exams"
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>

              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-edit"></i> Detail Ujian
                  </h5>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <tbody>
                        <tr>
                          <td className="fw-bold" style={{ width: "30%" }}>
                            Exams ID
                          </td>
                          <td>{exam.id}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold" style={{ width: "30%" }}>
                            Nama Ujian
                          </td>
                          <td>{exam.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Mata Pelajaran</td>
                          <td>{exam.lesson.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Kelas</td>
                          <td>{exam.classroom.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Jumlah Soal</td>
                          <td>{exam.questions.data.length}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Durasi (Menit)</td>
                          <td>{exam.duration}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-question-circle"></i> Soal Ujian
                  </h5>
                  <hr />
                  <Link
                    href={`/admin/exams/${exam.id}/questions/create`}
                    className="btn btn-md btn-primary border-0 shadow me-2"
                    type="button"
                  >
                    <i className="fa fa-plus-circle"></i> Tambah
                  </Link>
                  <Link
                    href={`/admin/exams/${exam.id}/questions/import`}
                    className="btn btn-md btn-success border-0 shadow text-white"
                    type="button"
                  >
                    <i className="fa fa-file-excel"></i> Import
                  </Link>
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th
                            className="border-0 rounded-start"
                            style={{ width: "15%" }}
                          >
                            No.
                          </th>
                          <th className="border-0">Soal</th>
                          <th
                            className="border-0 rounded-end"
                            style={{ width: "15%" }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam?.questions?.data.map((question, i) => (
                          <tr key={question.id}>
                            <td className="fw-bold text-center">
                              {++i +
                                (exam.questions.current_page - 1) *
                                  exam.questions.per_page}
                            </td>
                            <td>
                              <div
                                className="fw-bold"
                                dangerouslySetInnerHTML={{
                                  __html: question?.question,
                                }}
                              ></div>
                              <hr />
                              <ol type="A">
                                <li
                                  className={
                                    question?.answer == "1"
                                      ? "text-success fw-bold"
                                      : ""
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: question?.option_1,
                                  }}
                                ></li>
                                <li
                                  className={
                                    question?.answer == "2"
                                      ? "text-success fw-bold"
                                      : ""
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: question?.option_2,
                                  }}
                                ></li>
                                <li
                                  className={
                                    question?.answer == "3"
                                      ? "text-success fw-bold"
                                      : ""
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: question?.option_3,
                                  }}
                                ></li>
                                <li
                                  className={
                                    question?.answer == "4"
                                      ? "text-success fw-bold"
                                      : ""
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: question?.option_4,
                                  }}
                                ></li>
                                <li
                                  className={
                                    question?.answer == "5"
                                      ? "text-success fw-bold"
                                      : ""
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: question?.option_5,
                                  }}
                                ></li>
                              </ol>
                            </td>
                            <td className="text-center">
                              <Link
                                href={`/admin/exams/${exam.id}/questions/${question.id}/edit`}
                                className="btn btn-sm btn-info border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger border-0 shadow"
                                onClick={(e) =>
                                  onDeleteQuestion(e, question.id)
                                }
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Show;
