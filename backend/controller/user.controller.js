import {User} from "../model/user.model.js";

import bcrypt from "bcryptjs";
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
    return res.status(201).json({message:"User Logged in Successfully"});
   }catch(error){
    console.log("Error in login: ",error);
    return res.status(500).json({errors:"Error in login"})
   }
}


export const logout = (req,res) => {
    console.log("logout  Function...")
}