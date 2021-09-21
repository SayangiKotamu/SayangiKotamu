const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Dinas = require("../models/dinas");
const User = require("../models/user");

const Announcment = require("../models/announcment");

const dinas = {
  name: "Dinas Kepolisian",
  email: "dinasKesehatareport@test.com",
  role: "dinas",
  password: "test1234",
};

const user = {
  NIK: "6145b84486270d831670f491",
  fullname: "testing1",
  email: "testing1@test.com",
  password: "test1234",
  isActive: true,
  kota: "depok",
  ktp: "test",
};

const announcement = {
  title: "testing",
  announcment: "disini deskripsinya",
  date: new Date(),
};

let announcementID = "";

beforeAll((done) => {
  User.create(user)
    .then((res) => {
      return Dinas.create(dinas);
    })
    .then((res) => {
      announcement.dinas = res._id;
      return Announcment.create(announcement);
    })
    .then((res) => {
      announcementID = res._id;
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  Dinas.deleteMany({})
    .then(() => {
      return Announcment.deleteMany({});
    })
    .then(() => {
      return User.deleteMany({});
    })
    .then(() => {
      mongoose.connection.close();
      done();
    })
    .catch((err) => done(err));
});

// ! DINAS
/** GET ALL */
describe("GET /dinas/announcments [CASE SUCCESS]", () => {
  test("Should return array of object and status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .get("/dinas/announcments")
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  announcment: expect.any(String),
                  date: expect.any(String),
                  dinas: expect.any(Object),
                }),
              ])
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/announcments [CASE FAILED / DINAS ATTEMPT]", () => {
  test("Should ERROR beacuse of [DINAS ATTEMPT] and status code (401)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .get("/announcments")
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Id is not verified",
              })
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

// ! USER
describe("GET /dinas/announcments [CASE SUCCESS]", () => {
  test("Should return array of object and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        return request(app)
          .get("/announcments")
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  announcment: expect.any(String),
                  date: expect.any(String),
                  dinas: expect.any(Object),
                }),
              ])
            );
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

/** GET BY ID */
describe("GET /dinas/announcments/:id [CASE SUCCESS]", () => {
  test("Should return object and status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .get("/dinas/announcments/" + announcementID)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
              expect.objectContaining({
                _id: expect.any(String),
                title: expect.any(String),
                announcment: expect.any(String),
                date: expect.any(String),
                dinas: expect.any(Object),
              })
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/announcments/:ID [CASE FAILED / DINAS ATTEMPT]", () => {
  test("Should ERROR beacuse of [DINAS ATTEMPT] and status code (401)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .get("/announcments/" + announcementID)

          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Id is not verified",
              })
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/announcments/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("Should ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .get("/dinas/announcments/" + falseID)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Announcement not found",
              })
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

// ! USER
describe("GET /dinas/announcments/:id [CASE SUCCESS]", () => {
  test("Should return object and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        return request(app)
          .get("/announcments/" + announcementID)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
              expect.objectContaining({
                _id: expect.any(String),
                title: expect.any(String),
                announcment: expect.any(String),
                date: expect.any(String),
                dinas: expect.any(Object),
              })
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/announcments/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("Should ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        return request(app)
          .get("/announcments/" + falseID)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Announcement not found",
              })
            );

            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});

/** CREATE */
let createdId = "";
describe("POST /dinas/announcments [CASE SUCCESS]", () => {
  const createAnnouncment = {
    title: "created",
    announcment: "disini created deskripsinya",
    date: new Date(),
  };
  test("Should return object and status code (201)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .post(`/dinas/announcments`)
          .set("access_token", res.body.accessToken)
          .send(createAnnouncment)
          .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("title", createAnnouncment.title);
            expect(res.body).toHaveProperty(
              "announcment",
              createAnnouncment.announcment
            );
            createdId = res.body._id;
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /dinas/announcments [CASE FAILED / NO TITLE]", () => {
  const createAnnouncment2 = {
    title: "",
    announcment: "disini created deskripsinya",
    date: new Date(),
  };
  test("Should return ERROR because of [NO TITLE] and status code (400)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .post(`/dinas/announcments`)
          .set("access_token", res.body.accessToken)
          .send(createAnnouncment2)
          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.arrayContaining(["Title is required"]),
              })
            );

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /dinas/announcments [CASE FAILED / NO ANNOUNCEMENT]", () => {
  const createAnnouncment3 = {
    title: "TITLE",
    announcment: "",
    date: new Date(),
  };
  test("Should return ERROR because of [NO ANNOUNCEMENT] and status code (400)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .post(`/dinas/announcments`)
          .set("access_token", res.body.accessToken)
          .send(createAnnouncment3)
          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.arrayContaining(["Announcment is required"]),
              })
            );

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

/** EDITED */
describe("PUT /dinas/announcments/:id [CASE SUCCESS]", () => {
  const editAnnouncment = {
    title: "edited",
    announcment: "disini edited deskripsinya",
    date: new Date(),
  };
  test("Should return object and status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .put(`/dinas/announcments/${createdId}`)
          .set("access_token", res.body.accessToken)
          .send(editAnnouncment)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("title", editAnnouncment.title);
            expect(res.body).toHaveProperty(
              "announcment",
              editAnnouncment.announcment
            );
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /dinas/announcments/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  const editAnnouncment = {
    title: "edited",
    announcment: "disini edited deskripsinya",
    date: new Date(),
  };
  test("Should return ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .put(`/dinas/announcments/${falseID}`)
          .set("access_token", res.body.accessToken)
          .send(editAnnouncment)
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Announcement not found",
              })
            );

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

/** DELETE */
describe("DELETE /dinas/announcments/:id [CASE SUCCESS]", () => {
  test("Should status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .delete(`/dinas/announcments/${createdId}`)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(200);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /dinas/announcments/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("Should ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinas.email, password: dinas.password })
      .then((res) => {
        return request(app)
          .delete(`/dinas/announcments/${falseID}`)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Announcement not found",
              })
            );

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

// CASE USER TRY TO CREATE UPDATE DELETE
// CREATE
describe("POST /dinas/announcments [CASE FAILED / USER ATTEMPT]", () => {
  const createAnnouncment = {
    title: "created",
    announcment: "disini created deskripsinya",
    date: new Date(),
  };
  test("Should ERROR because of [USER ATTEMPT] and status code (401)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        return request(app)
          .post(`/dinas/announcments`)
          .set("access_token", res.body.access_token)
          .send(createAnnouncment)
          .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Id is not verified",
              })
            );
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

// EDITED
describe("PUT /dinas/announcments/:id [CASE FAILED / USER ATTEMPT]", () => {
  const editAnnouncment = {
    title: "edited",
    announcment: "disini edited deskripsinya",
    date: new Date(),
  };
  test("Should ERROR because of [USER ATTEMPT] and status code (401)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        return request(app)
          .put(`/dinas/announcments/${announcementID}`)
          .set("access_token", res.body.access_token)
          .send(editAnnouncment)
          .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Id is not verified",
              })
            );
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

// DELETED
describe("DELETE /dinas/announcments/:id [CASE FAILED / USER ATTEMPT]", () => {
  test("Should ERROR because of [USER ATTEMPT] and status code (401)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        return request(app)
          .delete(`/dinas/announcments/${announcementID}`)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: "Id is not verified",
              })
            );
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});
