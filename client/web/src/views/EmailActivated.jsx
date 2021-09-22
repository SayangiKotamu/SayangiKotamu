import React from "react";

function EmailActivated() {
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
              <h2 class="mb-5 text-3xl font-bold">Terima Kasih</h2>
            </div>
          </div>
          <div
            class="card shadow-2xl"
            style={{
              backgroundColor: "#f7f7f7",
              borderColor: "#f15447",
              borderWidth: 2,
            }}
          >
            <div class="m-8">
              <div class="mt-6 mb-3">
                <p class="text-2xl text-center" style={{ color: "black" }}>
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

export default EmailActivated;
