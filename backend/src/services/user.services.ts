import { prisma } from "../prisma/client";
import bcrypt from "bcrypt"

export class UserService{

    async update(id: number, dados: {nome?:string, email?:string, novaSenha?: string, senhaAtual: string}){
        
        //verifica usuário
        const existeUser =  await prisma.user.findUnique({
            where: {id}
        })

        if(!existeUser){
            throw new Error("usuario não existe")
        }

        //verifica se a senha bate
        const senhaMatch = await bcrypt.compare(dados.senhaAtual, existeUser.senha);

        if(!senhaMatch){
            throw new Error("Senha incorreta")
        }

        //json para novos dados
        const novosDados: any = {}

        if(dados.nome){
            novosDados.nome = dados.nome;
        }

        if(dados.email){
            novosDados.email = dados.email;
        }        

        if(dados.novaSenha){
            novosDados.senha = await bcrypt.hash(dados.novaSenha, 10)
        }

        //verificação de segurança se nenhum dado foi enviado
        if (Object.keys(novosDados).length === 0) {
            throw new Error("Nenhum dado novo foi enviado para atualização");
        }

        await prisma.user.update({
            where: {id},
            data: novosDados,
        })
    }


    async delete(id: number, senha: string){

        const existeUser =  await prisma.user.findUnique({
            where: {id}
        })

        if(!existeUser){
            throw new Error(
                "usuario não existe"
            )
        }

        const senhaMatch = await bcrypt.compare(senha, existeUser.senha)

        if(!senhaMatch){
            throw new Error("Senha incorreta")
        }        

        await prisma.user.delete({
            where: {id}
        });
    }


    async busca(id: number){
        const user = await prisma.user.findUnique({
            where: {id},
            select: { /*seleciona quais informações do usuário vai retornar*/
                nome: true,
                email: true
            }
        })

        if(!user){
            throw new Error("Usuário não encontrado");
        }

        return user
    }
}