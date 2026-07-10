"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "@/app/actions/auth";
import "./Header.css";

export default function Header() {
  const router = useRouter();
  
  const [nomeUsuario, setNomeUsuario] = useState("Mestre da Campanha"); 

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await fetch("http://localhost:3001/user/busca", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
        });
        
        if (response.ok) {
          const dados = await response.json();
          
          if (dados && dados.nome) {
            setNomeUsuario(dados.nome);
          }
        } else {
          console.error("Backend respondeu com erro ao buscar usuário:", response.status);
        }
      } catch (error) {
        console.error("Erro de rede ao buscar nome do usuário:", error);
      }
    }

    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
      toast.success("Você saiu da taverna com segurança!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao tentar sair da taverna.");
      console.error(error);
    }
  };

  return (
    <header className="main-header">
      <div className="header-brand">
        <Link href="/">
          🐉 <span>Bestiário-X</span>
        </Link>
      </div>

      <div className="header-actions">
        <span className="user-name">Olá, <strong>{nomeUsuario}</strong></span>
        
        <Link href="/perfil" className="btn-header btn-profile">
          🛡️ Perfil
        </Link>
        
        <button onClick={handleLogout} className="btn-header btn-logout">
          🚪 Sair
        </button>
      </div>
    </header>
  );
}