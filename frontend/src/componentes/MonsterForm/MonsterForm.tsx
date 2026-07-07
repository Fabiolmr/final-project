"use client";

import '@/componentes/MonsterForm/MonsterForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Monster } from "@/tipos/monstro";
import {
  createMonsters,
  updateMonster,
} from "@/services/monstro.services"

interface Props {
  monstro?: Monster;
}

export default function MonsterForm({ monstro }: Props) {
  const router = useRouter();

    const [titulo, setTitulo] = useState(
    monstro?.titulo ?? ""
    );

    const [imagem, setImagem] = useState(
    monstro?.imagem ?? ""
    );

    const [nota, setNota] = useState(
    monstro?.nota ?? 0
    );
   
    async function handleSubmit( e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            imagem,
            nota,
        };

        if (monstro) {
            await updateMonster( monstro.id, payload);
        } else {
            await createMonsters(payload);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="monster-form">
        <h1>
        {monstro
            ? "Enfrentar Monstro"
            : "Novo Monstro"}
        </h1>
        <div className="form-input">
            <input
                value={titulo}
                onChange={(e) =>
                setTitulo(e.target.value)
            }
            placeholder="Título"
        />
        </div>
        <div className="form-input">
            <input
                value={imagem}
                onChange={(e) =>
                setImagem(e.target.value)
                }
            placeholder="URL Imagem"
        />
        </div>
        <div className="form-input">
            <input
                type="number"
                defaultValue={nota}
                onChange={(e) =>
                setNota(Number(e.target.value))
                }
            />
        </div>
        <button type="submit">
            Salvar
        </button>
        </form>
    );
}