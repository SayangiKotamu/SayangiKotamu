import Navbar from "../components/Navbar";
import Description from "../components/Description";
import Tracker from "../components/Tracker";
import { useHistory } from "react-router";

function Detail() {
  const history = useHistory();

  const handleToDashboard = () => {
    history.push("/dashboard");
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
          <div class="card">
            <div class="justify-between grid grid-cols-2">
              <div>
                <h2 class="mb-5 text-3xl font-bold">Detail Pengaduan</h2>
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
            <div
              class="grid grid-cols-5"
              style={{ height: "650px", borderWidth: 1, borderRadius: 5 }}
            >
              <div
                class="card-body col-span-2"
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              >
                <h2 class="mb-5 text-2xl font-bold">JKT-70001218471804616</h2>
                <Tracker />
              </div>
              <div
                class="card-body col-span-3"
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              >
                <Description />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
