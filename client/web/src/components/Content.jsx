import { useHistory } from "react-router";

function Content() {
  const history = useHistory();

  const handleToDetail = () => {
    history.push("/detail");
  };

  return (
    <>
      <div
        class="grid grid-cols-3 mt-2"
        style={{
          height: "170px",
          borderWidth: 1,
        }}
      >
        <a
          href="#"
          onClick={() => {
            handleToDetail();
          }}
        >
          <div
            class="card-image"
            style={{
              backgroundColor: "white",
            }}
          >
            <img
              src="https://asset.kompas.com/crops/7fr0HHmOZofCnrC3MXGUCGGEpvM=/81x0:670x393/750x500/data/photo/2021/09/09/6139b38cc5b10.jpg"
              alt="No Image"
              style={{ height: "168px", width: "100%" }}
            />
          </div>
        </a>
        <div
          class="card-body col-span-2"
          style={{
            backgroundColor: "white",
          }}
        >
          <div
            class="justify-between grid grid-cols-2"
            style={{ marginTop: "-3%", marginBottom: "-3%" }}
          >
            <div class="mr-3">
              <div class="mb-6">
                <h1 class="mb-1 text-l font-bold">Laporan Pengaduan</h1>
                <p class="truncate text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure
                </p>
              </div>
              <div>
                <h1 class="mb-1 text-l font-bold">Lokasi</h1>
                <p class="truncate text-m">Pondok Cabe</p>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="mb-2 text-l font-bold text-right">Tanggal Masuk</h1>
              <p class="truncate text-right">22 Desember 2022</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-3 mt-2"
        style={{
          height: "170px",
          borderWidth: 1,
        }}
      >
        <div
          class="card-image"
          style={{
            backgroundColor: "white",
          }}
        >
          <img
            src="https://asset.kompas.com/crops/7fr0HHmOZofCnrC3MXGUCGGEpvM=/81x0:670x393/750x500/data/photo/2021/09/09/6139b38cc5b10.jpg"
            alt="No Image"
            style={{ height: "168px", width: "100%" }}
          />
        </div>
        <div
          class="card-body col-span-2"
          style={{
            backgroundColor: "white",
          }}
        >
          <div
            class="justify-between grid grid-cols-2"
            style={{ marginTop: "-3%", marginBottom: "-3%" }}
          >
            <div class="mr-3">
              <div class="mb-6">
                <h1 class="mb-1 text-l font-bold">Laporan Pengaduan</h1>
                <p class="truncate text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure
                </p>
              </div>
              <div>
                <h1 class="mb-1 text-l font-bold">Lokasi</h1>
                <p class="truncate text-m">Pondok Cabe</p>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="mb-2 text-l font-bold text-right">Tanggal Masuk</h1>
              <p class="truncate text-right">22 Desember 2022</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-3 mt-2"
        style={{
          height: "170px",
          borderWidth: 1,
        }}
      >
        <div
          class="card-image"
          style={{
            backgroundColor: "white",
          }}
        >
          <img
            src="https://asset.kompas.com/crops/7fr0HHmOZofCnrC3MXGUCGGEpvM=/81x0:670x393/750x500/data/photo/2021/09/09/6139b38cc5b10.jpg"
            alt="No Image"
            style={{ height: "168px", width: "100%" }}
          />
        </div>
        <div
          class="card-body col-span-2"
          style={{
            backgroundColor: "white",
          }}
        >
          <div
            class="justify-between grid grid-cols-2"
            style={{ marginTop: "-3%", marginBottom: "-3%" }}
          >
            <div class="mr-3">
              <div class="mb-6">
                <h1 class="mb-1 text-l font-bold">Laporan Pengaduan</h1>
                <p class="truncate text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure
                </p>
              </div>
              <div>
                <h1 class="mb-1 text-l font-bold">Lokasi</h1>
                <p class="truncate text-m">Pondok Cabe</p>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="mb-2 text-l font-bold text-right">Tanggal Masuk</h1>
              <p class="truncate text-right">22 Desember 2022</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-3 mt-2"
        style={{
          height: "170px",
          borderWidth: 1,
        }}
      >
        <div
          class="card-image"
          style={{
            backgroundColor: "white",
          }}
        >
          <img
            src="https://asset.kompas.com/crops/7fr0HHmOZofCnrC3MXGUCGGEpvM=/81x0:670x393/750x500/data/photo/2021/09/09/6139b38cc5b10.jpg"
            alt="No Image"
            style={{ height: "168px", width: "100%" }}
          />
        </div>
        <div
          class="card-body col-span-2"
          style={{
            backgroundColor: "white",
          }}
        >
          <div
            class="justify-between grid grid-cols-2"
            style={{ marginTop: "-3%", marginBottom: "-3%" }}
          >
            <div class="mr-3">
              <div class="mb-6">
                <h1 class="mb-1 text-l font-bold">Laporan Pengaduan</h1>
                <p class="truncate text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure
                </p>
              </div>
              <div>
                <h1 class="mb-1 text-l font-bold">Lokasi</h1>
                <p class="truncate text-m">Pondok Cabe</p>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="mb-2 text-l font-bold text-right">Tanggal Masuk</h1>
              <p class="truncate text-right">22 Desember 2022</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
