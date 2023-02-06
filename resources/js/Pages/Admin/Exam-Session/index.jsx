import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const ExamSession = ({ exam_sessions }) => {
  const [search, setSearch] = React.useState(
    "" || new URL(window.document.location).searchParams.get("q")
  );

  const onSearch = (e) => {};

  const onDelete = (e, ID) => {};

  return (
    <>
      <Head>
        <title>Sesi Ujian - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-3 col-12 mb-2">
                  <Link
                    href="/admin/exam_sessions/create"
                    className="btn btn-md btn-primary border-0 shadow w-100"
                    type="button"
                  >
                    <i className="fa fa-plus-circle"></i> Tambah
                  </Link>
                </div>
                <div className="col-md-9 col-12 mb-2">
                  <form onSubmit={onSearch}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-0 shadow"
                        placeholder="masukkan kata kunci dan enter..."
                        onChange={(e) => setSearch(e.target.value)}
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
                            No.{" "}
                          </th>
                          <th className="border-0">Ujian</th>
                          <th className="border-0">Sesi</th>
                          <th className="border-0">Siswa</th>
                          <th className="border-0">Mulai</th>
                          <th className="border-0">Selesai</th>
                          <th
                            className="border-0 rounded-end"
                            style={{ width: "15%" }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam_sessions?.data?.map((exam_session, i) => (
                          <tr>
                            <td className="fw-bold text-center">
                              {++i +
                                (exam_sessions?.current_page - 1) *
                                  exam_sessions.per_page}
                            </td>
                            <td className="fw-bold">
                              {exam_session.exam.title}{" "}
                              <strong>
                                <ul className="mt-2">
                                  <li>
                                    Kelas :{" "}
                                    <strong className="fw-bold">
                                      {exam_session.exam.classroom.title}
                                    </strong>
                                  </li>
                                  <li>
                                    Pelajaran :{" "}
                                    <strong className="fw-bold">
                                      {exam_session.exam.lesson.title}
                                    </strong>
                                  </li>
                                </ul>
                              </strong>
                            </td>
                            <td>{exam_session.title}</td>
                            <td className="text-center">
                              {exam_session.exam_groups.length}
                            </td>
                            <td>
                              {exam_session.start_time.split(" ").join(" - ")}
                            </td>
                            <td>
                              {exam_session.end_time.split(" ").join(" - ")}
                            </td>
                            <td className="text-center">
                              <Link
                                href={`/admin/exam_sessions/${exam_session.id}`}
                                className="btn btn-sm btn-primary border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-plus-circle"></i>
                              </Link>
                              <Link
                                href={`/admin/lessons/${exam_session.id}/edit`}
                                className="btn btn-sm btn-info border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger border-0"
                                type="button"
                                onClick={(e) => onDelete(e, exam_session.id)}
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

export default ExamSession;
