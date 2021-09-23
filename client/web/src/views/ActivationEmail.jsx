import React from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { aktifasiEmail } from "../stores/authentication/action";

function ActivationEmail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();

  const handleActivation = (e) => {
    e.preventDefault();
    dispatch(aktifasiEmail(token));
    history.push("/email-terverifikasi");
  };

  return (
    <>
      <div
        class="min-h-screen bg-cover"
        style={{
          backgroundColor: "white",
        }}
      >
        <div class="container" style={{ marginLeft: "10%" }}>
          <div class="justify-between grid grid-cols-2">
            <div style={{ marginTop: "30%" }}>
              <h2 class="mb-5 text-3xl font-bold">Aktifasi Email</h2>
            </div>
          </div>
          <div
            class="card shadow-2xl"
            style={{
              backgroundColor: "#f7f7f7",
              borderWidth: 2,
              borderColor: "#f15447",
            }}
          >
            <div class="m-8">
              <div class="mt-6 mb-3">
                <p class="text-xl text-center" style={{ color: "black" }}>
                  Terima kasih telah mendaftarkan diri anda dalam aplikasi
                  SayangiKotamu, untuk tahapan lebih lanjutnya anda diminta
                  untuk aktifasi email yang telah didaftarkan. Terkait dengan
                  hal itu, jika anda menyetujui dan ingin segera berkontribusi
                  melalui aplikasi kami, silahkan verifikasi email anda.
                </p>

                <input
                  type="submit"
                  value="Aktifasi Email"
                  class="btn mt-10"
                  style={{ width: "100%", backgroundColor: "#f15447" }}
                  onClick={handleActivation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivationEmail;
