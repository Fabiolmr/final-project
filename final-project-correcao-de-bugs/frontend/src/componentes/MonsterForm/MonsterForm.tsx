"use client";

import '@/componentes/MonsterForm/MonsterForm.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Monster } from "@/tipos/monstro";
import { createMonster, updateMonster } from "@/services/monstro.services";

interface Props {
    monstro?: Monster;
}

export default function MonsterForm({ monstro }: Props) {
    const router = useRouter();

    const [name, setName] = useState(monstro?.name ?? "");
    const [size, setSize] = useState(monstro?.size ?? "Medium");
    const [type, setType] = useState(monstro?.type ?? "Humanoid");
    const [hitPoints, setHitPoints] = useState(monstro?.hit_points ?? 10);
   
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            name,
            size,
            type,
            hit_points: Number(hitPoints),
        };

        if (monstro) {
            await updateMonster(monstro.id, payload);
        } else {
            await createMonster(payload);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="monster-form">
            <h1>
                {monstro ? "Editar Monstro" : "Novo Monstro"}
            </h1>
            
            <div className="form-input">
                <label>Nome:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do monstro"
                    required
                />
            </div>
            
            <div className="form-input">
                <label>Tamanho:</label>
                <input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Ex: Medium, Large"
                    required
                />
            </div>
            
            <div className="form-input">
                <label>Tipo:</label>
                <input
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Ex: Dragon, Humanoid"
                    required
                />
            </div>
            
            <div className="form-input">
                <label>Vida (HP):</label>
                <input
                    type="number"
                    value={hitPoints}
                    onChange={(e) => setHitPoints(Number(e.target.value))}
                    required
                />
            </div>
            
            <button type="submit">
                Salvar
            </button>
        </form>
    );
}