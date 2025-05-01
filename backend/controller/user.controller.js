import {User} from "../model/user.model.js";
//for password hashing purpose
import bcrypt from "bcryptjs";
//for authorization purpose (generating jwt token)
import jwt from 'jsonwebtoken';
import config from "../config.js";


export const signup = async(req,res) => {
    //by using Destructuring concept 
    const {firstName, lastName,email,password} = req.body;
    try{
        //just finding the email from db,and storing it
            const user =  await User.findOne({email:email})
            //for already existing user showing a msg
            if(user){
                return res.status(401).json({errors:"User already exist"})
            }
            //hashing the password,here i need to give 2values which is password,salt value,we can give salt value as 10,or 8 
            const hashPassword =  await bcrypt.hash(password,10);
            //for new user
            const newUser = new User({
                firstName, lastName,email,password:hashPassword    
            })
            //this will save all our details in the db
           await newUser.save()
            return res.status(201).json({message:"User signup succeded"})

    }catch(error){
        console.log("Error in signup: ",error);
        return res.status(500).json({errors:"Error in signup"})
    }
    console.log(firstName,lastName,email,password);
}

//async and await is used when ever we are handling with dbs

export const login =  async(req,res) => {
   const {email, password}  = req.body;
   try{
    //validating the email,password
    const user = await User.findOne({email:email})
    //here we are trying to compare the password what we are getting is same as the password we are getting in the body
    const isPasswordCorrect  = await  bcrypt.compare(password,user.password)
    if(!user || !isPasswordCorrect){
        return res.status(403).json({errors:"Invalid Credentials"});
    }
    
    //if the user is valid then am generating a valid user,here am passing the user id(am using id becuase to generate the token), this syntax is from the documentation ,2nd parameter is pasword ,1st is userid
    const token = jwt.sign({id:user._id},config.JWT_USER_PASSWORD,{
        //this means the password will be expired in 1day
        expiresIn : "1d"
    })
//with this we can see in postman that at what time the cookie is going to be expired 
    const cookieOptions = {
        //the token expires in one day
        expires : new Date(Date.now() + 24*60*60*1000),
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        //it protects from cs arr attack
        sameSite:"Strict"
    }
    res.cookie("jwt",token,cookieOptions)
          
    return res.status(201).json({message:"User Logged in Successfully",user,token});
   }catch(error){
    console.log("Error in login: ",error);
    return res.status(500).json({errors:"Error in login"})
   }
}


export const logout = (req,res) => {
    try{
        //clearing the cookie
        res.clearCookie("jwt");
        return res.status(200).json({message:"Logout Succed"})
    }catch(error){
        console.log("Error in login: ",error);
        return res.status(500).json({errors:"Error in logout"});
    }
}