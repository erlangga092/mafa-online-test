import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Create = ({ errors, classrooms }) => {
  const [form, setForm] = React.useState({
    nisn: "",
    name: "",
    classroom_id: "",
    gender: "L",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/admin/students", form);
  };

  return (
    <>
      <Head>
        <title>Tambah Siswa - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href="/admin/students"
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-user"></i> Tambah Siswa
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Nisn</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nisn Siswa"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                nisn: e.target.value,
                              })
                            }
                          />
                          {errors?.nisn && (
                            <div className="alert alert-danger mt-2">
                              {errors.nisn}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Nama Lengkap</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Siswa"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                name: e.target.value,
                              })
                            }
                          />
                          {errors?.name && (
                            <div className="alert alert-danger mt-2">
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
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
                              <option key={classroom.id} value={classroom.id}>
                                {classroom.title}
                              </option>
                            ))}
                          </select>
                          {errors?.classroom_id && (
                            <div className="alert alert-danger mt-2">
                              {errors?.classroom_id}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Jenis Kelamin</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="L">Laki - laki</option>
                            <option value="P">Perempuan</option>
                          </select>
                          {errors?.gender && (
                            <div className="alert alert-danger mt-2">
                              {errors?.gender}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Masukkan Password"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                password: e.target.value,
                              })
                            }
                          />
                          {errors?.password && (
                            <div className="alert alert-danger mt-2">
                              {errors?.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Masukkan Konfirmasi Password"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                password_confirmation: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-md btn-primary border-0 shadow me-2"
                      type="submit"
                    >
                      Simpan
                    </button>
                    <button
                      className="btn btn-md btn-warning border-0 shadow"
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
