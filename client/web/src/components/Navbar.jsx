import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogStatus, setToken } from "../stores/authentication/action";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogStatus(false));
    dispatch(setToken(""));
    history.push("/");
  };

  return (
    <>
      <div
        className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"
        style={{ backgroundColor: "#1A73E9" }}
      >
        <div className="px-2 mx-2 navbar-start">
          <span className="text-lg font-bold">
            <Link to="/beranda">SayangiKotamu</Link>
          </span>
        </div>
        <div className="hidden px-2 mx-2 navbar-center lg:flex">
          <div className="flex items-stretch">
            <a className="btn btn-ghost btn-sm rounded-btn">
              <Link to="/pengumuman">Pengumuman</Link>
            </a>
            <a className="btn btn-ghost btn-sm rounded-btn">
              <Link to="/kategori-baru">Kategori Baru</Link>
            </a>
            <a className="btn btn-ghost btn-sm rounded-btn">
              <Link to="/riwayat">Riwayat</Link>
            </a>
            <a className="btn btn-ghost btn-sm rounded-btn">
              <Link to="/aspirasi">Aspirasi Warga</Link>
            </a>
          </div>
        </div>
        <div className="navbar-end">
          <h1 className="text-lg font-bold">Keluar</h1>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => {
              handleLogout();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
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
