import React from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import AspirationView from "../components/AspirationView";

function Announcement() {
  const history = useHistory();

  const handleToDashboard = () => {
    history.push("/beranda");
  };

  return (
    <>
      <div
        class="min-h-screen bg-cover"
        style={{
          backgroundColor: "#C1FFD7",
        }}
      >
        <Navbar />
        <div class="container" style={{ marginLeft: "10%", marginTop: "5%" }}>
          <div class="justify-between grid grid-cols-2">
            <div>
              <h2 class="mb-5 text-3xl font-bold">Aspirasi Warga</h2>
            </div>
            <div class="text-right">
              <button
                class="btn btn-square btn-ghost mt-2"
                onClick={handleToDashboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="card" style={{ backgroundColor: "white" }}>
            <div class="m-8">
              <div class="overflow-x-auto" style={{ height: "600px" }}>
                <table class="table w-full table-compact">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Dinas</th>
                      <th>Deskripsi</th>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <AspirationView />
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
