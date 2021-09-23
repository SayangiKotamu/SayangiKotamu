const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Categories = require("../models/categories");
const User = require("../models/user");
const Dinas = require("../models/dinas");
const { jwtSign } = require("../helpers/jwt");
const categoriesController = require("../controllers/categoriesController");

let user = {};
let dinas = {};
let categories = {};

let userId = "";
let userEmail = "";

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
  const dummyCategories = {
    name: "Masalah Lingkungan",
    slug: "masalah_Lingkungan",
  };
  User.create(dummyUser)
    .then((data) => {
      user = data;
      return Dinas.create(dummyDinas);
    })
    .then((data) => {
      dinas = data;
      return Categories.create(dummyCategories);
    })
    .then((data) => {
      categories = data;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.deleteMany()
    .then((res) => {
      userId = res._id;
      userEmail = res.email;
      return Categories.deleteMany();
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

describe("GET /categories [SUCCESS CASE]", () => {
  test("should return an object with key: id,name,slug", (done) => {
    let access_token = jwtSign({
      id: user._id,
      email: user.email,
    });
    request(app)
      .get("/categories")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              reports: expect.any(Array),
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

// test("TEST FAILED CONNECT REJECT ", (done) => {
//   const addMock = jest.spyOn(Categories, "find");

//   addMock.mockImplementation(() => Promise.reject(new Error("test")));

//   let access_token = jwtSign({
//     id: userId,
//     email: userEmail,
//   });
//   request(app)
//     .get("/categories")
//     .set("Accept", "application/json")
//     .set("access_token", access_token)
//     .then(async (response) => {
//       expect(response.status).toBe(400);

//       // expect(response.body).toEqual("Internal Server Error");
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

describe("GET /categories [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    request(app)
      .get("/categories")
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
      .get("/categories")
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

describe("GET /dinas/categories [SUCCESS CASE]", () => {
  test("should return an object with key: id,name,slug", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });

    request(app)
      .get("/dinas/categories")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              slug: expect.any(String),
              reports: expect.any(Array),
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

describe("GET /dinas/categories/:id [SUCCESS CASE]", () => {
  test("should return an object with key: id,name,slug", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let id = categories._id;
    request(app)
      .get(`/dinas/categories/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            reports: expect.any(Array),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /dinas/categories [SUCCESS CASE]", () => {
  test("should return an object with key: id,name,slug", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let payload = {
      name: "Masalah Lingkungan",
    };
    request(app)
      .post(`/dinas/categories`)
      .send(payload)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /dinas/categories/:id [SUCCESS CASE]", () => {
  test("should return an object with key: id,name,slug", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let payload = {
      name: "Masalah Lainnya",
    };
    let id = categories._id;
    request(app)
      .put(`/dinas/categories/${id}`)
      .send(payload)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /dinas/categories/:id [FAILED CASE]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("should return ERROR with status code (404)", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let payload = {
      name: "Masalah Lainnya",
    };

    request(app)
      .put(`/dinas/categories/${falseID}`)
      .send(payload)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Categories Not Found",
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /dinas/categories/:id [SUCCESS CASE]", () => {
  test('"should return an object with key: id,name,slug"', (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let id = categories._id;
    request(app)
      .delete(`/dinas/categories/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /dinas/categories/:id [FAILED CASE]", () => {
  const falseID = "6139bfa08c2956b92b583296";

  test("should return ERROR with status code (404)", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let id = categories._id;
    request(app)
      .delete(`/dinas/categories/${falseID}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Categories Not Found",
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/categories [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    request(app)
      .get("/dinas/categories")
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
      .get("/categories")
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

describe("GET /dinas/categories/:id [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    let id = categories._id;
    request(app)
      .get(`/dinas/categories/${id}`)
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
    let id = categories._id;
    request(app)
      .get(`/dinas/categories/${id}`)
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
      .get(`/dinas/categories/${id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toContain(`Categories Not Found`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /dinas/categories [ERROR CASE]", () => {
  test("Expect Error when user not login", (done) => {
    let payload = {
      name: "Masalah Kriminal",
    };
    request(app)
      .post(`/dinas/categories`)
      .send(payload)
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
  test("Expect Error when property name is empty", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    let nameNull = {
      name: "",
    };
    request(app)
      .post(`/dinas/categories`)
      .send(nameNull)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toContain("Name is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /dinas/categories [SUCCESS FAILED]", () => {
  test("REJECTED SERVER", (done) => {
    let access_token = jwtSign({
      id: dinas._id,
      email: dinas.email,
    });
    const addMock = jest.spyOn(Categories, "find");

    addMock.mockImplementation(() => Promise.reject(new Error("test")));
    request(app)
      .get("/dinas/categories")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(500);
        addMock.mockReset();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// test("TEST FAILED  ", async () => {
//   const addMock = jest.spyOn(Categories, "find");

//   addMock.mockImplementation(() => Promise.reject(new Error("test")));
//   let access_token = jwtSign({
//     id: user._id,
//     email: user.email,
//   });
//   request(app)
//     .get("/categories")
//     .set("Accept", "application/json")
//     .set("access_token", access_token)
//     .then((response) => {
//       expect(response.status).toBe(500);
//       expect(response.body).toEqual(
//         expect.objectContaining({
//           message: "Categories Not Found",
//         })
//       );

//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

// test("Error category fall", () => {
//   const categories = categoriesController.showAll();
//   expect("test");
// });
