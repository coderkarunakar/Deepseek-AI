import express from "express";
import { signup } from "../controller/user.controller.js";

const router = express.Router()
//defining the router
router.post("/signup",signup)
export default router;