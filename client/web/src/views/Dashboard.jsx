import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Bar } from "react-chartjs-2";
import ReactStars from "react-stars";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { fetchReportByCategory, fetchReports } from "../stores/reports/action";
import { fetchCategories } from "../stores/categories/action";
import { fetchRating } from "../stores/rating/action";

function Dashboard() {
  const dispatch = useDispatch();
  const [idCategory, setIDCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [ratingScore, setRatingScore] = useState(0);
  const [listCategoryName, setListCategoryName] = useState([]);
  const [totalReportByCategory, settotalReportPerCategory] = useState([]);
  const { categories, loading, error } = useSelector((state) => state.category);
  const { reports } = useSelector((state) => state.report);
  const { rating } = useSelector((state) => state.rating);

  useEffect(() => {
    dispatch(fetchReportByCategory(idCategory));
  }, [idCategory]);

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchRating());
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    let categoriesName = categories.map((category) => {
      return category.name;
    });
    let totalReportsPerCategory = categories.map((category) => {
      return category.reports.length;
    });

    setListCategoryName(categoriesName);
    settotalReportPerCategory(totalReportsPerCategory);
  }, [categories]);

  console.log(categories);

  useEffect(() => {
    let yourRate = rating.map((rate) => {
      return rate.rating;
    });

    setRatingScore(yourRate);
  }, [rating]);

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
          marginBottom: "2%",
        }}
      >
        <Navbar />
        <>
          <div class="container" style={{ marginLeft: "10%" }}>
            <div class="justify-between grid grid-cols-2">
              <h2 class="mt-5 mb-5 text-3xl font-bold">
                Selamat datang, Pejuang Negara!
              </h2>
            </div>
            {ratingScore > 0 ? (
              <>
                <div class="card" style={{ backgroundColor: "#f15447" }}>
                  <div class="m-8">
                    <div class="mt-6 mb-3">
                      <p class="text-xl text-center" style={{ color: "white" }}>
                        Terima kasih banyak telah menanggapi keluh kesah para
                        masyarakat selama ini, semangat terus bapak dan ibu!
                        Dengan ini kami menyampaikan bahwa kami mempunyai
                        sistem, terkait dengan nilai/rating yang diberikan oleh
                        masyarakat terkait dengan cepat tanggap bapak ibu
                        terkait pelaporan, maupun dengan solusi yang diberikan.
                      </p>
                      <p class="text-xl text-center" style={{ color: "white" }}>
                        Berikut rata-rata rating yang diberikan oleh masyarakat
                        kepada Bapak dan Ibu:
                      </p>
                      <div
                        style={{
                          borderWidth: 1,
                          width: "7%",
                          marginLeft: "46.5%",
                          marginTop: "1%",
                        }}
                      >
                        <ReactStars
                          count={5}
                          edit={false}
                          size={30}
                          color1={"gray"}
                          color2={"black"}
                          value={ratingScore}
                        />
                        <p class="text-xl text-center font-bold underline">
                          {ratingScore}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="card" style={{ backgroundColor: "#f15447" }}>
                  <div class="m-8">
                    <div class="mt-6 mb-3">
                      <p class="text-xl text-center" style={{ color: "white" }}>
                        Terima kasih banyak telah menanggapi keluh kesah para
                        masyarakat selama ini, semangat terus bapak dan ibu!
                        Dengan ini kami menyampaikan bahwa kami mempunyai
                        sistem, terkait dengan nilai/rating yang diberikan oleh
                        masyarakat terkait dengan cepat tanggap bapak ibu
                        terkait pelaporan, maupun dengan solusi yang diberikan.
                      </p>
                      <p class="text-xl text-center" style={{ color: "white" }}>
                        Namun dikarenakan belum adanya penilaian dari pengguna
                        aplikasi kami, kami belum dapat memberikan informasi
                        terkait kepada Bapak dan Ibu.
                      </p>
                      <div
                        style={{
                          borderWidth: 1,
                          width: "7%",
                          marginLeft: "46.5%",
                          marginTop: "1%",
                        }}
                      >
                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          color1={"gray"}
                          color2={"black"}
                          value={ratingScore}
                        />
                        <p class="text-xl text-center font-bold underline">
                          0.0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
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
                  labels: listCategoryName,
                  datasets: [
                    {
                      label: "Jumlah laporan masuk",
                      data: totalReportByCategory,
                      backgroundColor: ["#f15447"],
                      borderColor: ["#f15447"],
                      borderWidth: 1,
                      options: {
                        scales: {
                          y: {
                            display: true,
                            beginAtZero: true,
                          },
                        },
                      },
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
                {loading ? (
                  <lottie-player
                    src="https://assets9.lottiefiles.com/packages/lf20_dXaGKl.json"
                    background="transparent"
                    speed="1"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "10%",
                    }}
                    loop
                    autoplay
                  ></lottie-player>
                ) : (
                  <>
                    <div>
                      <button
                        className="btn btn-block mb-3"
                        style={{ backgroundColor: "black" }}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(fetchReports());
                          setCategoryName("Seluruh Laporan");
                        }}
                      >
                        Seluruh Laporan
                      </button>
                      {categories.map((category) => {
                        return (
                          <button
                            className="btn btn-block mb-3"
                            style={{ backgroundColor: "black" }}
                            onClick={(e) => {
                              e.preventDefault();
                              setIDCategory(category._id);
                              setCategoryName(category.name);
                            }}
                            value={category._id}
                          >
                            {category.name}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div
                className="card-body col-span-2"
                style={{
                  backgroundColor: "#f15447",
                  borderWidth: 1,
                }}
              >
                {!categoryName ? (
                  <>
                    <h2
                      className="text-center mb-5 text-2xl font-bold"
                      style={{ color: "white" }}
                    >
                      Seluruh Laporan
                    </h2>
                  </>
                ) : (
                  <>
                    <h2
                      className="text-center mb-5 text-2xl font-bold"
                      style={{ color: "white" }}
                    >
                      {categoryName}
                    </h2>
                  </>
                )}

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
                  {reports.length > 0 ? (
                    reports.map((report) => {
                      return <Content report={report} />;
                    })
                  ) : (
                    <h1
                      className="text-center text-3xl"
                      style={{ color: "white" }}
                    >
                      Data tidak ditemukan!
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default Dashboard;
