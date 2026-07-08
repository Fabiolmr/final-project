import { Router } from "express";
import { MonstroController } from "../controller/monstro.controller";

const router = Router();

const monstroController = new MonstroController();

router.get("/", monstroController.getAll);
router.get("/:id", monstroController.getById);
router.post("/", monstroController.create);
router.put("/:id", monstroController.update);
router.delete("/:id", monstroController.delete);

export { router as monstroRoutes };