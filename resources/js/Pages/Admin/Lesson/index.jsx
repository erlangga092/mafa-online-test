import Pagination from "@/Components/Pagination";
import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Lesson = ({ lessons }) => {
  const [search, setSearch] = React.useState(
    "" | new URL(window.document.location).searchParams.get("q")
  );

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/admin/lessons", {
      q: search,
    });
  };

  return (
    <>
      <Head>
        <title>Mata Pelajaran - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAdmin>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-3 col-12 mb-2">
                  <Link
                    href="/admin/lessons/create"
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
                            No.
                          </th>
                          <th className="border-0">Nama Mata Pelajaran</th>
                          <th
                            className="border-0 rounded-end"
                            style={{ width: "5%" }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <div className="mt-2"></div>
                      <tbody>
                        {lessons?.data?.map((lesson, index) => (
                          <tr key={index}>
                            <td className="fw-bold text-center">
                              {++index +
                                (lessons?.current_page - 1) * lessons?.per_page}
                            </td>
                            <td>{lesson.title}</td>
                            <td className="text-center">
                              <Link
                                className="btn btn-sm btn-info border-0 shadow me-2"
                                type="button"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>
                              <button className="btn btn-sm btn-danger border-0">
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination links={lessons.links} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Lesson;
