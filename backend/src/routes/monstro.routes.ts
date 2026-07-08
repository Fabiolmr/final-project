import { Router } from "express";
import { MonstroController } from "../controller/monstro.controller";
import { authMidleware } from "../middleware/auth.middleware";

const router = Router();

const monstroController = new MonstroController();

router.get("/", authMidleware, monstroController.getAll);
router.get("/:id", authMidleware, monstroController.getById);
router.post("/", authMidleware, monstroController.create);
router.put("/:id", authMidleware, monstroController.update);
router.delete("/:id", authMidleware, monstroController.delete);

export { router as monstroRoutes };