import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Create = ({ exam_session, students, errors, exam }) => {
  const [form, setForm] = React.useState({
    exam_id: exam.id,
    student_id: [],
    allSelected: false,
  });

  const onCheck = (e) => {
    setForm({
      ...form,
      student_id:
        [...form.student_id].indexOf(e.target.value) < 0
          ? [...form.student_id, e.target.value]
          : [...form.student_id.filter((v) => v != e.target.value)],
    });
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allStudentID = students.map((v) => v.id);
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-enrolle");

        for (const node of enrolleNode) {
          node.checked = true;
        }

        return {
          ...form,
          student_id: allStudentID,
        };
      });
    } else {
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-enrolle");

        for (const node of enrolleNode) {
          node.checked = false;
        }

        return {
          ...form,
          student_id: [],
        };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/admin/exam_sessions/${exam_session.id}/enrolle/store`,
      {
        exam_id: form.exam_id,
        student_id: form.student_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Enrolle Siswa Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Enrolle Siswa - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href={`/admin/exam_sessions/${exam_session.id}`}
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>

              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-user-plus"></i> Enrolle Siswa
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="table-responsive mb-4">
                      <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                        <thead className="thead-dark">
                          <tr className="border-0">
                            <th
                              className="border-0 rounded-top-left"
                              style={{ width: "5%" }}
                            >
                              <input
                                className="form-check-input check-enrolle"
                                type="checkbox"
                                onChange={(e) => onCheckAll(e)}
                              />
                            </th>
                            <th className="border-0">Nama Siswa</th>
                            <th className="border-0">Kelas</th>
                            <th className="border-0 rounded-top-right">
                              Jenis Kelamin
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {students?.map((student) => (
                            <tr>
                              <td>
                                <input
                                  className="form-check-input check-enrolle"
                                  type="checkbox"
                                  id={student.id}
                                  value={student.id}
                                  number
                                  onChange={(e) => onCheck(e)}
                                />
                              </td>
                              <td>{student.name}</td>
                              <td className="text-center">
                                {student.classroom.title}
                              </td>
                              <td className="text-center">{student.gender}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {errors?.student_id && (
                        <div className="alert alert-danger mt-2">
                          {errors?.student_id}
                        </div>
                      )}
                    </div>

                    <button
                      className="btn btn-md btn-primary border-0 shadow me-2"
                      type="submit"
                    >
                      Simpan
                    </button>
                    <button
                      className="btn btn-md btn-warning border-0 shadow me-2"
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
