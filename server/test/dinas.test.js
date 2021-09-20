const app = require("../app");
const Dinas = require("../models/dinas");
const mongoose = require("mongoose");

const request = require("supertest");

const dinasRegister1 = {
  name: "Dinas Kesehatan",
  email: "dinasKesehata@test.com",
  password: "test1234",
};

const dinasRegister2 = {
  name: "",
  email: "dinasKesehatan2@test.com",
  password: "test1234",
};

const dinasRegister3 = {
  name: "Dinas Kesehatan",
  email: "",
  password: "test1234",
};

const dinasRegister4 = {
  name: "Dinas Kesehatan",
  email: "dinasKesehata55@test.com",
  password: "",
};

const dinasRegister5 = {
  name: "Dinas Kesehatan",
  email: "dinasKesehatatestcom",
  password: "test1234",
};

const dinasLogin1 = {
  email: "dinasKesehata@test.com",
  password: "test1234",
};

const dinasLogin2 = {
  email: "dinasKesehata@test.com",
  password: "",
};

const dinasLogin3 = {
  email: "",
  password: "test1234",
};

beforeAll((done) => {
  const testUserLogin = {
    name: "Dinas Kehutanan",
    email: "dinaskehutanan@test.com",
    password: "test1234",
  };
  Dinas.create(testUserLogin)
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

// ! LATER: COBA CARI TAU CASCADE
afterAll((done) => {
  Dinas.deleteMany()
    .then((_) =>{ 
      mongoose.connection.close()
      done()
    })
    .catch((err) => done(err));
});

/* REGISTER CUSTOMER */
describe("POST / [CASE SUCCESS]", () => {
  test("Should return object with id, email, description, NID, and status code (201)", (done) => {
    request(app)
      .post("/dinas")
      .set("Accept", "application/json")
      .send(dinasRegister1)
      .then((res) => {
        const firstWords = res.body.name.split(" ").map((el) => {
          return el[0];
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty(
          "NID",
          `${firstWords.join("").toLowerCase()}${res.body._id}`
        );
        expect(res.body).toHaveProperty("email", dinasRegister1.email);
        //   ! LATER: COBA PIKIRKAN INI ID
        //   expect(res.body).toHaveProperty("_id", expect.any(new ObjectId(expect.any)));
        expect(res.body).not.toHaveProperty("password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / NO NAME]", () => {
  test("Should return ERROR because of [NO NAME] and status code(400)", (done) => {
    request(app)
      .post("/dinas")
      .set("Accept", "application/json")
      .send(dinasRegister2)
      .then((res) => {
        console.log(res.body, "<<<<<");
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(["Name is required"]),
          })
        );
        // expect(res.body).toHaveProperty("message");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / NO EMAIL]", () => {
  test("Should return ERROR because of [NO EMAIL] and status code(400)", (done) => {
    request(app)
      .post("/dinas")
      .set("Accept", "application/json")
      .send(dinasRegister3)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(["Email is required"]),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / NO PASSWORD]", () => {
  test("Should return ERROR because of [NO PASSWORD] and status code(400)", (done) => {
    request(app)
      .post("/dinas")
      .set("Accept", "application/json")
      .send(dinasRegister4)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(["Password is required"]),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST / [CASE FAILED / EMAIL INVALID]", () => {
  test("Should return ERROR because of [EMAIL INVALID] and status code(400)", (done) => {
    request(app)
      .post("/dinas")
      .set("Accept", "application/json")
      .send(dinasRegister5)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(["Email is invalid"]),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// /* USER LOGIN */
describe("POST /login [CASE SUCCESS]", () => {
  test("Should return object with access_token and status code(200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send(dinasLogin1)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("accessToken", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /login [CASE FAILED / NO PASSWORD]", () => {
  test("Should return ERROR because of [NO PASSWORD] and status code(401)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send(dinasLogin2)
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "Email / Password is wrong");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /login [CASE FAILED / NO EMAIL]", () => {
  test("Should return ERROR because of [NO EMAIL] and status code(401)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send(dinasLogin3)
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "Email / Password is wrong");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
