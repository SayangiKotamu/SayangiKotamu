const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Rating = require("../models/rating");
const User = require("../models/user");
const Dinas = require("../models/dinas");
const { jwtSign } = require("../helpers/jwt");
const Report = require("../models/report");

let user;
let user2;
let user3;
let dinas;
let ratings;
let report;
let report2;
let report3;

beforeAll((done) => {
  const dummyUser = {
    NIK: "1501111709990010",
    fullname: "test",
    email: "oke@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };
  const dummyUser2 = {
    NIK: "1501111709990013",
    fullname: "test",
    email: "okes@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };
  const dummyUser3 = {
    NIK: "1501111709990012",
    fullname: "test",
    email: "okeaja@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };
  const dummyUser4 = {
    NIK: "1501111709990052",
    fullname: "test",
    email: "okeajan@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };
  const dummyUser5 = {
    NIK: "1501111709990032",
    fullname: "test",
    email: "sip@gmail.com",
    password: "123456",
    kota: "jakarta",
    isActive: true,
    ktp: "google.com",
  };
  const dummyUser6 = {
    NIK: "1501111709990022",
    fullname: "test",
    email: "okesip@gmail.com",
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
  const dummyReport = {
    title: "banjir nih bos",
    dinas: "6148b1079efa60bb9eefce4c",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
  };
  const dummyReport2 = {
    title: "banjir nih bos",
    dinas: "6148b1079efa60bb9eefce4c",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
  };
  const dummyReport3 = {
    title: "banjir nih bos",
    dinas: "6148b1079efa60bb9eefce4c",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
  };
  const dummyReport4 = {
    title: "banjir nih bos",
    dinas: "6148b1079efa60bb9eefce4c",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
  };
  const dummyReport5 = {
    title: "banjir nih bos",
    dinas: "6148b1079efa60bb9eefce4c",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
  };
  const dummyReport6 = {
    title: "banjir nih bos",
    dinas: "6148b1079efa60bb9eefce4c",
    description: "req.body.description sdkjaskdjaksjdklas kasldklasjdk",
    location: "req.body.location",
    lat: -6.219555543570665,
    long: 106.81447449443793,
    category: "6145f9e8ecc3a5b61970be20",
    picture:
      "https://statik.tempo.co/data/2021/09/17/id_1051653/1051653_720.jpg",
  };
  const dummyRating = {
    rating: 5,
    comment: "mantap abis nih bos",
  };
  User.create(dummyUser)
    .then((data) => {
      user = data;
      dummyRating.user = data._id;
      dummyReport.user = data._id;
      return User.create(dummyUser2);
    })
    .then((data) => {
      user2 = data;
      dummyReport2.user = data._id;
      return User.create(dummyUser3);
    })
    .then((data) => {
      user3 = data;
      dummyReport3.user = data._id;
      return User.create(dummyUser4);
    })
    .then((data) => {
      user4 = data;
      dummyReport4.user = data._id;
      return User.create(dummyUser5);
    })
    .then((data) => {
      user5 = data;
      dummyReport5.user = data._id;
      return User.create(dummyUser6);
    })
    .then((data) => {
      user6 = data;
      dummyReport6.user = data._id;
      return Dinas.create(dummyDinas);
    })
    .then((data) => {
      dinas = data;
      dummyRating.dinas = data._id;
      return Report.create(dummyReport);
    })
    .then((data) => {
      report = data;
      dummyRating.report = data._id;
      return Report.create(dummyReport2);
    })
    .then((data) => {
      report2 = data;
      dummyReport.report = data._id;
      return Report.create(dummyReport3);
    })
    .then((data) => {
      report3 = data;
      return Report.create(dummyReport4);
    })
    .then((data) => {
      report4 = data;
      return Report.create(dummyReport5);
    })
    .then((data) => {
      report5 = data;
      return Report.create(dummyReport6);
    })
    .then((data) => {
      report6 = data;
      return Rating.create(dummyRating);
    })
    .then((data) => {
      ratings = data;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.deleteMany()
    .then((_) => {
      return Rating.deleteMany();
    })
    .then((_) => {
      return Report.deleteMany();
    })
    .then((_) => {
      return Dinas.deleteMany();
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
  jest.setTimeout(30000);
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
    });
    let id = ratings._id;
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
      id: user3._id,
      email: user3.email,
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
      id: user3._id,
      email: user3.email,
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
      id: user4._id,
      email: user4.email,
    });
    let commentNull = {
      rating: 5,
      comment: null,
      dinas: dinas._id,
      report: report4._id,
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
  test("Expect Error when property dinas is wrong", (done) => {
    let access_token = jwtSign({
      id: user6._id,
      email: user6.email,
    });
    let dinasNull = {
      rating: 5,
      comment: "mantap nih",
      dinas: "123",
      report: report6._id,
    };
    request(app)
      .post(`/rating`)
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
  test("Expect Error when property report is wrong", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    let reportWrong = {
      rating: 5,
      comment: "mantap nih",
      dinas: dinas._id,
      report: "123",
    };
    request(app)
      .post(`/rating`)
      .send(reportWrong)
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
