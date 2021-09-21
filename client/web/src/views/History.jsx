import React from "react";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import HistoryView from "../components/HistoryView";
import { fetchAspiration } from "../stores/aspiration/action";

function Announcement() {
  const history = useHistory();

  const handleToDashboard = () => {
    history.push("/beranda");
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover"
        style={{
          backgroundColor: "white",
        }}
      >
        <Navbar />
        <div
          className="container"
          style={{ marginLeft: "10%", marginTop: "5%" }}
        >
          <div className="justify-between grid grid-cols-2">
            <div>
              <h2 className="mb-5 text-3xl font-bold">Riwayat</h2>
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
            className="card"
            style={{ backgroundColor: "white", borderWidth: 1 }}
          >
            <div className="m-8">
              <div className="overflow-x-auto" style={{ height: "600px" }}>
                <table className="table w-full table-compact">
                  <thead style={{ borderWidth: 1 }}>
                    <tr>
                      <th></th>
                      <th style={{ color: "#f15447" }}>Name</th>
                      <th style={{ color: "#f15447" }}>Job</th>
                      <th style={{ color: "#f15447" }}>company</th>
                      <th style={{ color: "#f15447" }}>location</th>
                      <th style={{ color: "#f15447" }}>Last Login</th>
                      <th style={{ color: "#f15447" }}>Favorite Color</th>
                    </tr>
                  </thead>
                  <HistoryView />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;
