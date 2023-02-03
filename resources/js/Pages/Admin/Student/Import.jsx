import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Import = ({ errors }) => {
  const [form, setForm] = React.useState({
    file: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      "/admin/students/import",
      {
        file: form.file,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Import Siswa Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Import Data Siswa - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                className="btn btn-md btn-primary border-0 shadow mb-3 me-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Kembali
              </Link>
              <a
                href="/assets/excel/students.xls"
                className="btn btn-md btn-success border-0 shadow mb-3 text-white"
                target="_blank"
                type="button"
              >
                <i className="fa fa-file-excel me-2"></i> Contoh Format
              </a>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-user"></i> Import Siswa
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label htmlFor="">File Excel</label>
                      <input
                        type="file"
                        className="form-control"
                        onInput={(e) =>
                          setForm({
                            ...form,
                            file: e.target.files[0],
                          })
                        }
                      />
                      {errors?.file && (
                        <div className="alert alert-danger mt-2">
                          {errors?.file}
                        </div>
                      )}
                      {errors[0] && (
                        <div className="alert alert-danger mt-2">
                          {errors[0]}
                        </div>
                      )}
                    </div>
                    <button
                      className="btn btn-md btn-primary border-0 shadow me-2"
                      type="submit"
                    >
                      Upload
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

export default Import;
