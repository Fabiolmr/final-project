"use client";

import { createSchema } from "@/schemas/create.schema";
import { create } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import '@/componentes/LoginForm/LoginForm.css';
import Link from "next/link";

export default function CreateForm()
{
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");

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
            toast.error(result.error.issues[0].message);
            return;
        }
        
        try {
            await create({nome, email, senha});
            toast.success("Usuário criado com sucesso");
            router.push('/login');  
        } catch (error) {
            toast.error("Erro ao criar usuário");
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
                    <h2>Criar Cadastro</h2>
                    
                    <div className="div-input">
                        <input 
                            type="text" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome de Usuário"
                            aria-label="Nome"
                            required
                        />
                    </div>
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
                    <div className="div-input">
                        <input 
                            type="password"
                            value={confSenha}
                            onChange={(e) => setConfSenha(e.target.value)}
                            placeholder="Confirmar Senha"
                            aria-label="Confirmar Senha" 
                            required
                        />
                    </div>

                    <button type="submit">Criar Conta</button>

                    <div className="auth-switch-box">
                        <span className="auth-switch-text">Já possui um bestiário?</span>
                        <Link href="/login" className="auth-switch-link">Entrar aqui</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}