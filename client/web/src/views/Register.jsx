import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { registering } from "../stores/authentication/action";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loadingRegister } = useSelector((state) => state.auth);

  const handleToLogin = () => {
    history.push("/");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const forPaswword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const forName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    if (
      payload.email === "" ||
      payload.password === "" ||
      payload.name === ""
    ) {
      toast.error("Mohon diisi sesuai dengan kebutuhan di bawah!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(registering(payload));
      toast.success("Terima kasih sudah mendaftar, silahkan masuk.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <nav>
        <img
          src="https://i.imgur.com/GKQ7zUt_d.webp?maxwidth=760&fidelity=grand"
          alt="Logo"
          style={{ width: "15%", height: "15%", marginLeft: "42%" }}
        />
      </nav>
      <div
        class="hero min-h-screen bg-base-200"
        style={{ backgroundColor: "white", marginTop: "-10%" }}
      >
        <div class="col-6 hero-content lg:flex-row">
          <div
            class="text-center lg:text-left"
            style={{ width: "100%", marginRight: "10%" }}
          >
            <h1 class="mb-5 text-5xl font-bold">Selamat datang!</h1>
            <p class="mb-5 text-lg italic text-gray-500">
              SayangiKotamu merupakan platform super-app city yang didesain
              sebagai one-stop service untuk membantu warga Indonesia mengatasi
              permasalahan kota sehari-hari.
            </p>
          </div>
          <div class="card col-6 w-full max-w shadow-2xl bg-base-500">
            <div class="card-body" style={{ backgroundColor: "#f7f7f7" }}>
              <div class="text-center">
                <h1 class="mb-3 text-4xl font-bold">Daftar</h1>
              </div>
              <form action="" onSubmit={handleRegister}>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text" style={{ color: "#f15447" }}>
                      Nama Instansi
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Instansi"
                    class="input input-bordered"
                    onChange={forName}
                    value={name}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text" style={{ color: "#f15447" }}>
                      Email
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="E-mail"
                    class="input input-bordered"
                    onChange={forEmail}
                    value={email}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text" style={{ color: "#f15447" }}>
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Kata Sandi"
                    class="input input-bordered"
                    onChange={forPaswword}
                    value={password}
                  />
                </div>

                {loadingRegister ? (
                  <lottie-player
                    src="https://assets4.lottiefiles.com/packages/lf20_ojcfgj.json"
                    background="transparent"
                    speed="1"
                    style={{
                      width: "200px",
                      height: "70px",
                      marginLeft: "28%",
                    }}
                    loop
                    autoplay
                  ></lottie-player>
                ) : (
                  <div className="form-control mt-6 mb-3">
                    <input
                      type="submit"
                      value="Daftar"
                      className="btn"
                      style={{ backgroundColor: "#f15447" }}
                    />
                  </div>
                )}
              </form>
              <label class="label-text-alt text-center">
                <p className="text-md">
                  Sudah mempunyai akun sebelumnya?{" "}
                  <a
                    href="#"
                    style={{ color: "#6382ff" }}
                    onClick={() => {
                      handleToLogin();
                    }}
                  >
                    Masuk disini.
                  </a>
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
