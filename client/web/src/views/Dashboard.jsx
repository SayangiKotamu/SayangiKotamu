import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../stores/reports/action";
import { toast, ToastContainer } from "react-toastify";
import { Bar } from "react-chartjs-2";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Category from "../components/Category";
import { fetchCategories } from "../stores/categories/action";

function Dashboard() {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.report);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchReports());
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
        {loading ? (
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_dXaGKl.json"
            background="transparent"
            speed="1"
            style={{
              width: "700px",
              height: "700px",
              marginLeft: "32%",
            }}
            loop
            autoplay
          ></lottie-player>
        ) : (
          <>
            <Bar
              // data={{
              //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              //   datasets: [
              //     {
              //       label: "# of Votes",
              //       data: [12, 19, 3, 5, 2, 3],
              //       backgroundColor: [
              //         "rgba(255, 99, 132, 0.2)",
              //         "rgba(54, 162, 235, 0.2)",
              //         "rgba(255, 206, 86, 0.2)",
              //         "rgba(75, 192, 192, 0.2)",
              //         "rgba(153, 102, 255, 0.2)",
              //         "rgba(255, 159, 64, 0.2)",
              //       ],
              //       borderColor: [
              //         "rgba(255, 99, 132, 1)",
              //         "rgba(54, 162, 235, 1)",
              //         "rgba(255, 206, 86, 1)",
              //         "rgba(75, 192, 192, 1)",
              //         "rgba(153, 102, 255, 1)",
              //         "rgba(255, 159, 64, 1)",
              //       ],
              //       borderWidth: 1,
              //     },
              //   ],
              // }}
              width={100}
              height={50}
              // options={{ maintainAspectRatio: false }}
            />
            <div
              className="container"
              style={{ marginLeft: "10%", marginTop: "5%" }}
            >
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
                    Kategori Pengaduan
                  </h2>
                  {categories.map((category) => {
                    return <Category category={category} />;
                  })}
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
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
