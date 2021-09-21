const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Aspiration = require("../models/aspiration");
const User = require("../models/user");
const { jwtSign } = require("../helpers/jwt");
const Dinas = require("../models/dinas");

let user;
let dinas;
let aspiration;

beforeAll((done) => {
  const dummyUser = {
    NIK: 1501111709990010,
    fullname: "test",
    email: "oke@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };
  const dummyDinas = {
    name: "Dinas perhubungan",
    email: "perhubungan@gmail.com",
    password: "123456",
  };
  const dummyAspiration = {
    title: "test aspiration",
    description: "ini contoh description",
    type: "kritik",
  };
  User.create(dummyUser)
    .then((data) => {
      user = data;
      dummyAspiration.user = data._id;
      return Dinas.create(dummyDinas);
    })
    .then((data) => {
      dinas = data;
      dummyAspiration.dinas = data._id;
      return Aspiration.create(dummyAspiration);
    })
    .then((data) => {
      aspiration = data;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.deleteMany()
    .then((_) => {
      return Dinas.deleteMany();
    })
    .then((_) => {
      return Aspiration.deleteMany();
    })
    .then((_) => {
      mongoose.connection.close();
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /aspirations [SUCCESS CASE]", () => {
  test("should return an object with key: id,title,description, type, user, dinas", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    request(app)
      .get("/aspirations")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              title: expect.any(String),
              description: expect.any(String),
              type: expect.any(String),
              user: expect.any(String),
              dinas: expect.any(String),
            }),
          ])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /aspirations/:id [SUCCESS CASE]", () => {
  test("should return an object with key: id,title,description, type, user, dinas", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let id = aspiration._id;
    request(app)
      .get(`/aspirations/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            type: expect.any(String),
            user: expect.any(String),
            dinas: expect.any(String),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /aspirations/create [SUCCESS CASE]", () => {
  test("should return an object with key: id,title,description, type, user, dinas", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let payload = {
      title: "ini title",
      description: "ini description",
      type: "kritik",
      dinas: dinas._id,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(payload)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            type: expect.any(String),
            user: expect.any(String),
            dinas: expect.any(String),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /aspirations [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    request(app)
      .get("/aspirations")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain("You do not have aceess token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when access_token is wrong", (done) => {
    request(app)
      .get("/aspirations")
      .set("Accept", "application/json")
      .set("access_token", "access_token_palsu")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain("Invalid access token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /aspirations/:id [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    let id = aspiration._id;
    request(app)
      .get(`/aspirations/${id}`)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain("You do not have aceess token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when access_token is wrong", (done) => {
    let id = aspiration._id;
    request(app)
      .get(`/aspirations/${id}`)
      .set("Accept", "application/json")
      .set("access_token", "access_token_palsu")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain("Invalid access token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when id not found", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let id = "6148ac8f3353de1ae8453840";
    request(app)
      .get(`/aspirations/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toContain(
          `aspirations with id ${id} not found`
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /aspirations/create [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    let errorPayload = {
      title: "ini title",
      description: "ini description",
      type: "kritik",
      dinas: dinas._id,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(errorPayload)
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain("You do not have aceess token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when access_token is wrong", (done) => {
    let errorPayload = {
      title: "ini title",
      description: "ini description",
      type: "kritik",
      dinas: dinas._id,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(errorPayload)
      .set("Accept", "application/json")
      .set("Accept", "application/json")
      .set("access_token", "access_token_palsu")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain("Invalid access token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property title is null", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let titleNull = {
      title: null,
      description: "ini description",
      type: "kritik",
      dinas: dinas._id,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(titleNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Title is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property description is null", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let descriptionNull = {
      title: "null",
      description: null,
      type: "kritik",
      dinas: dinas._id,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(descriptionNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Description is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property type is null", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let typeNull = {
      title: "ini title",
      description: "ini description",
      type: null,
      dinas: dinas._id,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(typeNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Type is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property dinas is null", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let dinasNull = {
      title: "ini title",
      description: "ini description",
      type: "kritik",
      dinas: null,
    };
    request(app)
      .post(`/aspirations/create`)
      .send(dinasNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain(
          "This field should be included"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property dinas is wrong", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let dinasNull = {
      title: "ini title",
      description: "ini description",
      type: "kritik",
      dinas: "123",
    };
    request(app)
      .post(`/aspirations/create`)
      .send(dinasNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain(
          "This field should be included"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
