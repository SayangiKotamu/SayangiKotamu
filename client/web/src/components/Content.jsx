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
                  {props.report.title}
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
                  {props.report.description}
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
                  {getFormatedDate(props.report.issuedDate)}
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
