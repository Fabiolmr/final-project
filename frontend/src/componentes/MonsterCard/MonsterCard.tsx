"use client";

import Link from "next/link";
import { Monster } from "@/tipos/monstro"
import '@/componentes/MonsterCard/MonsterCard.css';
import Image from "next/image";

interface MonsterCardProps {
  monstro: Monster;
  onDelete: (id: number) => void;
}

export default function MonsterCard({ monstro, onDelete}: MonsterCardProps) {
  return (
    <div className="card">

      <Image
        src={monstro.imagem}
        alt={monstro.titulo} 
        width={300}
        height={450}
        className="card-img"
      />

      <h2>{monstro.titulo}</h2>

      <p>⭐ {monstro.nota}</p>

      <div className="btn-acoes">
        <Link href={`/monstros/${monstro.id}/editar`}>
          Editar
        </Link>

        <button onClick={() => onDelete?.(monstro.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}