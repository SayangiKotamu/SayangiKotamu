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
        }}
      >
        <a
          href="#"
          onClick={() => {
            handleToDetail(props.report.id);
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
                <h1 className="mb-1 text-l font-bold">Laporan Pengaduan</h1>
                <p className="truncate text-m">{props.report.title}</p>
              </div>
              <div>
                <h1 className="mb-1 text-l font-bold">Deskripsi</h1>
                <p className="truncate text-m">{props.report.description}</p>
              </div>
            </div>
            <div className="ml-3">
              <div div className="mb-6">
                <h1 className="mb-1 text-l font-bold text-right">
                  Tanggal Masuk
                </h1>
                <p className="truncate text-m text-right">
                  {getFormatedDate(props.report.issued_date)}
                </p>
              </div>
              <div>
                <h1 className="mb-1 text-l font-bold text-right">Lokasi</h1>
                <p className="truncate text-m text-right">
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
