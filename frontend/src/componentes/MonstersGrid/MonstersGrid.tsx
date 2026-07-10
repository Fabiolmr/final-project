"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Monster } from "@/tipos/monstro";
import { deleteMonster, fetchRandomDndMonster, createMonster } from "@/services/monstro.services";
import MonsterCard from "../MonsterCard/MonsterCard";
import Link from "next/link"; // Importamos o Link para o botão manual
import '@/componentes/MonstersGrid/MonstersGrid.css';

interface Props {
    monstros: Monster[];
}

export default function MonsterGrid({ monstros }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete(id: number) {
        await deleteMonster(id);
        router.refresh();
    }

    async function handleGerarAleatorio() {
        setLoading(true);
        try {
            const novoMonstro = await fetchRandomDndMonster();
            await createMonster(novoMonstro);
            router.refresh();
        } catch (error) {
            console.error("Erro ao gerar monstro aleatório:", error);
        } finally {
            setLoading(false);
        }
    }

    const monstrosMap = monstros.map((m) => {
        return <MonsterCard 
            key={m.id}
            monstro={m}
            onDelete={handleDelete}
        />
    }); 

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                
                <div className="title-group">
                    <h1>Meu Bestiário</h1>
                    <p>Gerencie seus monstros capturados</p>
                </div>

                <div className="buttons-group">
                    <Link href="/monstros/criar" className="btn-action btn-primary">
                        ⚔️ Criar Manualmente
                    </Link>
                    
                    <button 
                        onClick={handleGerarAleatorio} 
                        disabled={loading}
                        className="btn-action btn-secondary"
                    >
                        {loading ? '⏳ Invocando da API...' : '🎲 Invocar Aleatório'}
                    </button>
                </div>

            </header>

            {/* Grid de Cards abaixo */}
            <div className="grid">
                {monstrosMap}
            </div>
        </div>
    );
}