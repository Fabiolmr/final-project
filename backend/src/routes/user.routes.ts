import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMidleware } from "../middleware/auth.middleware";

const router = Router();

const userController = new UserController();

router.put("/update", authMidleware, userController.update);
router.delete("/delete", authMidleware, userController.delete);
router.get('/busca', authMidleware, userController.busca);

export {router as userRoutes};


/* Aqui fica as rotas na classe usuário
    Todas elas tem que passar pelo MidleWare para validar
    se o usário está autenticado
*/