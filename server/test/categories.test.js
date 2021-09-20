const request = require("supertest")
const mongoose = require("mongoose");
const app = require('../app')
const Categories = require('../models/categories');
const User = require("../models/user")
const { jwtSign } = require("../helpers/jwt");

let user
beforeAll((done) => {
    const dummyUser = {
        NIK: 1501111709990010,
        fullname:"test",
        email : "oke@gmail.com",
        password : "123456",
        kota : "jakarta",
        isActive: true,
        ktp : "google.com"
    }
    const dummyCategories = {
        name:"Masalah Lingkungan",
        slug:"masalah_Lingkungan"
    }
    User.create(dummyUser)
    .then((data)=>{
        user = data
        return Categories.create(dummyCategories)
    })
    .then((_)=>{
        done()
    })
    .catch((err)=>{ 
        done(err)
    })
})

afterAll((done)=>{
    User.deleteMany()
    .then((_)=>{
        return Categories.deleteMany()
    })
    .then((_)=>{
        mongoose.connection.close()
        done()
    })
    .catch((err)=>{
        done(err) 
    })
})

describe("GET /categories [SUCCESS CASE]", ()=>{
    test("should return an object with key: id,name,slug", (done)=>{
        let access_token = jwtSign({
            id: user._id,
            email: user.email,
        })
        request(app)
        .get("/categories")
        .set('Accept', 'application/json')
        .set("access_token", access_token)
        .then(response =>{
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
        .catch(err =>{
            done(err);
        })
    })
})

describe("GET /categories [ERROR CASE]", ()=>{
    test("Expect Error when user not login",(done)=>{
        request(app)
        .get("/categories")
        .then(response =>{
            expect(response.status).toBe(401);
            expect(response.body.message).toContain("You do not have aceess token")
            done();
        })
        .catch(err =>{
            done(err);
        })
    })
    test("Expect Error when access_token is wrong",(done)=>{
        request(app)
        .get("/categories")
        .set('Accept', 'application/json')
        .set("access_token", "access_token_palsu")
        .then(response =>{
            expect(response.status).toBe(401);
            expect(response.body.message).toContain("Invalid access token")
            done();
        })
        .catch(err =>{
            done(err);
        })
    })
})