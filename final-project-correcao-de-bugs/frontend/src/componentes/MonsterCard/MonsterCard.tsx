"use client";

import Link from "next/link";
import { Monster } from "@/tipos/monstro";
import '@/componentes/MonsterCard/MonsterCard.css';

interface MonsterCardProps {
    monstro: Monster;
    onDelete: (id: number) => void;
}

export default function MonsterCard({ monstro, onDelete }: MonsterCardProps) {
    return (
        <div className="card">
            <h2>{monstro.name}</h2>
            <p><strong>Tipo:</strong> {monstro.type} ({monstro.size})</p>
            <p><strong>Vida (HP):</strong> ❤️ {monstro.hit_points}</p>

            <div className="btn-acoes">
                <Link href={`/monstros/${monstro.id}/editar`}>
                    Editar
                </Link>

                <button onClick={() => onDelete(monstro.id)}>
                    Excluir
                </button>
            </div>
        </div>
    );
}