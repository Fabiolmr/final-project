import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService(); //cria objeto para acessar o serviço de autenticação

//controle que vê quais rotas estão sendo chamadas e em qual servico vai acessar

export class AuthController{

    async create(req: Request,res: Response){    
        try{
            //puxa dados do corpo da req
            const {nome,email,senha} = req.body;

            //chama o service de criar
            const user = await authService.create(nome, email, senha);

            //retorna o usuário (id e email que retorna no service)
            res.status(201).json(user);
        } //se deu erro
        catch (error){
            res.status(400).json({
                message: 
                   error instanceof Error
                   ? error.message
                   : "Erro",
            });
        }
        
    }

    async login(req: Request,res: Response){
        try {
            //puxa dados do corpo da req
            const {email, senha} = req.body;

            //resposta recebe o token de sessão
            const resposta = await authService.login(email, senha);
            
            //por segurança, precisa manipular o token
            res.cookie("token", resposta.token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                }
            )
            res.json({
                success: true,
            });

        } catch (error)
        {
            res.status(400).json({
                message: 
                   error instanceof Error
                   ? error.message
                   : "Erro",
            });
        }
    }

    async logout(req: Request,res: Response){
        //paga o token
        res.clearCookie("token");

        //devolve na requisição que deu certo
        res.json({
            success: true,
        });
    }

}