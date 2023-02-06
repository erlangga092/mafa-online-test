import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Show = ({ exam_session }) => {
  console.log(exam_session);

  const renderTimeWithUnicode = (time) => {
    const splitTime = time.split(" ");
    return (
      <p>
        {splitTime[0]} &#8226; {splitTime[1]}
      </p>
    );
  };

  return (
    <>
      <Head>
        <title>Detail Sesi Ujian - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href="/admin/exam_sessions"
                class="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i class="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>

              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-stopwatch"></i> Detail Sesi Ujian
                  </h5>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <tbody>
                        <tr>
                          <td className="fw-bold" style={{ width: "30%" }}>
                            Nama Ujian
                          </td>
                          <td>{exam_session.exam.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Mata Pelajaran</td>
                          <td>{exam_session.exam.lesson.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Kelas</td>
                          <td>{exam_session.exam.classroom.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Sesi</td>
                          <td>{exam_session.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Mulai</td>
                          <td>
                            {renderTimeWithUnicode(exam_session.end_time)}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Selesai</td>
                          <td>
                            {renderTimeWithUnicode(exam_session.start_time)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-user-plus"></i> Enrolled Siswa
                  </h5>
                  <hr />
                  <Link
                    href={`/admin/exam_sessions/${exam_session.id}/enrolle/create`}
                    className="btn btn-md btn-primary border-0 shadow me-2"
                    type="button"
                  >
                    <i className="fa fa-user-plus"></i> Enrolle Siswa
                  </Link>
                  <div className="table responsive mt-3">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th
                            className="border-0 rounded-start"
                            style={{ width: "5%" }}
                          >
                            No.{" "}
                          </th>
                          <th className="border-0">Nama Siswa</th>
                          <th className="border-0">Kelas</th>
                          <th className="border-0">Jenis Kelamin</th>
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
                        {exam_session?.exam_groups?.data?.map((data, i) => (
                          <tr>
                            <td className="fw-bold text-center">1</td>
                            <td>{data?.student?.name}</td>
                            <td className="text-center">
                              {data?.student?.classroom.title}
                            </td>
                            <td className="text-center">
                              {data?.student?.gender}
                            </td>
                            <td className="text-center">
                              <button className="btn btn-sm btn-danger border-0">
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
