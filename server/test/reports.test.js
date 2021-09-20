const request = require("supertest");
const app = require("../app");
const Dinas = require("../models/dinas");
const User = require("../models/user");
const Report = require("../models/report");
const Categories = require("../models/categories");

const dinasDinas = [
  {
    name: "Dinas Kepolisian",
    email: "dinasKesehatareport@test.com",
    password: "test1234",
  },
  {
    name: "Dinas Pengamanan",
    email: "dinasPengamananeport@test.com",
    password: "test1234",
  },
];

const users = [
  {
    NIK: "6145b84486270d831670f492",
    fullname: "testing1",
    email: "testing1@test.com",
    password: "test1234",
    isActivate: true,
    kota: "depok",
    ktp: "test",
  },
  {
    NIK: "6145b84486270d831670f493",
    fullname: "testing2",
    email: "testing2@test.com",
    password: "test1234",
    isActivate: true,
    kota: "depok",
    ktp: "test",
  },
  {
    NIK: "6145b84486270d831670f494",
    fullname: "testing3",
    email: "testing3@test.com",
    password: "test1234",
    isActivate: false,
    kota: "depok",
    ktp: "test",
  },
];

const categories = [
  {
    name: "kecelakaan",
  },
  {
    name: "kriminal",
  },
];

const reports = [
  {
    title: "Kecelakaan margond1",
    status: "diterima",
    description: "kecelakaan di jalan margonda raya dekat margo city",
    location: "Depok",
    long: 106.832989,
    lat: -6.372639,
    upVote: 2,
    downVote: 1,
    issuedDate: new Date(),
    picture:
      "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
  },
  {
    title: "Kecelakaan margond2",
    status: "diterima",
    description: "kecelakaan di jalan margonda raya dekat margo city",
    location: "Depok",
    long: 106.832989,
    lat: -6.372639,
    upVote: 2,
    downVote: 1,
    issuedDate: new Date(),
    picture:
      "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
  },
  {
    title: "Kecelakaan margond3",
    status: "diterima",
    description: "kecelakaan di jalan margonda raya dekat margo city",
    location: "Depok",
    long: 106.832989,
    lat: -6.372639,
    upVote: 2,
    downVote: 1,
    issuedDate: new Date(),
    picture:
      "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
  },
  {
    title: "Begal margond",
    status: "diterima",
    description: "Begal di jalan margonda raya dekat margo city",
    location: "Depok",
    long: 106.832989,
    lat: -6.372639,
    upVote: 2,
    downVote: 1,
    issuedDate: new Date(),
    picture:
      "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
  },
];

let dinas = {};
let dinas1 = {};
let user = {};
let user1 = {};
let user2 = {};
let category = {};
let category1 = {};
let reportId = "";

const statusChanged = {
  status: "diproses",
};
beforeAll((done) => {
  Dinas.create(dinasDinas)
    .then((res) => {
      dinas = res[0];
      dinas1 = res[1];
      return Categories.create(categories);
    })
    .then((res) => {
      category = res[0];
      category1 = res[0];
      return User.create(users);
    })
    .then((res) => {
      user = res[0];
      user1 = res[1];
      user2 = res[2];
      reports[0].user = user;
      reports[0].dinas = dinas;
      reports[0].category = category;

      reports[1].user = user;
      reports[1].dinas = dinas;
      reports[1].category = category;

      reports[2].user = user;
      reports[2].dinas = dinas;
      reports[2].category = category;

      reports[3].user = user1;
      reports[3].dinas = dinas1;
      reports[3].category = category1;

      return Report.create(reports);
    })
    .then((res) => {
      reportId = res[0]._id;
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
// ! REPORTS
/* GET ALL REPORTS */
describe("GET /reports [CASE SUCCESS]", () => {
  test("Should return array of object and status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })
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
                  category: expect.any(Object),
                  upVote: expect.any(Number),
                  downVote: expect.any(Number),
                  issuedDate: expect.any(String),
                  user: expect.any(Object),
                  dinas: expect.any(Object),
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
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })

      .then((res) => {
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
                category: expect.any(Object),
                upVote: expect.any(Number),
                downVote: expect.any(Number),
                issuedDate: expect.any(String),
                user: expect.any(Object),
                dinas: expect.any(Object),
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
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })

      .then((res) => {
        return request(app)
          .get(`/dinas/reports/${falseID}`)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(404);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /report/:id [CASE FAILED / NO AUTHORIZE ]", () => {
  test("Should return ERROR because of [NO AUTHORIZE] and status code(401)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[1].email, password: dinasDinas[1].password })

      .then((res) => {
        return request(app)
          .get("/dinas/reports/" + reportId)
          .set("access_token", res.body.accessToken)
          .then((res) => {
            expect(res.status).toBe(401);

            done();
          });
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
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })

      .then((res) => {
        request(app)
          .patch(`/dinas/reports/${reportId}`)
          .set("access_token", res.body.accessToken)
          .send(statusChanged)

          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("status", statusChanged.status);
            expect(res.body).toHaveProperty("finishedDate");

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /report/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";
  test("Should return ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })

      .then((res) => {
        request(app)
          .patch(`/dinas/reports/${falseID}`)
          .set("access_token", res.body.accessToken)
          .send(statusChanged)

          .then((res) => {
            expect(res.status).toBe(404);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /report/:id [CASE FAILED / NO AUTHORIZE]", () => {
  test("Should return ERROR because of [NO AUTHORIZE] and status code (401)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[1].email, password: dinasDinas[1].password })

      .then((res) => {
        request(app)
          .patch(`/dinas/reports/${reportId}`)
          .set("access_token", res.body.accessToken)
          .send(statusChanged)

          .then((res) => {
            expect(res.status).toBe(401);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

/** DELETE REPORT */
describe("DELETE /report/:id [CASE SUCCESS]", () => {
  test("Should return status code (200)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })

      .then((res) => {
        request(app)
          .delete(`/dinas/reports/${reportId}`)
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

describe("DELETE /report/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("Should ERROR because of [ID NOT FOUND] return status code (404)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[0].email, password: dinasDinas[0].password })

      .then((res) => {
        request(app)
          .delete(`/dinas/reports/${falseID}`)
          .set("access_token", res.body.accessToken)

          .then((res) => {
            expect(res.status).toBe(404);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /report/:id [CASE FAILED / NO AUTHORIZE]", () => {
  test("Should ERROR because of [NO AUTHORIZE] return status code (404)", (done) => {
    request(app)
      .post("/dinas/login")
      .set("Accept", "application/json")
      .send({ email: dinasDinas[1].email, password: dinasDinas[1].password })

      .then((res) => {
        request(app)
          .delete(`/dinas/reports/${reportId}`)
          .set("access_token", res.body.accessToken)

          .then((res) => {
            expect(res.status).toBe(404);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

// ! END OF DINAS REPORS
// ! USER
