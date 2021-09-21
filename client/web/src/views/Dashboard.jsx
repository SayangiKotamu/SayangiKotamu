import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Bar } from "react-chartjs-2";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { fetchReports } from "../stores/reports/action";
import { fetchCategories } from "../stores/categories/action";

function Dashboard() {
  const dispatch = useDispatch();
  const [kategori, setKategori] = useState();
  const { categories, loading, error } = useSelector((state) => state.category);
  // const { reports } = useSelector((state) => state.report);

  // useEffect(() => {
  //   dispatch(fetchReports());
  // }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const forKategori = (e) => {
    e.preventDefault();
    setKategori(e.target.value);
  };

  console.log(categories);
  console.log(kategori);

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
          backgroundColor: "white",
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
            <div
              className="container"
              style={{
                marginLeft: "10%",
                marginTop: "2%",
              }}
            >
              <h2 className="mb-5 text-3xl font-bold">Progress Pengaduan</h2>
              <div
                className="card"
                style={{
                  backgroundColor: "white",
                  borderWidth: 2,
                }}
              >
                <Bar
                  data={{
                    labels: [
                      categories[0].name,
                      categories[1].name,
                      categories[2].name,
                    ],
                    datasets: [
                      {
                        label: "Laporan Masuk Per Kategori",
                        data: [
                          categories[0].reports.length,
                          categories[1].reports.length,
                          categories[2].reports.length,
                        ],
                        backgroundColor: ["#f15447"],
                        borderColor: ["#f15447"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  width={100}
                  height={30}
                  style={{ margin: "2%" }}
                />
              </div>
            </div>
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
                    backgroundColor: "#f15447",
                    borderWidth: 1,
                  }}
                >
                  <h2
                    className="text-center mb-5 text-2xl font-bold"
                    style={{ color: "white" }}
                  >
                    Kategori Pengaduan
                  </h2>
                  {categories.map((category) => {
                    return (
                      <div>
                        <button
                          className="btn btn-block mb-3"
                          style={{ backgroundColor: "black" }}
                          onClick={forKategori}
                          value={category._id}
                        >
                          {category.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="card-body col-span-2"
                  style={{
                    backgroundColor: "#f15447",
                    borderWidth: 1,
                  }}
                >
                  <h2
                    className="text-center mb-5 text-2xl font-bold"
                    style={{ color: "white" }}
                  ></h2>
                  <div
                    className="card-body overflow-auto"
                    style={{
                      backgroundColor: "#f15447",
                      borderColor: "white",
                      borderWidth: 1,
                      borderRadius: 5,
                      maxHeight: "500px",
                    }}
                  >
                    {/* {reports.map((report) => { */}
                    {/* return ( */}
                    <Content
                      kategori={kategori}
                      // report={report}
                      // key={report.id}
                    />
                    {/* ); */}
                    {/* })} */}
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
