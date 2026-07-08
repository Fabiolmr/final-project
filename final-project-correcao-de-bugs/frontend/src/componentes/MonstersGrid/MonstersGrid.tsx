"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Monster } from "@/tipos/monstro";
import { deleteMonster, fetchRandomDndMonster, createMonster } from "@/services/monstro.services";
import MonsterCard from "../MonsterCard/MonsterCard";
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
            <button 
                onClick={handleGerarAleatorio} 
                disabled={loading}
                className="btn-gerar-aleatorio"
                style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem' }}
            >
                {loading ? 'Invocando da API...' : '🎲 Invocar Monstro Aleatório'}
            </button>

            <div className="grid">
                {monstrosMap}
            </div>
        </div>
    );
}