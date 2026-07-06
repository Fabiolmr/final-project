"use client";

import { useRouter } from "next/navigation";
import { Monster } from "@/tipos/monstro";

import { deleteMonster } from "@/services/monstro.services";
import MonsterCard from "../MonsterCard/MonsterCard";
import '@/componentes/MonstersGrid/MonstersGrid.css'

interface Props {
  monstros: Monster[];
}

export default function MonsterGrid({ monstros }: Props) {

  const router = useRouter();

  async function handleDelete (id: number) {
    await deleteMonster(id);
    router.refresh();
  }

  const monstrosMap = monstros.map((f) => {
    return <MonsterCard 
        key={f.id}
        monstro={m}
        onDelete={handleDelete}
    />
  }); 

  return (
    <div className="grid">
      {monstrosMap}
    </div>
  );
}