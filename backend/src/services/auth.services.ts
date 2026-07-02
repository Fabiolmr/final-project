import bcrypt from "bcrypt" //biblioteca de criptografia de senha
import { prisma } from "../prisma/client" //conexão com o prisma
import jwt from "jsonwebtoken" //token de sessão
import { getActiveResourcesInfo } from "node:process";

export class AuthService{

    async create(email: string, senha: string){
        //se já existe no BD
        const existeUser = await prisma.user.findUnique({ /*findUnique é fornecido pelo prisma*/
            where: {email}
        });

        if(existeUser){
            throw new Error(
                "Email já está em uso"
            )
        }

        //cria senha versão hash com tempo "OK"
        const senhaHashed = await bcrypt.hash(senha, 10);
        
        const dados = {
            email,
            senha: senhaHashed
        }

        //chama função que cria usuário
        const user = await prisma.user.create({ /*Função create é fornecido pelo prisma*/
            data: dados,
        });

        //mandar para algo que o front deve usar no futuro
        return {
            id: user.id,
            email: user.email
        }
    }

    async login(email: string, senha: string){
        
        const user =  await prisma.user.findUnique({
            where: {email}
        });
        
        //se usuário não existir
        if(!user){
            throw new Error(
                "Usuário ou senha inválido"
            );
        }

        // verifica se a senha passada bate com a senha hash
        const senhaMatch = await bcrypt.compare(senha,user.senha);

        // se não bate
        if(!senhaMatch){
            throw new Error(
                "Usuário ou senha inválido"
            );
        }

        //gera token de sessão
        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d", //token dura 1dia
            }
        );

        // Cada requisição do front para o 
        // back usando o http é isolada, já que
        // o HTTP é não guarda informação de acesso
        // Então precisa criar um token de sessão com
        // a assinatura JWT_SECRET, o id do usuário para 
        // identificar de quem e se é valida essa requisição
        // Vantagem é que não precisa consulta o BD em cada requisição
        // para saber quem é

        return {
            token,
        };
    }
}