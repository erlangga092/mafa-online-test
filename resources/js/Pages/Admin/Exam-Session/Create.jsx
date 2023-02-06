import LayoutAdmin from "@/Layouts/Admin";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import DatePicker from "react-datepicker";

const Create = ({ errors, exams }) => {
  const [form, setForm] = React.useState({
    title: "",
    exam_id: exams[0].id,
    start_time: new Date(),
    end_time: new Date(),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/admin/exam_sessions", form);
  };

  return (
    <>
      <Head>
        <title>Tambah Sesi Ujian - Aplikasi Ujian Online</title>
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
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5>
                    <i className="fa fa-bookmark"></i> Tambah Sesi Ujian
                  </h5>
                  <hr />
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Nama Sesi</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Sesi"
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
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Ujian</label>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                exam_id: e.target.value,
                              })
                            }
                          >
                            {exams?.map((exam) => (
                              <option value={exam.id}>{exam.title}</option>
                            ))}
                          </select>

                          {errors?.exam_id && (
                            <div className="alert alert-danger mt-2">
                              {errors.exam_id}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Waktu Mulai</label>
                          <DatePicker
                            className="form-control"
                            selected={form.start_time}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MM/dd/yyyy H:mm"
                            onChange={(date) =>
                              setForm({
                                ...form,
                                start_time: date,
                              })
                            }
                          />
                          {errors?.start_time && (
                            <div className="alert alert-danger mt-2">
                              {errors.start_time}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="">Waktu Selesai</label>
                          <DatePicker
                            className="form-control"
                            selected={form.end_time}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MM/dd/yyyy H:mm"
                            onChange={(date) =>
                              setForm({
                                ...form,
                                end_time: date,
                              })
                            }
                          />
                          {errors?.end_time && (
                            <div className="alert alert-danger mt-2">
                              {errors.end_time}
                            </div>
                          )}
                        </div>
                      </div>
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
