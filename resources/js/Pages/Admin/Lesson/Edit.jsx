import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Edit = ({ errors, lesson }) => {
  const [form, setForm] = React.useState({
    title: lesson.title,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.put(
      `/admin/lessons/${lesson.id}`,
      {
        title: form.title,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Pelajaran Berhasil Diupdate!.",
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
        <title>Edit Mata Pelajaran - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                href="/admin/lessons"
                className="btn btn-md btn-primary border-0 shadow mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-bookmark"></i> Edit Pelajaran
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label>Nama Pelajaran</label>
                      <input
                        type="text"
                        value={form.title}
                        className="form-control"
                        placeholder="Masukkan Nama Pelajaran"
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

                    <button
                      type="submit"
                      className="btn btn-md btn-primary border-0 shadow me-2"
                    >
                      Update
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

export default Edit;
