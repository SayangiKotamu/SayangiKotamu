const User = require('../models/user')
// const {comparePassword} = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController{
    static async register(req,res,next){
        try {
            let newUser = {
                nik : req.body.nik,
                fullname : req.body.fullname,
                email : req.body.email,
                password : req.body.password,
                kota : req.body.kota,
                isActive: "false"
            }
            let data = await User.addUser(newUser)
            res.status(201).json({...newUser, _id:data.insertedId})
        } catch (error) {
            next(error)
        }
    }
    static async login(req,res,next){
        let data = await User.login(req.body.email)
        if(data){
            if(data.password === req.body.password){
                console.log("masukkkk");
                let payload = {
                    id : data._id,
                    email : data.email
                }
                let access_token = jwtSign(payload)
                res.status(200).json({access_token})
            } else{
                next({
                    name : "Invalid Login",
                    message:`email/password not match` 
                })
            }
        } else {
            next({
                name:"Not Found",
                message:"email or password not match"
            })
        }
    }
    static googleLogin(req,res,next){
        let payload = null;
        const {id_token} = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken : id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((data)=>{
            payload = data.getPayload()
            return User.login(payload.email)
        })
        .then((user)=>{
            if (user) {
                return User.login(payload.email)
            } else {
                const fullname = payload.name
                const email = payload.email
                const kota = "jakarta"
                // const phoneNumber = ""
                const password = process.env.RANDOM_PASSWORD + Date.now()/1000
                return User.create({username,address,phoneNumber,password,email, role : "Staff"})
            }
        })
        .then((data)=>{
            let payload = {
                id : data.id,
                email: data.email,
                role: data.role
            }
            let access_token = jwtSign(payload)
            res.status(200).json({access_token})
        })
        .catch((err)=>{
            next(err)
        })
    }
}
module.exports=UserController