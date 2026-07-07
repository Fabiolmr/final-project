"use client"

import { loginSchema } from "@/schemas/login.schema";
import { login } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import '@/componentes/LoginForm/LoginForm.css';
import Image from "next/image";

export default function LoginForm()
{
    const [email, setEmail] =  useState("");
    const [senha, setSenha] =  useState("");
    const router = useRouter();

    async function handleSubmit(e: React.SyntheticEvent)
    {
        e.preventDefault();

        const result = loginSchema.safeParse({email,senha});

        if(!result.success)
        {
            toast.error(result.error.issues[0].message);
            return;
        }

        try{
            await login({email,senha});

            toast.success('Login Realizado');

            router.push('/');

            router.refresh();
        }catch{
            toast.error('Usuário ou senha inválidos');
        }
    }

    return(

        <form onSubmit={handleSubmit} className="login-form ">
            <Image 
              src="/logo-tmdb.svg"
              alt="Logo TMDB"
              width={200}
              height={40}
              className="logo-img"
            />
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

            <button>Entrar</button>
        </form>
    )
}