import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { postCategories } from "../stores/categories/action";

function Announcement() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { loadingCategory } = useSelector((state) => state.category);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("access_token")) {
      history.push("/");
      toast.error("Tolong login terlebih dahulu.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  const forName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleToDashboard = () => {
    history.push("/beranda");
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();

    const payload = {
      name,
    };

    if (payload.name === "") {
      toast.error("Anda belum mengisi data sesuai kebutuhan kategori baru.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(postCategories(payload));
      toast.success("Kategori baru sudah terbuat!", {
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
      <div
        class="min-h-screen bg-cover"
        style={{
          backgroundColor: "white",
        }}
      >
        <Navbar />
        <div class="container" style={{ marginLeft: "10%", marginTop: "5%" }}>
          <div class="justify-between grid grid-cols-2">
            <div>
              <h2 class="mb-5 text-3xl font-bold">Kategori Baru</h2>
            </div>
            <div class="text-right">
              <button
                class="btn btn-square btn-ghost mt-2"
                onClick={handleToDashboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            class="card"
            style={{
              backgroundColor: "#f7f7f7",
              borderColor: "#f15447",
              borderWidth: 1,
            }}
          >
            <div class="m-8">
              <form action="" type="submit" onSubmit={handleSubmitCategory}>
                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text" style={{ color: "#f15447" }}>
                      Judul Kategori
                    </span>
                  </label>
                  <input
                    placeholder=""
                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    onChange={forName}
                    value={name}
                    style={{ color: "black" }}
                  />
                </div>
                {loadingCategory ? (
                  <lottie-player
                    src="https://assets4.lottiefiles.com/packages/lf20_ojcfgj.json"
                    background="transparent"
                    speed="1"
                    style={{
                      width: "200px",
                      height: "70px",
                      marginLeft: "44%",
                      marginTop: "1%",
                    }}
                    loop
                    autoplay
                  ></lottie-player>
                ) : (
                  <div class="form-control mt-6 mb-3">
                    <input
                      type="submit"
                      value="Buat Kategori"
                      class="btn"
                      style={{ backgroundColor: "#f15447" }}
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;
