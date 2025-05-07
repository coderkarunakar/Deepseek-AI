import express from "express";
import { sendPrompt } from "../controller/prompt.controller.js";
import userMiddleware from "../middleware/prompt.middleware.js";
const router = express.Router()
//defining the router

console.log("✅ Prompt endpoint hit!");
router.post("/prompt",userMiddleware,sendPrompt);


export default router;