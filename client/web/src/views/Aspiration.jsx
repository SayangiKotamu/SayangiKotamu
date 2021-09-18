import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import AspirationView from "../components/AspirationView";
import { fetchAspiration } from "../stores/aspiration/action";

function Announcement() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { aspiration, loading, error } = useSelector(
    (state) => state.aspiration
  );

  useEffect(() => {
    dispatch(fetchAspiration());
  }, []);

  if (loading) {
    return (
      <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_dXaGKl.json"
        background="transparent"
        speed="1"
        style={{
          width: "500px",
          height: "500px",
          marginLeft: "40%",
          marginTop: "10%",
        }}
        loop
        autoplay
      ></lottie-player>
    );
  }

  if (error) {
    toast.error("Mohon maaf, terjadi kesalahan pada server.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleToDashboard = () => {
    history.push("/beranda");
  };

  return (
    <>
      <ToastContainer />
      <div
        className="min-h-screen bg-cover"
        style={{
          backgroundColor: "#C1FFD7",
        }}
      >
        <Navbar />
        <div
          className="container"
          style={{ marginLeft: "10%", marginTop: "5%" }}
        >
          <div className="justify-between grid grid-cols-2">
            <div>
              <h2 className="mb-5 text-3xl font-bold">Aspirasi Warga</h2>
            </div>
            <div className="text-right">
              <button
                className="btn btn-square btn-ghost mt-2"
                onClick={handleToDashboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="card" style={{ backgroundColor: "white" }}>
            <div className="m-8">
              <div className="overflow-x-auto" style={{ height: "600px" }}>
                <table className="table w-full table-compact">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Dinas</th>
                      <th>Deskripsi</th>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  {aspiration.map((aspirasi) => {
                    return (
                      <AspirationView aspirasi={aspirasi} key={aspirasi.id} />
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;