import express from "express";
import { sendPrompt } from "../controller/prompt.controller.js";

const router = express.Router()
//defining the router

console.log("✅ Prompt endpoint hit!");
router.post("/prompt",sendPrompt);


export default router;