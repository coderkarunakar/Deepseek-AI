import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from  './routes/user.route.js'
dotenv.config();
const app = express();
const port =  4002;
const MONGO_URI = process.env.MONGODB_URI

//middleware(here we are using middleware to receive the json data comming from the body) 
app.use(express.json());
//this will be used as a middle ware for the frontend
app.use(cookieParser());
//Db connection Code goes here
mongoose.connect(MONGO_URI).then(() =>{
    console.log("Connected to Mongodb")
}).catch((err)=>{
    console.error("MongoDB connection Error",err)
})


//routes
app.use("/api/v1/user",userRoutes);
app.listen(port, ()=>{
    console.log(` app is listening on port ${port}`);
});