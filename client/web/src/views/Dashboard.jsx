import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../stores/reports/action";
import { toast, ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Category from "../components/Category";

function Dashboard() {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.report);

  console.log(reports);
  useEffect(() => {
    dispatch(fetchReports());
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
            <h2 className="mb-5 text-3xl font-bold">Kumpulan Pengaduan</h2>
            <div
              className="grid grid-cols-3"
              style={{ height: "650px", borderWidth: 1, borderRadius: 5 }}
            >
              <div
                className="card-body"
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              >
                <h2 className="text-center mb-5 text-2xl font-bold">
                  Pengaduan
                </h2>
                <Category />
              </div>
              <div
                className="card-body col-span-2"
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              >
                <h2 className="text-center mb-5 text-2xl font-bold">
                  Masalah Lalu Lintas
                </h2>
                <div
                  className="card-body overflow-auto"
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderRadius: 5,
                    maxHeight: "500px",
                  }}
                >
                  {reports.map((report) => {
                    return <Content report={report} key={report.id} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
