const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");
const nodemailer = require("../helpers/nodemailer");

jest.mock("../helpers/nodemailer");

let userTestData = {
  NIK: 1501111709990002,
  fullname: "test",
  email: "testing@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

let userTestData1 = {
  NIK: 15011117099900100,
  fullname: "test",
  email: "testing@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

let userTestData2 = {
  NIK: 15011117099900100,
  fullname: "test",
  email: "testing2@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

let userTestData3 = {
  NIK: 1501111709990100,
  fullname: "test",
  email: "testing3@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

let userTestData4 = {
  NIK: 15011117099901100,
  fullname: "test",
  email: "testing4@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

// let testUser = {};
beforeAll((done) => {
  const dummyUser = {
    NIK: 1501111709990001,
    fullname: "test",
    email: "emailtest@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };

  User.create(dummyUser)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.deleteMany()
    .then((_) => {
      mongoose.connection.close();
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /register TESTING EMAIL [SUCCESS CASE]", () => {
  test("should return status code (201)", (done) => {
    nodemailer.mockReturnValue({
      result: "testing",
    });
    request(app)
      .post("/register")
      .send(userTestData4)
      .then((response) => {
        expect(response.status).toBe(201);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// describe("POST /register TESTING EMAIL [FAILED CASE]", () => {
//   test("should return an object with key: NIK,fullname, email, kota, ktp", (done) => {
//     nodemailer.mockReturnValue({
//       result: null,
//     });
//     request(app)
//       .post("/register")
//       .send(userTestData4)
//       .then((response) => {
//         expect(response.status).toBe(400);

//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

describe("POST /register [SUCCESS CASE]", () => {
  test("should return an object with key: NIK,fullname, email, kota, ktp", (done) => {
    request(app)
      .post("/register")
      .send(userTestData)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("NIK", expect.any(Number));
        expect(response.body).toHaveProperty("email", userTestData.email);
        expect(response.body).toHaveProperty("fullname", expect.any(String));
        expect(response.body).toHaveProperty("kota", expect.any(String));
        expect(response.body).toHaveProperty("ktp", expect.any(String));
        expect(response.body).toHaveProperty("isActive", false);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

let errorRegisterData = {
  NIK: 1501111709990003,
  fullname: "test",
  email: "testing@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

describe("POST /register [ERROR CASE]", () => {
  test("Expect Error when property NIK is already register", (done) => {
    let nikSame = {
      ...errorRegisterData,
      NIK: 1501111709990001,
      email: "test@gmail.com",
    };
    request(app)
      .post("/register")
      .send(nikSame)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("NIK is already registered");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property email is null", (done) => {
    let emailNull = {
      ...errorRegisterData,
      email: null,
    };
    request(app)
      .post("/register")
      .send(emailNull)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Email is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property email is already register", (done) => {
    request(app)
      .post("/register")
      .send(errorRegisterData)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Email is already registered");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property password is null", (done) => {
    let passwordNull = {
      ...errorRegisterData,
      email: "",
      password: null,
    };
    request(app)
      .post("/register")
      .send(passwordNull)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Password is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property email is empty string", (done) => {
    let emailEmpty = {
      ...errorRegisterData,
      email: "",
    };
    request(app)
      .post("/register")
      .send(emailEmpty)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Email is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property password is empty string", (done) => {
    let passwordEmpty = {
      ...errorRegisterData,
      email: "coba@gmail.com",
      password: "",
    };
    request(app)
      .post("/register")
      .send(passwordEmpty)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Password is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property email format is invalid", (done) => {
    let emailFormat = {
      ...errorRegisterData,
      email: "test",
    };
    request(app)
      .post("/register")
      .send(emailFormat)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Email is invalid");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

let loginCase = {
  email: "emailtest@gmail.com",
  password: "123456",
};

describe("POST /login [SUCCESS CASE]", () => {
  test("should return an object with key: access_token ", (done) => {
    request(app)
      .post("/login")
      .send(loginCase)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.access_token).toBeDefined();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /login [ERROR CASE]", () => {
  test("Expect Error when property password is wrong", (done) => {
    let passwordWrong = {
      ...loginCase,
      password: "null",
    };
    request(app)
      .post("/login")
      .send(passwordWrong)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          "message",
          "Email / Password is wrong"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property email is not found", (done) => {
    let emailNull = {
      ...loginCase,
      email: null,
    };
    request(app)
      .post("/login")
      .send(emailNull)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          "message",
          "Email / Password is wrong"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / NO ACTIVATE EMAIL]", () => {
  test("Should ERROR because of [NO ACTIVATE EMAIL] and status code (401)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(userTestData)
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: "Please check your email and activate your account first.",
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / ACTIVATE EMAIL INVALID]", () => {
  test("Should ERROR because of [ACTIVATE EMAIL INVALID] and status code (401)", (done) => {
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send(userTestData3)
      .then((res) => {
        User.findOne({ email: res.body.email }).then((res) => {
          return request(app)
            .patch("/activateEmail/" + res.activateEmailToken + 24)
            .then((res) => {
              expect(res.status).toBe(401);
              expect(res.body).toEqual(
                expect.objectContaining({
                  message: "Invalid access token",
                })
              );
              done();
            });
        });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / DUPLICATE]", () => {
  test("Should ERROR because of [DUPLICATE EMAIL] and status code (400)", (done) => {
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send(userTestData1)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: "Email is already registered",
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

let isEmailTrue = "";
describe("PATCH / [CASE SUCCESS]", () => {
  test("Should be success  and status code (200)", (done) => {
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send(userTestData2)
      .then((res) => {
        User.findOne({ email: res.body.email }).then((res) => {
          isEmailTrue = res.activateEmailToken;
          return request(app)
            .patch("/activateEmail/" + res.activateEmailToken)
            .then((res) => {
              expect(res.status).toBe(200);
              expect(res.body).toEqual(
                expect.objectContaining({
                  message: "Your email has been activated",
                })
              );
              done();
            });
        });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH / [CASE FAILED / DONE ACTIVATE]", () => {
  User.findOne;
  test("Should ERROR because of [ALREADY ACTIVATE] and status code (401)", (done) => {
    request(app)
      .patch("/activateEmail/" + isEmailTrue)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: "You have already activate your email",
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

let oldActivateEmail = "";
describe("PATCH / [CASE FAILED / NO EMAIL FOUND]", () => {
  test("Should ERROR because of [ALREADY ACTIVATE] and status code (401)", (done) => {
    User.findOne({ email: userTestData.email })
      .then((res) => {
        oldActivateEmail = res.activateEmailToken;
        return User.findOneAndDelete({ email: userTestData.email }).then(
          (res) => {
            return request(app)
              .patch("/activateEmail/" + oldActivateEmail)
              .then((res) => {
                expect(res.status).toBe(401);
                expect(res.body).toEqual(
                  expect.objectContaining({
                    message: "Email token is invalid",
                  })
                );
                done();
              });
          }
        );
      })
      .catch((err) => {
        done(err);
      });
  });
});
