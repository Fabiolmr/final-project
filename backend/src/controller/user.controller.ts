import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { AuthPayload } from "../tipos/auth.payload";

const userService = new UserService();

export class UserController{

    async update(req: Request, res: Response){
        try{
            const dados = req.body

            const userPayload = res.locals.user as AuthPayload;
            const id = userPayload.id; //pega id pelo cookie

            await userService.update(id, dados);
            res.status(200).send();
        }
        catch(error){
            res.status(400).json({
                message:
                    error instanceof Error
                   ? error.message
                   : "Erro",
            })
        }
    }

    async delete(req: Request, res: Response){
        try{
            const userPayload = res.locals.user as AuthPayload;
            const id = userPayload.id; //pega id pelo cookie

            const { senha } = req.body;

            await userService.delete(id, senha);
            res.status(200).send();
        }
        catch(error){
            res.status(400).json({
                message:
                    error instanceof Error
                   ? error.message
                   : "Erro",
            })
        }
    }

    async busca(req:Request, res: Response){
        try{
            const userPayload = res.locals.user as AuthPayload;
            const id = userPayload.id; //pega id pelo cookie

            const dados = await userService.busca(id);
            res.status(200).json(dados);
        }
        catch(error){
            res.status(400).json({
                message:
                    error instanceof Error
                   ? error.message
                   : "Erro",
            })
        }
    }
}