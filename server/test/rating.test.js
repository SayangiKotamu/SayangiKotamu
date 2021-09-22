const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Rating = require("../models/rating");
const User = require("../models/user");
const Dinas = require("../models/dinas");
const { jwtSign } = require("../helpers/jwt");
const Report = require("../models/report");
const Categories = require("../models/categories");

const dinasDinas = [
  {
    name: "Dinas perhubungan",
    email: "perhubungan@test.com",
    password: "123456",
    role: "dinas",
  },
  {
    name: "Dinas Pengamanan",
    email: "dinasPengamananeport@test.com",
    password: "test1234",
    role: "dinas",
  },
];

const users = [
  {
    NIK: "1501111709990010",
    fullname: "test",
    email: "oke123455@test.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  },
  {
    NIK: "1501111709990013",
    fullname: "test",
    email: "oke123455s@test.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  },
  {
    NIK: "1501111709990012",
    fullname: "test",
    email: "oke123455aja@test.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  },
];

const reports = [
  {
    title: "banjir nih bos",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
    issuedDate: new Date(),
    status: "diterima",
  },
  {
    title: "banjir nih bos",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
    issuedDate: new Date(),
    status: "diterima",
  },
  {
    title: "banjir nih bos",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
    issuedDate: new Date(),
    status: "diterima",
  },
  {
    title: "banjir nih bos",

    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
    issuedDate: new Date(),
    status: "diterima",
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

const ratings = [
  {
    rating: 5,
    comment: "mantap abis nih bos",
  },
];

let user = {};
let user1 = {};
let user2 = {};
let dinas = {};
let dinas1 = {};
let rating = {};
let rating1 = {};
let report = {};
let report1 = {};
let report2 = {};
let report3 = {};
let category = {};
let category1 = {};

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

      reports[1].user = user1;
      reports[1].dinas = dinas;
      reports[1].category = category1;

      reports[2].user = user;
      reports[2].dinas = dinas1;
      reports[2].category = category;

      reports[3].user = user;
      reports[3].dinas = dinas1;
      reports[3].category = category;

      return Report.create(reports);
    })
    .then((res) => {
      report = res[0];
      report1 = res[1];
      report2 = res[2];
      report3 = res[3];

      ratings[0].user = user._id;
      ratings[0].report = report._id;
      ratings[0].dinas = dinas._id;
      return Rating.create(ratings);
    })
    .then((res) => {
      rating = res[0];
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
      return Categories.deleteMany();
    })
    .then((_) => {
      return Report.deleteMany();
    })
    .then(() => {
      return Rating.deleteMany();
    })
    .then((_) => {
      mongoose.connection.close();
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /rating [SUCCESS CASE]", () => {
  test("should return an object with key: id,rating,comment,report,user,dinas", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });

    request(app)
      .get("/rating")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              rating: expect.any(Number),
              comment: expect.any(String),
              report: expect.any(String),
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

describe("POST /rating [SUCCESS CASE]", () => {
  test("should return an object with key: id,rating,comment,report,user,dinas", (done) => {
    let access_token = jwtSign({
      id: user2._id,
      email: user2.email,
    });
    let payload = {
      rating: 4,
      comment: "mantep abis",
      dinas: dinas._id,
      report: report2._id,
    };
    request(app)
      .post("/rating")
      .send(payload)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            rating: expect.any(Number),
            comment: expect.any(String),
            report: expect.any(Object),
            user: expect.any(String),
            dinas: expect.any(Object),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/rating [SUCCESS CASE]", () => {
  test("should return an object with key: id,rating,comment,report,user,dinas", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
      role: "dinas",
    });
    request(app)
      .get("/dinas/rating")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              rating: expect.any(Number),
              comment: expect.any(String),
              report: expect.any(String),
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

describe("GET /dinas/rating/:id [SUCCESS CASE]", () => {
  test("should return an object with key: id,rating,comment,report,user,dinas", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
      role: "dinas",
    });
    let id = rating._id;
    request(app)
      .get(`/dinas/rating/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            rating: expect.any(Number),
            comment: expect.any(String),
            report: expect.any(String),
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

describe("GET /dinas/rating/:id [SUCCESS FAILED]", () => {
  const falseID = "6139bfa08c2956b92b58329a";

  test("should ERROR because of [NO ID FOUND] and status 404", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
      role: "dinas",
    });

    request(app)
      .get(`/dinas/rating/${falseID}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Rating with id ${falseID} not found`,
          })
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /rating [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    request(app)
      .get("/rating")
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
      .get("/rating")
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

describe("POST /rating [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    let errorPayload = {
      rating: 4,
      comment: "mantep abis",
      dinas: dinas._id,
      report: report._id,
    };
    request(app)
      .post(`/rating`)
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
      rating: 4,
      comment: "mantep abis",
      dinas: dinas._id,
      report: report._id,
    };
    request(app)
      .post(`/rating`)
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
  test("Expect Error when user already rate this report", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let ratingNull = {
      rating: 5,
      comment: "mantep abis",
      dinas: dinas._id,
      report: report._id,
    };
    request(app)
      .post(`/rating`)
      .send(ratingNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain(
          "You have already rate this report"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property rating is null", (done) => {
    let access_token = jwtSign({
      id: user2._id,
      email: user2.email,
    });
    let ratingNull = {
      rating: null,
      comment: "mantep abis",
      dinas: dinas._id,
      report: report3._id,
    };
    request(app)
      .post(`/rating`)
      .send(ratingNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Rating is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property rating is string", (done) => {
    let access_token = jwtSign({
      id: user2._id,
      email: user2.email,
    });
    let ratingNull = {
      rating: "null",
      comment: "mantep abis",
      dinas: dinas._id,
      report: report3._id,
    };
    request(app)
      .post(`/rating`)
      .send(ratingNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain(
          'Cast to Number failed for value "null" (type string) at path "rating"'
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when property comment is null", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let commentNull = {
      rating: 5,
      comment: null,
      dinas: dinas._id,
      report: report3._id,
    };
    request(app)
      .post(`/rating`)
      .send(commentNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Comment is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/rating [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    request(app)
      .get("/dinas/rating")
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
      .get("/dinas/rating")
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

describe("GET /dinas/rating/:id [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    let id = ratings._id;
    request(app)
      .get(`/dinas/rating/${id}`)
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
    let id = ratings._id;
    request(app)
      .get(`/dinas/rating/${id}`)
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
      id: dinas._id,
      email: dinas.email,
    });
    let id = "6148ac8f3353de1ae8453840";
    request(app)
      .get(`/aspirations/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain(`Id is not verified`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("Expect Error when id is wrong", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let id = "6148ac8f3353de1ae8";
    request(app)
      .get(`/aspirations/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toContain(`Id is not verified`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
