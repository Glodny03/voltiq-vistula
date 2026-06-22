import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { verifyAdminToken } from "../utils/verifyAdminToken.js";

const userRouter = Router();

userRouter.route("/all").get(verifyAdminToken, getAllUsers);

userRouter.route("/:id").get(getUser);

export default userRouter;
