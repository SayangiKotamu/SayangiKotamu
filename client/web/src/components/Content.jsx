import React from "react";
import { useHistory, useParams } from "react-router";

import getFormatedDate from "../helpers/formatedDate";

function Content(props) {
  const history = useHistory();
  const { id } = useParams();

  const handleToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  return (
    <>
      <div
        className="grid grid-cols-3 mt-6 shadow-lg"
        style={{
          height: "170px",
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 8,
        }}
      >
        <a
          href="#"
          onClick={() => {
            handleToDetail(props.report._id);
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
              src={props.report.picture}
              alt="No Image"
              style={{ height: "168px", width: "100%" }}
            />
          </div>
        </a>
        <div
          className="card-body col-span-2"
          style={{
            backgroundColor: "white",
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
                  style={{ color: "#f15447" }}
                >
                  Judul Pengaduan
                </h1>
                <p className="truncate text-m" style={{ color: "black" }}>
                  {props.report.title}
                </p>
              </div>
              <div>
                <h1
                  className="mb-1 text-l font-bold"
                  style={{ color: "#f15447" }}
                >
                  Deskripsi
                </h1>
                <p className="truncate text-m" style={{ color: "black" }}>
                  {props.report.description}
                </p>
              </div>
            </div>
            <div className="ml-3">
              <div div className="mb-6">
                <h1
                  className="mb-1 text-l font-bold text-right"
                  style={{ color: "#f15447" }}
                >
                  Tanggal Masuk
                </h1>
                <p
                  className="truncate text-m text-right"
                  style={{ color: "black" }}
                >
                  {getFormatedDate(props.report.issuedDate)}
                </p>
              </div>
              <div>
                <h1
                  className="mb-1 text-l font-bold text-right"
                  style={{ color: "#f15447" }}
                >
                  Lokasi
                </h1>
                <p
                  className="truncate text-m text-right"
                  style={{ color: "black" }}
                >
                  {props.report.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
