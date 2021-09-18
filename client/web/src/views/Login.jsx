import React, { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useHistory();

  const handleToRegister = () => {
    history.push("/daftar");
  };

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Tolong isikan email/password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      history.push("/beranda");
    }
  };

  return (
    <>
      <ToastContainer />

      <img
        src="https://i.imgur.com/GKQ7zUt_d.webp?maxwidth=760&fidelity=grand"
        alt="Logo"
        style={{ width: "10%", height: "10%" }}
      />

      <div
        class="hero min-h-screen bg-base-200"
        style={{ backgroundColor: "white", marginTop: "-10%" }}
      >
        <div class="col-6 hero-content lg:flex-row">
          <div
            class="text-center lg:text-left"
            style={{ width: "100%", marginRight: "10%" }}
          >
            <h1 class="mb-5 text-5xl font-bold">Selamat datang, warga!</h1>
            <p class="mb-5 text-xl italic">
              "SayangiKotamu merupakan platform super-app city yang didesain
              sebagai one-stop service untuk membantu warga Indonesia mengatasi
              masalah sehari-hari. Dengan SmartApp, warga dan pemerintah dapat
              bersinergi secara efektif dan efisien untuk menuntaskan
              permasalahan kota secara digital, demi menunjang industri 4.0
              serta menciptakan sumber daya manusia yang siap untuk
              berkontribusi dalam kemajuan kota dari berbagai aspek."
            </p>
          </div>
          <div class="card col-6 w-full max-w shadow-2xl bg-base-500">
            <div class="card-body" style={{ backgroundColor: "#C8C6C6" }}>
              <form action="" type="submit" onSubmit={handleLogin}>
                <div class="text-center">
                  <h1 class="mb-3 text-4xl font-bold">Masuk</h1>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    class="input input-bordered"
                    onChange={forEmail}
                    value={email}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    class="input input-bordered"
                    onChange={forPaswword}
                    value={password}
                  />
                </div>
                <div class="form-control mt-6 mb-3">
                  <input
                    type="submit"
                    value="Masuk"
                    class="btn"
                    style={{ backgroundColor: "#05DAA7" }}
                  />
                </div>
                <label class="label-text-alt text-center">
                  <p>
                    Belum mempunyai akun?{" "}
                    <a
                      href="#"
                      style={{ color: "blue" }}
                      onClick={() => {
                        handleToRegister();
                      }}
                    >
                      Daftar disini.
                    </a>
                  </p>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
