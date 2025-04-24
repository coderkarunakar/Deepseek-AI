import express from "express";
import dotenv from 'dotenv'
 
dotenv.config();
const app = express();
const port =  4001;


app.listen(port, ()=>{
    console.log(` app is listening on port ${port}`);
});