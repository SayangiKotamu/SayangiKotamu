const request = require("supertest")
const app = require('../app')
// const {User} = require('../models/index')

let userTestData = {
    "username":"test",
    "email" : "testing@gmail.com",
    "password" : "123456",
    "phoneNumber":"089989898",
    "address":"jl.sdaghdjas"
}

beforeAll((done) => {
    const dummyUser = {email : "test@gmail.com", password : "123456"}
    User.create(dummyUser)
    .then((_)=>{
        done()
    })
    .catch((err)=>{ 
        done(err)
    })
})
  
afterAll((done)=>{
    User.destroy({truncate : true,cascade : true, restartIdentity: true})
    .then((_)=>{
        done()
    })
    .catch((err)=>{
        done(err) 
    })
})
