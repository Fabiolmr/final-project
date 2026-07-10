"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "@/app/actions/auth"; // Importamos a action do servidor
import "./Header.css";

export default function Header() {
  const router = useRouter();

  // Exemplo de nome (pode ser dinâmico depois)
  const nomeUsuario = "Mestre da Campanha"; 

  const handleLogout = async () => {
    try {
      // Chama a função do servidor para apagar o cookie com segurança
      await logoutAction();
      
      toast.success("Você saiu da taverna com segurança!");
      
      // Empurra o usuário de volta para o login e limpa o cache de rotas
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