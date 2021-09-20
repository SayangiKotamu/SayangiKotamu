const request = require("supertest");
const app = require("../app");
const Dinas = require("../models/dinas");
const User = require("../models/user");
const Report = require("../models/report");
const Categories = require("../models/categories");

const dinasRegister = {
  name: "Dinas Kesehatan",
  email: "dinasKesehatareport@test.com",
  password: "test1234",
};

const userRegister = {
  NIK: "6145b84486270d831670f492",
  fullname: "anthony taylor",
  email: "anthony@test.com",
  password: "test1234",
  isActivate: true,
  kota: "depok",
  ktp: "test",
};
let dinas = {};
let user = {};
let categorien = {};

let reportId = "";

beforeAll((done) => {
  const category = {
    name: "kecelakaan",
  };

  const statusChanged = {
    status: "diproses",
  };

  Dinas.create(dinasRegister)
    .then((res) => {
      dinas = res;

      return Categories.create(category);
    })
    .then((res) => {
      categorien = res;
      return User.create(userRegister);
    })
    .then((res) => {
      user = res;

      const createReport = {
        title: "Kecelakaan margond",
        status: "diterima",
        description: "kecelakaan di jalan margonda raya dekat margo city",
        location: "Depok",
        long: 106.832989,
        lat: -6.372639,
        category: categorien._id,
        upVote: 2,
        downVote: 1,
        issuedDate: new Date(),
        user: user._id,
        dinas: dinas._id,
        picture:
          "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      };
      console.log(
        "🚀 ~ file: reportsDinas.test.js ~ line 67 ~ .then ~ dinas",
        dinas
      );
      return Report.create(createReport);
    })
    .then((res) => {
      console.log(
        "🚀 ~ file: reportsDinas.test.js ~ line 74 ~ .then ~ res",
        res
      );

      reportId = res._id;
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  Dinas.deleteMany({})
    .then(() => {
      return User.deleteMany({});
    })
    .then(() => {
      return Report.deleteMany({});
    })
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

// ! LATER: MUNGKIN ADA TAMBAHAN

/* GET ALL REPORTS */
describe("GET /reports [CASE SUCCESS]", () => {
  test("Should return array of object and status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasRegister.email, password: dinasRegister.password })
      .then((res) => {
        return request(app)
          .get("/dinas/reports")
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  title: expect.any(String),
                  status: expect.any(String),
                  description: expect.any(String),
                  location: expect.any(String),
                  long: expect.any(Number),
                  lat: expect.any(Number),
                  category: expect.any(String),
                  upVote: expect.any(Number),
                  downVote: expect.any(Number),
                  issuedDate: expect.any(String),
                  user: expect.any(String),
                  dinas: expect.any(String),
                  picture: expect.any(String),
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

/* GET REPORT */
describe("GET /report/:id [CASE SUCCESS]", () => {
  test("Should return object with id, userId, dinasId, description, issuedDate, finishedDate, location, lat, long, category, picture and status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasRegister.email, password: dinasRegister.password })
      .then((res) => {
        console.log(
          "🚀 ~ file: reportsDinas.test.js ~ line 143 ~ .then ~ res",
          res.body
        );

        return request(app)
          .get("/dinas/reports/" + reportId)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
              expect.objectContaining({
                _id: expect.any(String),
                title: expect.any(String),
                status: expect.any(String),
                description: expect.any(String),
                location: expect.any(String),
                long: expect.any(Number),
                lat: expect.any(Number),
                category: expect.any(String),
                upVote: expect.any(Number),
                downVote: expect.any(Number),
                issuedDate: expect.any(String),
                user: expect.any(String),
                dinas: expect.any(String),
                picture: expect.any(String),
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

describe("GET /report/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";
  test("Should return ERROR because of [ID FALSE] and status code(404)", (done) => {
    request(app)
      .get(`/dinas/reports/${falseID}`)
      .then((res) => {
        expect(res.status).toBe(404);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

/* PATCH STATUS */
describe("PATCH /report/:id [CASE SUCCESS]", () => {
  test("Should return dinas status and status code (200)", (done) => {
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
  });
});

describe("PATCH /report/:id [CASE FAILED / ID NOT FOUND]", () => {
  test("Should return dinas status and status code (404)", (done) => {
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
  });
});
