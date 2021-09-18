import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import DetailView from "../components/DetailView";
import { fetchReportById } from "../stores/reports/action";

function Detail() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reportDetail, loading, error } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchReportById(id));
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
          <div className="card">
            <div className="justify-between grid grid-cols-2">
              <div>
                <h2 className="mb-5 text-3xl font-bold">Detail Pengaduan</h2>
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
            <DetailView report={reportDetail} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
