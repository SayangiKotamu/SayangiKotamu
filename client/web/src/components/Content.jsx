import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

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

  useEffect(() => {
    if (props?.kategori !== undefined) {
      dispatch(fetchReportByCategory(props?.kategori));
    }
  }, []);

  console.log("ini di konten", reports);
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
            handleToDetail(props?.report?._id);
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
              src={props?.report?.picture}
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
                <p className="truncate text-m">{props?.report?.title}</p>
              </div>
              <div>
                <h1 className="mb-1 text-l font-bold">Deskripsi</h1>
                <p className="truncate text-m">{props?.report?.description}</p>
              </div>
            </div>
            <div className="ml-3">
              <div div className="mb-6">
                <h1 className="mb-1 text-l font-bold text-right">
                  Tanggal Masuk
                </h1>
                <p className="truncate text-m text-right">
                  {props?.report?.issuedDate}
                </p>
              </div>
              <div>
                <h1 className="mb-1 text-l font-bold text-right">Lokasi</h1>
                <p className="truncate text-m text-right">
                  {props?.report?.location}
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
