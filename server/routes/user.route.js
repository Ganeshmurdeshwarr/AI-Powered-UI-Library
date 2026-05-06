

import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { currentUser } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/currentUser", isAuth, currentUser);

export default userRouter