const mongoose = require("mongoose");
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
    isActive: true,
    kota: "depok",
    ktp: "test",
  },
  {
    NIK: "6145b84486270d831670f493",
    fullname: "testing2",
    email: "testing2@test.com",
    password: "test1234",
    isActive: true,
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
let category = {};
let category1 = {};
let reportId = "";
let reportId2 = "";

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
      reportId2 = res[1]._id;

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
      mongoose.connection.close();
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

/** SHOW ALL REPORTS */
describe("GET /reportUser [CASE SUCCESS]", () => {
  test("Should return array of object and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .get("/reportUser")
          .set("access_token", res.body.access_token)
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

/** SHOW REPORT */
describe("GET /reportUser/:id [CASE SUCCESS]", () => {
  test("Should return of object and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .get(`/reportUser/${reportId2}`)
          .set("access_token", res.body.access_token)
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

describe("GET /reportUser/:id [CASE FAILED / ID NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";
  test("Should ERROR because of [ID NOT FOUND] return status code (404)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .get(`/reportUser/${falseID}`)
          .set("access_token", res.body.access_token)
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

/** SHOW REPORT BY CATEGORY */
describe("GET /reportUser/category:id [CASE SUCCESS]", () => {
  test("Should return of object and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .get(`/reportUser/category/${category._id}`)
          .set("access_token", res.body.access_token)
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

/* CREATE POST USER */
describe("POST /reportUser [CASE SUCCESS]", () => {
  test("Should return created object report and status code (201)", (done) => {
    let createReport = {
      title: "Created title",
      description: "Created description",
      location: "Depok",
      long: 106.832989,
      lat: -6.372639,
      dinas: dinas1._id,
      category: category1._id,
      picture:
        "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      user: user1._id,
    };
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .post(`/reportUser`)
          .set("access_token", res.body.access_token)
          .send(createReport)

          .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("title", createReport.title);
            expect(res.body).toHaveProperty(
              "description",
              createReport.description
            );
            expect(res.body).toHaveProperty("location", createReport.location);
            expect(res.body).toHaveProperty("long", createReport.long);
            expect(res.body).toHaveProperty("lat", createReport.lat);
            expect(res.body).toHaveProperty("dinas");
            expect(res.body).toHaveProperty("category");
            expect(res.body).toHaveProperty("user");
            expect(res.body).toHaveProperty("picture", createReport.picture);
            expect(res.body).toHaveProperty("status", "diterima");
            expect(res.body).toHaveProperty("_id");
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /reportUser [CASE FAILED / NO TITLE]", () => {
  test("Should ERROR because of [NO TITLE] and status code (400)", (done) => {
    let createReport1 = {
      title: "",
      description: "Created description",
      location: "Depok",
      long: 106.832989,
      lat: -6.372639,
      dinas: dinas1._id,
      category: category1._id,
      picture:
        "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      user: user1._id,
    };
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .post(`/reportUser`)
          .set("access_token", res.body.access_token)
          .send(createReport1)

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

describe("POST /reportUser [CASE FAILED / NO DESCRIPTION]", () => {
  test("Should ERROR because of [NO DESCRIPTION] and status code (400)", (done) => {
    let createReport2 = {
      title: "title",
      description: "",
      location: "Depok",
      long: 106.832989,
      lat: -6.372639,
      dinas: dinas1._id,
      category: category1._id,
      picture:
        "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      user: user1._id,
    };
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .post(`/reportUser`)
          .set("access_token", res.body.access_token)
          .send(createReport2)

          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.arrayContaining(["Description is required"]),
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

describe("POST /reportUser [CASE FAILED / NO DINAS]", () => {
  test("Should ERROR because of [NO DINAS] and status code (400)", (done) => {
    let createReport3 = {
      title: "title",
      description: "desc",
      location: "Depok",
      long: 106.832989,
      lat: -6.372639,
      dinas: null,
      category: category1._id,
      picture:
        "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      user: user1._id,
    };
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .post(`/reportUser`)
          .set("access_token", res.body.access_token)
          .send(createReport3)

          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.arrayContaining(["Dinas is required"]),
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

describe("POST /reportUser [CASE FAILED / NO CATEGORY]", () => {
  test("Should ERROR because of [NO CATEGORY] and status code (400)", (done) => {
    let createReport3 = {
      title: "title",
      description: "desc",
      location: "Depok",
      long: 106.832989,
      lat: -6.372639,
      dinas: dinas1._id,
      category: null,
      picture:
        "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png",
      user: user1._id,
    };
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .post(`/reportUser`)
          .set("access_token", res.body.access_token)
          .send(createReport3)

          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.arrayContaining(["Category is required"]),
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

/** UP VOTE */
describe("patch /reportUser/up/:id [CASE SUCCESS]", () => {
  test("Should be successfull and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .patch(`/reportUser/up/${reportId2}`)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("acknowledged", true);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("patch /reportUser/up/:id [CASE FAILED / NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583291";

  test("Should ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .patch(`/reportUser/up/${falseID}`)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(404);

            expect(res.body).toEqual(
              expect.objectContaining({
                message: "report Not Found",
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

/** DOWN VOTE */
describe("patch /reportUser/down/:id [CASE SUCCESS]", () => {
  test("Should be successfull and status code (200)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .patch(`/reportUser/down/${reportId2}`)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("acknowledged", true);

            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("patch /reportUser/down/:id [CASE FAILED / NOT FOUND]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("Should ERROR because of [ID NOT FOUND] and status code (404)", (done) => {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: users[0].email, password: users[0].password })
      .then((res) => {
        return request(app)
          .patch(`/reportUser/down/${falseID}`)
          .set("access_token", res.body.access_token)
          .then((res) => {
            expect(res.status).toBe(404);

            expect(res.body).toEqual(
              expect.objectContaining({
                message: "report Not Found",
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
