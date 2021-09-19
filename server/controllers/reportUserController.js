const ReportUser = require("../models/reportUser")

class ReportUserController{
    static async showAll(req,res,next){
        try {
            let data = await ReportUser.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async showByCategory(req,res,next){
        try {
            let data = await ReportUser.findByCategory(req.params.category)
            if(data){
                res.status(200).json(data)
            } else {
                next({
                    name:"Not Found",
                    message:"not found"
                })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    static async addReport(req,res,next){

    }
    static async editReport(req,res,next){

    }
    static async deleteReport(req,res,next){

    }
}

module.exports = ReportUserController