import React, { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";

function Announcement() {
  const history = useHistory();

  const handleToDashboard = () => {
    history.push("/beranda");
  };

  const handleSubmitAnnouncement = (e) => {
    e.preventDefault();
    if (message === "") {
      toast.error("Anda belum memberikan pengumuman apapun", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      history.push("/beranda");
    }
  };

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const forMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const forTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  return (
    <>
      <ToastContainer />
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
              <h2 class="mb-5 text-3xl font-bold">Pengumuman</h2>
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
              <form action="" type="submit" onSubmit={handleSubmitAnnouncement}>
                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">Judul</span>
                  </label>
                  <input
                    placeholder=""
                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    onChange={forTitle}
                    value={title}
                  />
                </div>

                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">Isi Pengumuman</span>
                  </label>
                  <textarea
                    rows="10"
                    placeholder=""
                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    onChange={forMessage}
                    value={message}
                  />
                </div>

                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">Penanggung Jawab</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    class="input input-bordered"
                    value={"Yang login kesini"}
                    disabled
                  />
                </div>
                <div class="form-control mt-6 mb-3">
                  <input
                    type="submit"
                    value="Buat Pengumuman"
                    class="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;
