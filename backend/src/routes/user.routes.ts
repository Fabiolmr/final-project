import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMidleware } from "../middleware/auth.middleware";

const router = Router();

const userController = new UserController();

router.put("/update", authMidleware, userController.update);
router.delete("/delete", authMidleware, userController.delete);
router.get('/busca', authMidleware, userController.busca);

export {router as userRoutes};