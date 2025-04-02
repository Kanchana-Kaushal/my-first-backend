import express from "express";
import userController from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.post("/signin", userController.createUser);

userRouter.post("/login", userController.logInUser);

userRouter.delete("/delete", userController.removeUser);

userRouter.put("/banuser", userController.banUser);

userRouter.get("/", userController.getAll);

export default userRouter;
