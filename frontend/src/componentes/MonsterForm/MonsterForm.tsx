"use client";

import '@/componentes/MonsterForm/MonsterForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Monster } from "@/tipos/monstro";
import {
  createMonster,
  updateMonster,
} from "@/services/monstro.services"

interface Props {
  monstro?: Monster;
}

export default function MonsterForm({ filme }: Props) {
  const router = useRouter();

    const [titulo, setTitulo] = useState(
    filme?.titulo ?? ""
    );

    const [imagem, setImagem] = useState(
    filme?.imagem ?? ""
    );

    const [nota, setNota] = useState(
    filme?.nota ?? 0
    );
   
    async function handleSubmit( e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            imagem,
            nota,
        };

        if (filme) {
            await updateMonster( filme.id, payload);
        } else {
            await createMonster(payload);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="monster-form">
        <h1>
        {filme
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