"use client";

import { createSchema } from "@/schemas/create.schema";
import { create } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import '@/componentes/LoginForm/LoginForm.css';
import Image from "next/image";

export default function CreateForm()
{

    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] =  useState("");
    const [senha, setSenha] =  useState("");
    const [confSenha,setConfSenha] = useState("");

    async function handleSubmit(e : React.SyntheticEvent)
    {
        
        e.preventDefault();
        
        const result = createSchema.safeParse({
            nome,
            email,
            senha,
            confSenha,
        });

        if (!result.success) {
            toast.error(
                result.error.issues[0].message
            );

            return;
        }
        try {
            await create({nome, email,senha});
            toast.success("Usuário criado com sucesso");
            router.push('/login');  
        } catch (error) {
            toast.error("Erro ao criar usuário");
        }
    }

    return(

        <form onSubmit={handleSubmit} className="login-form">
            <Image 
                src="/logo-tmdb.svg"
                alt="Logo TMDB"
                width={200}
                height={40}
                className="logo-img"
            />
            <div className="div-input">
                <input 
                type="nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                aria-label="Nome"
                />
            </div>
            <div className="div-input">
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email"
                />
            </div>
            <div className="div-input">
                <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                aria-label="Senha"
                />
            </div>
            <div className="div-input">
                <input type="password"
                    value={confSenha}
                    onChange={(e) => setConfSenha(e.target.value)}
                    placeholder="Confirmar Senha"
                    aria-label="Confirmar Senha" 
                />
            </div>

            <button>Criar Conta</button>
        </form>
    )
}