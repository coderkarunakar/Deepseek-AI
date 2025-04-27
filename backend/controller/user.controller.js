import {User} from "../model/user.model.js";
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
            //for new user
            const newUser = new User({
                firstName, lastName,email,password
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



export const login = (req,res) => {
    console.log("login  Function...")
}


export const logout = (req,res) => {
    console.log("logout  Function...")
}