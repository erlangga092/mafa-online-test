import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Show = ({ exam_session }) => {
  const renderTimeWithUnicode = (time) => {
    const splitTime = time.split(" ");
    return (
      <p>
        {splitTime[0]} &#8226; {splitTime[1]}
      </p>
    );
  };

  const onDestroy = (e, exam_session_id, data_id) => {
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
        router.delete(
          `/admin/exam_sessions/${exam_session_id}/enrolle/${data_id}/destroy`,
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Siswa Berhasil Dihapus!",
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
          }
        );
      }
    });
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
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
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
                      <tbody>
                        {exam_session?.exam_groups?.data?.map((data, i) => (
                          <tr key={i}>
                            <td className="fw-bold text-center">
                              {++i +
                                (exam_session.exam_groups.current_page - 1) *
                                  exam_session.exam_groups.per_page}
                            </td>
                            <td>{data?.student?.name}</td>
                            <td className="text-center">
                              {data?.student?.classroom.title}
                            </td>
                            <td className="text-center">
                              {data?.student?.gender}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-danger border-0"
                                type="button"
                                onClick={(e) =>
                                  onDestroy(e, exam_session.id, data.id)
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
