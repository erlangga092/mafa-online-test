import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Create = ({ errors }) => {
  const [form, setForm] = React.useState({
    title: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/admin/lessons", {
      title: form.title,
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Mata Pelajaran - Aplikasi Ujian Online</title>
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
                    <i className="fa fa-bookmark"></i> Tambah Pelajaran
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label>Nama Pelajaran</label>
                      <input
                        type="text"
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
                      Simpan
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

export default Create;
