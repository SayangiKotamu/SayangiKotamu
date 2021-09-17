function Content() {
  return (
    <>
      <div
        class="grid grid-cols-3 mt-2"
        style={{
          height: "400px",
        }}
      >
        <div
          class="card-body col-span-3"
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
                <h1 class="mb-1 text-xl font-bold">Status Pengaduan</h1>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="mb-2 text-xl font-bold text-right">
                Kategori Pengaduan
              </h1>
            </div>
          </div>
          <div class="mt-8">
            <h1 class="mb-1 text-xl font-bold">Deskripsi</h1>
            <p class="text-xl text-justify" style={{ width: "100%" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="mt-8">
            <h1 class="mb-1 text-xl font-bold">Tanggal Pemasukan</h1>
            <p class="text-xl text-justify" style={{ width: "100%" }}>
              21 Desember 2021
            </p>
          </div>
          <div class="mt-8">
            <h1 class="mb-1 text-xl font-bold">Tanggal Penyelesaian</h1>
            <p class="text-xl text-justify" style={{ width: "100%" }}>
              22 Desember 2022
            </p>
          </div>
          <button
            class="btn btn-block mt-10 mb-3"
            style={{ backgroundColor: "#1A73E9" }}
          >
            Proses
          </button>
        </div>
      </div>
    </>
  );
}

export default Content;
