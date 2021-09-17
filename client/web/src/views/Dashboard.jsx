import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Category from "../components/Category";

function Dashboard() {
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
            <h2 class="mb-5 text-3xl font-bold">Kumpulan Pengaduan</h2>
            <div
              class="grid grid-cols-3"
              style={{ height: "650px", borderWidth: 1, borderRadius: 5 }}
            >
              <div
                class="card-body"
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              >
                <h2 class="text-center mb-5 text-2xl font-bold">Pengaduan</h2>
                <Category />
              </div>
              <div
                class="card-body col-span-2"
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              >
                <h2 class="text-center mb-5 text-2xl font-bold">
                  Masalah Lalu Lintas
                </h2>
                <div
                  class="card-body overflow-auto"
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderRadius: 5,
                    maxHeight: "500px",
                  }}
                >
                  <Content />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
