const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

let userTestData = {
  NIK: 1501111709990002,
  fullname: "test",
  email: "testing@gmail.com",
  password: "123456",
  kota: "jakarta",
  ktp: "google.com",
};

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
