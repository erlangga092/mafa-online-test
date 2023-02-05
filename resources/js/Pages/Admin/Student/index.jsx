import Pagination from "@/Components/Pagination";
import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Student = ({ students }) => {
  const onDelete = (e, ID) => {
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
        router.delete(`/admin/students/${ID}`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Data Siswa Berhasil Dihapus!",
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
        <title>Siswa - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-5 col-12 mb-2">
                  <div className="row">
                    <div className="col-md-6 col-12 mb-2">
                      <Link
                        href="/admin/students/create"
                        className="btn btn-md btn-primary border-0 shadow w-100"
                        type="button"
                      >
                        <i className="fa fa-plus-circle"></i> Tambah
                      </Link>
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                      <Link
                        href="/admin/students/import"
                        className="btn btn-md btn-success border-0 shadow w-100 text-white"
                        type="button"
                      >
                        <i className="fa fa-file-excel"></i> Import
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-12 mb-2">
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
                          <th className="border-0">Nisn</th>
                          <th className="border-0">Nama</th>
                          <th className="border-0">Kelas</th>
                          <th className="border-0">Jenis Kelamin</th>
                          <th className="border-0">Password</th>
                          <th
                            className="border-0 rounded-end"
                            style={{ width: "%15" }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <div className="mt-2"></div>
                      <tbody>
                        {students?.data?.map((student, i) => (
                          <tr key={i}>
                            <td className="fw-bold text-center">
                              {++i +
                                (students?.current_page - 1) *
                                  students?.per_page}
                            </td>
                            <td>{student.nisn}</td>
                            <td>{student.name}</td>
                            <td className="text-center">
                              {student.classroom.title}
                            </td>
                            <td className="text-center">{student.password}</td>
                            <td className="text-center">{student.gender}</td>
                            <td className="text-center">
                              <Link
                                className="btn btn-sm btn-info border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger border-0"
                                type="button"
                                onClick={(e) => onDelete(e, student.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination links={students.links} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Student;
