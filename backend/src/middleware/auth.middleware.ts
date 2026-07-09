//aqui intercepta as requisições e verifica se está autenticado

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../tipos/auth.payload";

export function authMidleware(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message: "Token não encontrado"
        })
    }

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET!) as AuthPayload;
        
        res.locals.user = payload;

        next(); //chama a proxima função da rota
    }
    catch(error){
        res.status(400).json({
            message: "Token inválido"
        })
    }
}