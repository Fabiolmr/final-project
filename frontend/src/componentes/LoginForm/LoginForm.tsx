"use client"

import { loginSchema } from "@/schemas/login.schema";
import { login } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import '@/componentes/LoginForm/LoginForm.css';
import Link from "next/link";

export default function LoginForm()
{
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.SyntheticEvent)
    {
        e.preventDefault();

        const result = loginSchema.safeParse({email, senha});

        if(!result.success)
        {
            toast.error(result.error.issues[0].message);
            return;
        }

        try {
            await login({email, senha});
            toast.success('Login Realizado');
            window.location.href = '/';
        } catch {
            toast.error('Usuário ou senha inválidos');
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-left">
                <img 
                    src="https://logos-world.net/wp-content/uploads/2021/12/DnD-Emblem.png" 
                    alt="D&D Dragon Logo" 
                    className="auth-logo"
                />
                <h1>Bestiário<span>-X</span></h1>
                <p>Organize seu bestiário e crie seus próprios monstros para sua campanha!</p>
            </div>

            <div className="auth-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Entrar na Campanha</h2>
                    
                    <div className="div-input">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            aria-label="Email"
                            required
                        />
                    </div>
                    <div className="div-input"> 
                        <input 
                            type="password" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                            aria-label="Senha"
                            required
                        />
                    </div>

                    <button type="submit">Entrar</button>
                    
                    <div className="auth-switch-box">
                        <span className="auth-switch-text">Ainda não tem um bestiário?</span>
                        <Link href="/create" className="auth-switch-link">Cadastre-se</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}