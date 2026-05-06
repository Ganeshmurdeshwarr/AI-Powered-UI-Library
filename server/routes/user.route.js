

import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { currentUser, getAllUsers } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/currentUser", isAuth, currentUser);
userRouter.get("/all-users",getAllUsers)


export default userRouter