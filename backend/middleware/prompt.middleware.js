
import jwt from "jsonwebtoken";
import config from "../config.js";
function userMiddleware(req,res,next){
    //here i need authorization header (where i can keep token)
    //it means in the postman if the header is having a token then pick it and assign it to AuthHeader
    const authHeader = req.headers.authorization
    //if no token, or the token dont start with Bearer then return error
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({errors:"No token provided"});
    }
    //in the header token at index 0 i have a Bearer and at index 1 i have token value
    //to keep a space after bearer and the token here i had used space it should split based on space
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token,config.JWT_USER_PASSWORD)
        console.log("decodedvalue",decoded);
        req.userId = decoded.id;
        //inside decoded we will be having a user id , comparing it with the user id in the req object
        //the main use of this next () call is in our prompt route.js we have sendprompt call after verifying teh userMiddleware call it sends the sendprompt call
        next()
    }catch(error){
        return res.status(401).json({errors:"Invalid Token or expired"})
    }
}

export default userMiddleware;