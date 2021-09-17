function errorHandler(err,req,res,next){
    switch(err.name){
        case "Not Found":
            res.status(404).json({message:err.message})
            break;
        case "Invalid Login" :
            res.status(401).json({message: err.message})
            break;
        case "Invalid JWT" :
            res.status(401).json({message: err.message})
            break;
        case "Not Login" :
            res.status(401).json({message: err.message})
            break;
        case "TokenExpiredError" :
            res.status(401).json({message: err.message})
            break;
        case "Not Authorized" :
            res.status(401).json({message: err.message})
            break;
        case "JsonWebTokenError" :
            res.status(401).json({message: "Invalid access_token"})
            break;
        default:
            res.status(500).json({message: "Internal Server Error"})
    }
}
module.exports = errorHandler