"use client";

import '@/componentes/PerfilForm/PerfilForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/tipos/user";
import {  deleteUser, updateUser} from "@/services/user.services";
import { perfilSchema } from '@/schemas/perfil.schema';
import { toast } from 'sonner';

interface Props {
    usuario: UserProfile;
}

export default function PerfilForm({ usuario }: Props){
    const router = useRouter();

    const [nome, setNome] = useState(usuario.nome);
    const [email, setEmail] = useState(usuario.email);
    const [novaSenha, setNovaSenha] = useState("");
    const [senhaAtual, setSenhaAtual] = useState("");

    async function handleUpdate(e: React.SyntheticEvent) {
        e.preventDefault();
        
        const result = perfilSchema.safeParse({
            nome, email, novaSenha, senhaAtual
        })

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        try {
            await updateUser({
                nome,
                email,
                novaSenha: novaSenha ? novaSenha : undefined,
                senhaAtual
            });
            
            toast.success("Perfil atualizado com sucesso")
            setSenhaAtual("");
            setNovaSenha("");
            router.refresh();
            
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao atualizar");
        }
    }
    
    async function handleDelete() {
        const confirmacao = window.confirm("Tem certeza? Esta ação não pode ser desfeita.");
        if (!confirmacao) return;
        
        const senhaExclusao = window.prompt("Digite sua senha atual para confirmar a exclusão:");
        if (!senhaExclusao) return;
        
        try {
            await deleteUser(senhaExclusao);
            toast.success("Conta excluída com sucesso.");
            router.push("/login");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao excluir conta");
        }
    }
    
    
    return (
        <div className="perfil-container">
            <form onSubmit={handleUpdate} className="perfil-card">
                <h2>Informações Básicas</h2>
                
                <div className="form-group">
                    <label>Nome Completo</label>
                    <input 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        required 
                        />
                </div>

                <div className="form-group">
                    <label>E-mail</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        />
                </div>

                <hr className="divisor" />

                <h2>Segurança</h2>
                
                <div className="form-group">
                    <label>Nova Senha (deixe em branco para não alterar)</label>
                    <input 
                        type="password" 
                        value={novaSenha} 
                        onChange={(e) => setNovaSenha(e.target.value)} 
                        placeholder="••••••••"
                        />
                </div>

                <div className="form-group campo-destaque">
                    <label>Senha Atual (Obrigatória para salvar)</label>
                    <input 
                        type="password" 
                        value={senhaAtual} 
                        onChange={(e) => setSenhaAtual(e.target.value)} 
                        placeholder="Sua senha atual"
                        />
                </div>

                <button type="submit" className="btn-salvar">
                    Salvar Alterações
                </button>
            </form>


            <div className="danger-zone">
                <div>
                    <h3>Excluir Conta</h3>
                    <p>Ao excluir sua conta, todos os seus monstros e dados serão perdidos para sempre.</p>
                </div>
                <button type="button" onClick={handleDelete} className="btn-deletar">
                    Excluir Minha Conta
                </button>
            </div>
        </div>
    );
}