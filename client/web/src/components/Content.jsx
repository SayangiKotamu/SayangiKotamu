import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import getFormatedDate from "../helpers/formatedDate";
import { fetchReportByCategory } from "../stores/reports/action";

function Content(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { reports, loading, error } = useSelector((state) => state.report);

  const handleToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  // useEffect(() => {
  //   dispatch(fetchReportByCategory(props.kategori));
  // }, [props.kategori]);

  if (loading) {
    return (
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

  console.log("ini di konten", reports);
  return (
    <>
      <ToastContainer />
      {reports.map((report) => {
        return (
          <div
            className="grid grid-cols-3 mt-2"
            style={{
              height: "170px",
              borderWidth: 1,
              borderColor: "white",
            }}
          >
            <a
              href="#"
              onClick={() => {
                handleToDetail(report._id);
              }}
              key={id}
            >
              <div
                className="card-image"
                style={{
                  backgroundColor: "white",
                }}
              >
                <img
                  src={report.picture}
                  alt="No Image"
                  style={{ height: "168px", width: "100%" }}
                />
              </div>
            </a>
            <div
              className="card-body col-span-2"
              style={{
                backgroundColor: "#f15447",
              }}
            >
              <div
                className="justify-between grid grid-cols-2"
                style={{ marginTop: "-3%", marginBottom: "-3%" }}
              >
                <div className="mr-3">
                  <div className="mb-6">
                    <h1
                      className="mb-1 text-l font-bold"
                      style={{ color: "white" }}
                    >
                      Judul Pengaduan
                    </h1>
                    <p className="truncate text-m" style={{ color: "white" }}>
                      {report.title}
                    </p>
                  </div>
                  <div>
                    <h1
                      className="mb-1 text-l font-bold"
                      style={{ color: "white" }}
                    >
                      Deskripsi
                    </h1>
                    <p className="truncate text-m" style={{ color: "white" }}>
                      {report.description}
                    </p>
                  </div>
                </div>
                <div className="ml-3">
                  <div div className="mb-6">
                    <h1
                      className="mb-1 text-l font-bold text-right"
                      style={{ color: "white" }}
                    >
                      Tanggal Masuk
                    </h1>
                    <p
                      className="truncate text-m text-right"
                      style={{ color: "white" }}
                    >
                      {getFormatedDate(report.issuedDate)}
                    </p>
                  </div>
                  <div>
                    <h1
                      className="mb-1 text-l font-bold text-right"
                      style={{ color: "white" }}
                    >
                      Lokasi
                    </h1>
                    <p
                      className="truncate text-m text-right"
                      style={{ color: "white" }}
                    >
                      {report.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Content;
