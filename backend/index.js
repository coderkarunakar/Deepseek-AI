import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRoutes from  './routes/user.route.js'
dotenv.config();
const app = express();
const port =  4002;
const MONGO_URI = process.env.MONGODB_URI
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