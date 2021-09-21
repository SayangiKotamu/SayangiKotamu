import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import Navbar from "../components/Navbar";
import { fetchReportById, patchReport } from "../stores/reports/action";
import getFormatedDate from "../helpers/formatedDate";

function Detail() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reportDetail, loading, error } = useSelector((state) => state.report);
  const [status, setStatus] = useState(reportDetail.status);

  console.log(id);

  useEffect(() => {
    dispatch(fetchReportById(id));
  }, []);

  console.log(reportDetail);

  const forStatus = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  console.log(status);

  const handleEditReport = (e) => {
    e.preventDefault();

    const payload = {
      status,
      finishedDate: new Date(),
    };

    if (payload.status === "Diterima") {
      toast.error("Anda belum mengubah report yang perlu diproses.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(patchReport(id, payload));
      history.push("/beranda");
    }
  };

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

  const position = [
    100, 21,
    // +reportDetail?.long?.$numberDecimal,
    // +reportDetail?.lat?.$numberDecimal,
  ];

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
              <div
                class="grid grid-cols-5"
                style={{ height: "650px", borderWidth: 1, borderRadius: 5 }}
              >
                <div
                  class="card-body col-span-2"
                  style={{
                    backgroundColor: "#f15447",
                    borderWidth: 1,
                  }}
                >
                  <h2 class="mb-5 text-2xl font-bold" style={{color: "white"}}>
                    {reportDetail?.category?.reports[0].title}
                  </h2>
                  <div>
                    <div
                      class="card-image"
                      style={{
                        backgroundColor: "white",
                      }}
                    >
                      <img
                        src={reportDetail?.category?.reports[0].picture}
                        alt="No Image"
                        style={{
                          height: "200px",
                          width: "100%",
                          borderWidth: 1,
                        }}
                      />
                    </div>
                    <div class="justify-between grid grid-cols-2">
                      <div class="mr-3">
                        <button class="btn btn-square btn-ghost mt-2" style={{color: "white"}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg>
                          <h1 class="text-l font-bold text-right ml-2">
                            {reportDetail?.category?.reports[0].upVote}
                          </h1>
                        </button>
                      </div>
                      <div style={{ marginLeft: "80%" }}>
                        <button class="btn btn-square btn-ghost mt-2" style={{color: "white"}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
  <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
</svg>
                          <h1 class="mb-2 mr-2 ml-2 text-l font-bold text-right">
                            {reportDetail?.category?.reports[0].downVote}
                          </h1>
                        </button>
                      </div>
                    </div>
                    <div
                      class="mt-2"
                      style={{
                        height: "220px",
                        width: "100%",
                        borderWidth: 1,
                      }}
                    >
                      <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ width: "100wh", height: "22.5vh" }}
                      >
                        <TileLayer
                          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                          url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=PbI47Jfo6miMbKKlBtFz"
                        />
                        <div style={{ height: "218px", width: "100%" }}></div>
                        <Marker position={position}>
                          <Popup>Lokasi pelaporan</Popup>
                        </Marker>
                      </MapContainer>
                      ,
                    </div>
                    <div class="justify-between grid grid-cols-2 mt-3">
                      <div class="mr-3">
                        <div class="mb-1">
                          <h1 class="mb-1 text-l font-bold" style={{color: "white"}}>Lokasi</h1>
                        </div>
                      </div>
                      <div class="ml-3">
                        <h1 class="mb-2 text-l text-right underline" style={{color: "white"}}>
                          {reportDetail?.category?.reports[0].location}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card-body col-span-3"
                  style={{
                    backgroundColor: "#f15447",
                    borderWidth: 1,
                  }}
                >
                  <div
                    class="grid grid-cols-3 mt-2"
                    style={{
                      height: "400px",
                    }}
                  >
                    <div
                      class="card-body col-span-3"
                      style={{
                        backgroundColor: "#f15447",
                      }}
                    >
                      <div
                        class="justify-between grid grid-cols-2"
                        style={{ marginTop: "-3%" }}
                      >
                        <div class="mr-3">
                          <div class="mb-6">
                            <select
                              class="select select-bordered w-full max-w-xs mb-1"
                              style={{ marginTop: "-2%" }}
                              onChange={forStatus}
                            >
                              <option
                                value={
                                  reportDetail?.category?.reports[0].status
                                }
                                selected
                                disabled
                              >
                                {reportDetail?.category?.reports[0].status}
                              </option>
                              <option value="diterima">diterima</option>
                              <option value="diproses">diproses</option>
                              <option value="selesai">selesai</option>
                            </select>
                          </div>
                        </div>
                        <div class="ml-3">
                          <h1 class="mb-2 text-xl font-bold text-right" style={{color: "white"}}>
                            {reportDetail?.category?.name}
                          </h1>
                        </div>
                      </div>
                      <div
                        className="overflow-auto"
                        style={{
                          height: "400px",
                        }}
                      >
                        <div class="mt-8">
                          <h1 class="mb-1 text-xl font-bold underline" style={{color: "white"}}>Deskripsi</h1>
                          <p
                            class="text-xl text-justify italic"
                            style={{ width: "100%", color: "white" }}
                          >
                            {reportDetail?.category?.reports[0].description}
                          </p>
                        </div>
                        <div class="mt-8">
                          <h1 class="mb-3 text-xl font-bold underline" style={{color: "white"}}>
                            Tanggal Pemasukan
                          </h1>
                          <p
                            class="text-xl text-justify italic"
                            style={{color: "white"}}
                          >
                            {getFormatedDate(reportDetail?.category?.reports[0].issuedDate)}
                          </p>
                        </div>
                        <div class="mt-8">
                          <h1 class="mb-1 text-xl font-bold underline" style={{color: "white"}}>
                            Tanggal Penyelesaian
                          </h1>
                          {reportDetail?.category?.reports[0].status !== 'selesai' ? (
                            <p
                              class="text-xl text-justify mt-2 italic"
                              style={{color: "white"}}
                            >
                              Sedang dalam proses
                            </p>
                          ) : (
                            <p
                              class="text-xl text-justify mt-2 italic"
                              style={{ width: "100%", color: "white" }}
                            >
                              {reportDetail?.category?.reports[0].finishedDate}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        class="btn btn-block mt-10"
                        style={{ backgroundColor: "black" }}
                        onClick={handleEditReport}
                      >
                        Proses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Detail;
