import React from "react";
import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link } from "@inertiajs/react";

const Exam = ({ exams }) => {
  return (
    <>
      <Head>
        <title>Ujian - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-3 col-12 mb-2">
                  <Link
                    href="/admin/exams/create"
                    className="btn btn-md btn-primary border-0 shadow w-100"
                    type="button"
                  >
                    <i className="fa fa-plus-circle"></i> Tambah
                  </Link>
                </div>
                <div className="col-md-9 col-12 mb-2">
                  <form action="">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-0 shadow"
                        placeholder="masukkan kata kunci dan enter..."
                      />
                      <span className="input-group-text border-0 shadow">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th
                            className="border-0 rounded-start"
                            style={{ width: "5%" }}
                          >
                            No.
                          </th>
                          <th className="border-0">Ujian</th>
                          <th className="border-0">Pelajaran</th>
                          <th className="border-0">Kelas</th>
                          <th className="border-0">Jumlah Soal</th>
                          <th
                            className="border-0 rounded-end"
                            style={{ width: "15%" }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <div className="mt-2"></div>
                      <tbody>
                        {exams?.data.map((exam, i) => (
                          <tr key={i}>
                            <td className="fw-bold text-center">
                              {++i +
                                (exams?.current_page - 1) * exams?.per_page}
                            </td>
                            <td>{exam.title}</td>
                            <td>{exam.lesson.title}</td>
                            <td className="text-center">
                              {exam.classroom.title}
                            </td>
                            <td className="text-center">
                              {exam.questions.length}
                            </td>
                            <td className="text-center">
                              <Link
                                href={`/admin/exams/${exam.id}`}
                                className="btn btn-sm btn-primary border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-plus-circle"></i>
                              </Link>
                              <Link
                                className="btn btn-sm btn-info border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button className="btn btn-sm btn-danger border-0 shadow">
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

export default Exam;
