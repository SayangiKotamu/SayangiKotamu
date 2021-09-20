import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

function ActivationEmail() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleActivation = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        class="min-h-screen bg-cover"
        style={{
          backgroundColor: "#C1FFD7",
        }}
      >
        <div class="container" style={{ marginLeft: "10%" }}>
          <div class="justify-between grid grid-cols-2">
            <div style={{ marginTop: "30%" }}>
              <h2 class="mb-5 text-3xl font-bold">Terima Kasih</h2>
            </div>
          </div>
          <div class="card" style={{ backgroundColor: "white" }}>
            <div class="m-8">
              <div class="mt-6 mb-3">
                <p class="text-2xl text-center">
                  Email yang anda daftarkan telah terverifikasi, anda sudah
                  dapat menggunakan email yang telah anda daftarkan pada
                  aplikasi kami. Selamat berkontribusi melalui SayangiKotamu :)
                  #LiveSmart
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivationEmail;
