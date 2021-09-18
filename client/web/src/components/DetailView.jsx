function DetailView() {
  return (
    <div
      className="grid grid-cols-5"
      style={{ height: "650px", borderWidth: 1, borderRadius: 5 }}
    >
      <div
        className="card-body col-span-2"
        style={{
          backgroundColor: "white",
          borderWidth: 1,
        }}
      >
        <h2 className="mb-5 text-2xl font-bold">JKT-70001218471804616</h2>
        <div>
          <div
            class="card-image"
            style={{
              backgroundColor: "white",
            }}
          >
            <img
              src="https://asset.kompas.com/crops/7fr0HHmOZofCnrC3MXGUCGGEpvM=/81x0:670x393/750x500/data/photo/2021/09/09/6139b38cc5b10.jpg"
              alt="No Image"
              style={{ height: "200px", width: "100%", borderWidth: 1 }}
            />
          </div>
          <div class="justify-between grid grid-cols-2">
            <div class="mr-3">
              <button class="btn btn-square btn-ghost mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                </svg>
                <h1 class="mb-2 text-l font-bold text-right">33.3k</h1>
              </button>
            </div>
            <div style={{ marginLeft: "80%" }}>
              <button class="btn btn-square btn-ghost mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
                </svg>
                <h1 class="mb-2 text-l font-bold text-right">12.3k</h1>
              </button>
            </div>
          </div>
          <div
            class="card-image mt-2"
            style={{
              backgroundColor: "white",
            }}
          >
            <img
              src="http://blog.idkeyword.com/wp-content/uploads/2015/02/memilih-menu-whats-here.jpg"
              alt="No Image"
              style={{ height: "200px", width: "100%", borderWidth: 1 }}
            />
          </div>
          <div class="justify-between grid grid-cols-2 mt-3">
            <div class="mr-3">
              <div class="mb-6">
                <h1 class="mb-1 text-l font-bold">Lokasi</h1>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="mb-2 text-l text-right">Bandung, Jawa Barat</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card-body col-span-3"
        style={{
          backgroundColor: "white",
          borderWidth: 1,
        }}
      >
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
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
      </div>
    </div>
  );
}

export default DetailView;
