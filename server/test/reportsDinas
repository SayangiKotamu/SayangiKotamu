const app = require("../app");
const { Report, Dinas, User } = require("../models");

const request = require("supertest");

beforeAll((done) => {
  const dinasRegister = {
    name: "Dinas Kesehatan",
    email: "dinasKesehata@test.com",
    password: "test1234",
    description:
      "Merupakan sebuah media yang memberikan kemudahan layanan dan informasi terkait Healthy City kepada warga Kota.",
  };

  const userRegister = {
    fullName: "anthony taulor",
    email: "anthony@test.com",
    password: "test1234",
    role: "warga",
    isActivate: true,
    kota: "depok",
  };

  const statusChanged = {
    status: "diproses",
  };

  let dinas = {};
  let user = {};
  let reportId = "";
  Dinas.create(dinasRegister)
    .then((res) => {
      dinas = res.body;
      return User.create(userRegister);
    })
    .then((res) => {
      user = res.body;
      const createReport = {
        dinasId: dinas._id,
        userId: user._id,
        description: "kecelakaan di jalan margonda raya dekat margo city",
        issuedDate: new Date().now(),
        location: "Depok",
        lat: -6.372639,
        long: 106.832989,
        category: "kecelakaan",
        picture:
          "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      };
      return Report.create(createReport);
    })
    .then((res) => {
      reportId = res.body._id;
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  Dinas.destroy({})
    .then(() => {
      return User.destroy({});
    })
    .then(() => {
      return Report.destroy({});
    })
    .then(() => done())
    .catch((err) => done(err));
});

// ! LATER: MUNGKIN ADA TAMBAHAN

/* GET ALL REPORTS */
describe("GET /reports [CASE SUCCESS]", () => {
  test("Should return array of object and status code (200)"),
    (done) => {
      request(app)
        .get("/dinas/reports")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.toHaveProperty("_id"),
              expect.toHaveProperty("userId"),
              expect.toHaveProperty("dinasId"),
              expect.toHaveProperty("description"),
              expect.toHaveProperty("issuedDate"),
              expect.toHaveProperty("finishedDate"),
              expect.toHaveProperty("location"),
              expect.toHaveProperty("lat"),
              expect.toHaveProperty("long"),
              expect.toHaveProperty("category"),
              expect.toHaveProperty("picture"),
            ])
          );

          done();
        })
        .catch((err) => {
          done(err);
        });
    };
});

/* GET REPORT */
describe("GET /report/:id [CASE SUCCESS]", () => {
  test(
    "Should return object with id, userId, dinasId, description, issuedDate, finishedDate, location, lat, long, category, picture and status code (200)"
  ),
    (done) => {
      request(app)
        .get(`/dinas/reports/${reportId}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("_id");
          expect(res.body).toHaveProperty("userId");
          expect(res.body).toHaveProperty("dinasId");
          expect(res.body).toHaveProperty("description");
          expect(res.body).toHaveProperty("issuedDate");
          expect(res.body).toHaveProperty("finishedDate");
          expect(res.body).toHaveProperty("location");
          expect(res.body).toHaveProperty("lat");
          expect(res.body).toHaveProperty("long");
          expect(res.body).toHaveProperty("category");
          expect(res.body).toHaveProperty("picture");

          done();
        })
        .catch((err) => {
          done(err);
        });
    };
});

describe("GET /report/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";
  test("Should return ERROR because of [ID FALSE] and status code(404)"),
    (done) => {
      request(app)
        .get(`/dinas/reports/${falseID}`)
        .then((res) => {
          expect(res.status).toBe(404);

          done();
        })
        .catch((err) => {
          done(err);
        });
    };
});

/* PATCH STATUS */
describe("PATCH /report/:id [CASE SUCCESS]", () => {
  test("Should return dinas status and status code (200)"),
    (done) => {
      request(app)
        .patch(`/dinas/reports/${reportId}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("status", statusChanged.status);

          done();
        })
        .catch((err) => {
          done(err);
        });
    };
});

describe("PATCH /report/:id [CASE FAILED / ID NOT FOUND]", () => {
  test("Should return dinas status and status code (404)"),
    (done) => {
      request(app)
        .patch(`/dinas/reports/${reportId}`)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("status", statusChanged.status);

          done();
        })
        .catch((err) => {
          done(err);
        });
    };
});
