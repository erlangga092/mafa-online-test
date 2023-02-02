import { Head, router } from "@inertiajs/react";
import React from "react";
import LayoutAuth from "@/Layouts/Auth";

const Login = ({ session, errors }) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/login", form);
  };

  return (
    <>
      <Head>
        <title>Login Administrator - Aplikasi Ujian Online</title>
      </Head>
      <LayoutAuth>
        <div className="bg-white shadow border-0 rounded-border-light p-4 p-lg-5 w-100 fmxw-500">
          <div className="text-center text-md-center mb-4 mt-md-0">
            <h3>ADMINISTRATOR</h3>
          </div>
          <form onSubmit={onSubmit} className="mt-4">
            <div className="form-group mb-4">
              <label htmlFor="">Email Address</label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              {errors?.email && (
                <div className="alert alert-danger mt-2">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <div className="form-group mb-4">
                <label htmlFor="">Password</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                {errors?.password && (
                  <div className="alert alert-danger mt-2">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-top mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="remember"
                  />
                  <label className="form-check-label mb-0" htmlFor="remember">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-gray-800">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
};

export default Login;
