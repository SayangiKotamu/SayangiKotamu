import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Bar } from "react-chartjs-2";
import ReactStars from "react-stars";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { fetchReportByCategory, fetchReports } from "../stores/reports/action";
import { fetchCategories } from "../stores/categories/action";
import { useHistory } from "react-router";

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [idCategory, setIDCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [ratingScore, setRatingScore] = useState(0);
  const [listCategoryName, setListCategoryName] = useState([]);
  const [totalReportByCategory, settotalReportPerCategory] = useState([]);
  const { categories, loadingCategory, error } = useSelector(
    (state) => state.category
  );
  const { reports, loadingReport, loadingReportCategory } = useSelector(
    (state) => state.report
  );
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn && !localStorage.getItem("access_token")) {
    toast.error("Tolong login terlebih dahulu.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/");
  }

  useEffect(() => {
    if (idCategory) {
      dispatch(fetchReportByCategory(idCategory));
    } else {
      dispatch(fetchReports());
    }
  }, [idCategory]);

  useEffect(() => {
    dispatch(fetchReports());
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

  useEffect(() => {
    if (!reports.length) {
      setRatingScore(0);
    } else {
      setRatingScore(reports[0].dinas.rating);
    }
  }, [reports]);

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
          marginBottom: "5%",
        }}
      >
        <Navbar />
        <div class="mx-auto">
          <div class="container" style={{ marginLeft: "10%" }}>
            <div class="justify-between grid grid-cols-2">
              <h2 class="mt-5 mb-5 text-3xl font-bold">
                Selamat datang, Pejuang Kota!
              </h2>
            </div>
            {ratingScore > 0 ? (
              <>
                <div
                  class="card shadow-xl"
                  style={{
                    backgroundColor: "#f7f7f7",
                    borderWidth: 2,
                    borderColor: "#f15447",
                  }}
                >
                  <div class="m-8">
                    <div class="mt-6 mb-3 p-5">
                      <p class="text-xl text-center" style={{ color: "black" }}>
                        Terima kasih banyak telah menanggapi keluh kesah para
                        masyarakat selama ini, semangat terus bapak dan ibu!
                        Dengan ini kami menyampaikan bahwa kami mempunyai
                        sistem, terkait dengan nilai/rating yang diberikan oleh
                        masyarakat terkait dengan cepat tanggap bapak ibu
                        terkait pelaporan, maupun dengan solusi yang diberikan.
                      </p>
                      <p class="text-xl text-center" style={{ color: "black" }}>
                        Berikut rata-rata rating yang diberikan oleh masyarakat
                        kepada Bapak dan Ibu:
                      </p>
                      <div
                        style={{
                          borderWidth: 1,
                          borderColor: "#f15447",
                          borderRadius: 10,
                          width: "13%",
                          marginLeft: "44%",
                          marginTop: "1%",
                        }}
                      >
                        <ReactStars
                          count={5}
                          edit={false}
                          size={40}
                          color1={"gray"}
                          color2={"#f15447"}
                          value={ratingScore}
                        />
                        <p class="text-xl text-center font-bold">
                          {ratingScore}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  class="card"
                  style={{
                    backgroundColor: "#f7f7f7",
                    borderWidth: 2,
                    borderColor: "#f15447",
                  }}
                >
                  <div class="m-8">
                    <div class="mt-6 mb-3">
                      <p class="text-xl text-center" style={{ color: "black" }}>
                        Terima kasih banyak telah menanggapi keluh kesah para
                        masyarakat selama ini, semangat terus bapak dan ibu!
                        Dengan ini kami menyampaikan bahwa kami mempunyai
                        sistem, terkait dengan nilai/rating yang diberikan oleh
                        masyarakat terkait dengan cepat tanggap bapak ibu
                        terkait pelaporan, maupun dengan solusi yang diberikan.
                      </p>
                      <p class="text-xl text-center" style={{ color: "black" }}>
                        Namun dikarenakan belum adanya penilaian dari pengguna
                        aplikasi kami, kami belum dapat memberikan informasi
                        terkait kepada Bapak dan Ibu.
                      </p>
                      <div
                        style={{
                          borderWidth: 1,
                          borderColor: "#f15447",
                          borderRadius: 10,
                          width: "13%",
                          marginLeft: "44%",
                          marginTop: "1%",
                        }}
                      >
                        <ReactStars
                          count={5}
                          edit={false}
                          size={40}
                          color1={"gray"}
                          color2={"#f15447"}
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
            <p
              class="text-xl text-center mb-6 mt-10"
              style={{ color: "black" }}
            >
              Berikut kami tampilkan progress pengaduan yang masuk secara
              keseluruhan, seluruh dinas yang menggunakan jasa kami:
            </p>
            <div
              className="card shadow-xl"
              style={{
                backgroundColor: "white",
                borderWidth: 2,
                borderColor: "#f15447",
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
            <p
              class="text-xl text-center mb-6 mt-10"
              style={{ color: "black" }}
            >
              Berikut kami tampilkan kumpulan pengaduan berdasarkan kategori
              yang masuk sesuai dengan dinas terkait yang menggunakan jasa kami:
            </p>
            <div className="grid grid-cols-3" style={{ height: "650px" }}>
              <div
                className="card-body shadow-xl"
                style={{
                  backgroundColor: "#f7f7f7",
                  borderWidth: 2,
                  borderColor: "#f15447",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              >
                <h2
                  className="text-center mb-5 text-2xl font-bold"
                  style={{ color: "black" }}
                >
                  Kategori Pengaduan
                </h2>

                <div>
                  <button
                    className="btn btn-block mb-3"
                    style={{ backgroundColor: "#f15447" }}
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
                        style={{ backgroundColor: "#f15447" }}
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
              </div>
              <div
                className="card-body col-span-2 shadow-xl"
                style={{
                  backgroundColor: "#f7f7f7",
                  borderColor: "#f15447",
                  borderWidth: 2,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                {!categoryName ? (
                  <>
                    <h2
                      className="text-center mb-5 text-2xl font-bold"
                      style={{ color: "black" }}
                    >
                      Seluruh Laporan
                    </h2>
                  </>
                ) : (
                  <>
                    <h2
                      className="text-center mb-5 text-2xl font-bold"
                      style={{ color: "black" }}
                    >
                      {categoryName}
                    </h2>
                  </>
                )}

                <div
                  className="card-body overflow-auto"
                  style={{
                    backgroundColor: "#f7f7f7",
                    borderColor: "#f15447",
                    borderWidth: 2,
                    borderRadius: 5,
                    maxHeight: "500px",
                  }}
                >
                  {loadingReport || loadingCategory ? (
                    <lottie-player
                      src="https://assets4.lottiefiles.com/packages/lf20_ojcfgj.json"
                      background="transparent"
                      speed="1"
                      style={{
                        width: "200px",
                        height: "200px",
                        marginLeft: "39%",
                      }}
                      loop
                      autoplay
                    ></lottie-player>
                  ) : (
                    <>
                      {reports.length > 0 ? (
                        reports.map((report) => {
                          return <Content report={report} />;
                        })
                      ) : (
                        <h1
                          className="text-center text-3xl"
                          style={{ color: "black" }}
                        >
                          Data tidak ditemukan!
                        </h1>
                      )}
                    </>
                  )}
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
