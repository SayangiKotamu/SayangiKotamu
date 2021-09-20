import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Bar } from "react-chartjs-2";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { fetchCategories } from "../stores/categories/action";

function Dashboard() {
  const dispatch = useDispatch();
  const [kategori, setKategori] = useState();
  const { categories, loading, error } = useSelector((state) => state.category);
  // console.log(kategori);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  console.log(categories);

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
                      "Lalu Lintas",
                      "Sarana/Pra Sarana",
                      "Kriminal",
                      "Kesehatan",
                      "Kebersihan",
                      "Lainnya",
                    ],
                    datasets: [
                      {
                        label: "Laporan Masuk Per Kategori",
                        data: [1, 1, 0, 1, 0, 0],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
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
                    backgroundColor: "white",
                    borderWidth: 1,
                  }}
                >
                  <h2 className="text-center mb-5 text-2xl font-bold">
                    Kategori Pengaduan
                  </h2>
                  {categories.map((category) => {
                    return (
                      <div>
                        <button
                          className="btn btn-block mb-3"
                          style={{ backgroundColor: "#05DAA7" }}
                          onClick={(e) => {
                            e.preventDefault();
                            // setKategori(e.target.value);
                          }}
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
                    <Content kategori={kategori} />
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
