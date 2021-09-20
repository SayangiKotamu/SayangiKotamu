const request = require("supertest")
const app = require('../app')
const User = require('../models/user')
const mongoose = require("mongoose");


let userTestData = {
    "nik": 1501111709990001,
    "fullname":"test",
    "email" : "testing@gmail.com",
    "password" : "123456",
    "kota" : "jakarta",
    "isActive" : true,
    "activateEmailToken" : "kjdaskjkldasjlkjsk122"
}

// beforeAll((done) => {
//     const dummyUser = {email : "test@gmail.com", password : "123456"}
//     User.create(dummyUser)
//     .then((_)=>{
//         done()
//     })
//     .catch((err)=>{ 
//         done(err)
//     })
// })
  
afterAll((done)=>{
    User.deleteMany()
    .then((_)=>{
        mongoose.connection.close()
        done()
    })
    .catch((err)=>{
        done(err) 
    })
})

// describe("POST /register [SUCCESS CASE]", ()=>{
//     test("should return an object with key: id, email", (done)=>{
//         request(app)
//         .post("/register")
//         .send(userTestData)
//             .then(response =>{
//                 expect(response.status).toBe(201);
//                 expect(response.body).toHaveProperty("id",expect.any(Number))
//                 expect(response.body).toHaveProperty("nik",expect.any(Number))
//                 expect(response.body).toHaveProperty("email", userTestData.email)
//                 expect(response.body).toHaveProperty("fullname", expect.any(String))
//                 expect(response.body).toHaveProperty("kota", expect.any(String))
//                 done();
//             })
//             .catch(err =>{
//                 done(err);
//             })
//     })
// })

// let errorRegisterData ={
//     "nik": 1501111709990001,
//     "fullname":"test",
//     "email" : "testing@gmail.com",
//     "password" : "123456",
//     "kota" : "jakarta"
// }

// describe("POST /register [ERROR CASE]", ()=>{
//     test("Expect Error when property email is null",(done)=>{
//         let emailNull ={
//             ...errorRegisterData, email:null
//         }
//         request(app)
//         .post("/register")
//         .send(emailNull)
//         .then(response =>{
//             expect(response.status).toBe(401);
//             expect(response.body.message).toContain('Email cannot be null')
//             done();
//         })
//         .catch(err =>{
//             done(err);
//         })
//     })
//     test("Expect Error when property password is null", (done)=>{
//         let passwordNull ={
//             ...errorRegisterData, password:null
//         }
//         request(app)
//         .post("/register")
//         .send(passwordNull)
//         .then(response =>{
//             expect(response.status).toBe(401);
//             expect(response.body.message).toContain('password cannot be null')
//             done();
//         })
//         .catch(err =>{
//             done(err);
//         })
//     })
//     test("Expect Error when property email is empty string",(done)=>{
//         let emailEmpty ={
//             ...errorRegisterData, email:""
//         }
//         request(app)
//         .post("/register")
//         .send(emailEmpty)
//         .then(response =>{
//             expect(response.status).toBe(401);
//             expect(response.body.message).toContain('Email cannot be empty')
//             done();
//         })
//         .catch(err =>{
//             done(err);
//         })
//     })
//     test("Expect Error when property password is empty string",(done)=>{
//         let passwordEmpty ={
//             ...errorRegisterData, password:""
//         }
//         request(app)
//         .post("/register")
//         .send(passwordEmpty)
//         .then(response =>{
//             expect(response.status).toBe(401);
//             expect(response.body.message).toContain('password cannot be empty')
//             done();
//         })
//         .catch(err =>{
//             done(err);
//         })
//     })
//     test("Expect Error when property email is already register",(done)=>{
//         let duplicateEmail ={
//             ...errorRegisterData, email:"test@gmail.com"
//         }
//         request(app)
//         .post("/register")
//         .send(duplicateEmail)
//         .then(response =>{
//             expect(response.status).toBe(400);
//             expect(response.body.message).toContain('email must be unique')
//             done();
//         })
//         .catch(err =>{
//             done(err);
//         })
//     })
//     test("Expect Error when property email format is invalid",(done)=>{
//         let emailFormat ={
//             ...errorRegisterData, email:"test"
//         }
//         request(app)
//         .post("/register")
//         .send(emailFormat)
//         .then(response =>{
//             expect(response.status).toBe(400);
//             expect(response.body.message).toContain('Email is invalid')
//             done();
//         })
//         .catch(err =>{
//             done(err);
//         })
//     })
// })

let loginCase = {
    email:"test@gmail.com",
    password:"123456"
}

// describe("POST /login [SUCCESS CASE]", ()=>{
//     test("should return an object with key: accessToken ",(done)=>{
//         request(app)
//         .post("/login")
//         .send(loginCase)
//             .then(response =>{
//                 expect(response.status).toBe(200);
//                 expect(response.body.access_token).toBeDefined();
//                 done();
//             })
//             .catch(err =>{
//                 done(err);
//             })
//     })
// })
describe("POST /login [ERROR CASE]", ()=>{
    test("Expect Error when property password is wrong",(done)=>{
        let passwordWrong ={
            ...loginCase, password:"null"
        }
        request(app)
        .post("/login")
        .send(passwordWrong)
        .then(response =>{
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message","Email / Password is wrong")
            done();
        })
        .catch(err =>{
            done(err);
        })
    })
    test("Expect Error when property email is not found",(done)=>{
        let emailNull ={
            ...loginCase, email:null
        }
        request(app)
        .post("/login")
        .send(emailNull)
        .then(response =>{
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message",'Email / Password is wrong')
            done();
        })
        .catch(err =>{
            done(err);
        })
    })
})