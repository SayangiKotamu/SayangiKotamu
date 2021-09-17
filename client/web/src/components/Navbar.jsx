import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();

  const handleLogout = () => {
    history.push("/");
  };

  const handleAnnouncement = () => {
    history.push("/announcement");
  };

  const handleHistory = () => {
    history.push("/history");
  };

  const handleAspiration = () => {
    history.push("/aspiration");
  };

  return (
    <>
      <div
        class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"
        style={{ backgroundColor: "#1A73E9" }}
      >
        <div class="px-2 mx-2 navbar-start">
          <span class="text-lg font-bold">
            <Link to="/dashboard">SayangiKotamu</Link>
          </span>
        </div>
        <div class="hidden px-2 mx-2 navbar-center lg:flex">
          <div class="flex items-stretch">
            <a class="btn btn-ghost btn-sm rounded-btn">
              <Link
                to="/announcement"
                onClick={() => {
                  handleAnnouncement();
                }}
              >
                Pengumuman
              </Link>
            </a>
            <a class="btn btn-ghost btn-sm rounded-btn">
              <Link
                to="/history"
                onClick={() => {
                  handleHistory();
                }}
              >
                Riwayat
              </Link>
            </a>
            <a class="btn btn-ghost btn-sm rounded-btn">
              <Link
                to="/aspiration"
                onClick={() => {
                  handleAspiration();
                }}
              >
                Aspirasi Warga
              </Link>
            </a>
          </div>
        </div>
        <div class="navbar-end">
          <h1>Keluar</h1>
          <button
            class="btn btn-square btn-ghost"
            onClick={() => {
              handleLogout();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
