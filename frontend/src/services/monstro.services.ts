import {Monster, CreateMonsterDTO, UpdateMonsterDTO} from "@/tipos/monstro";
import { error } from "console";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMonsters(): Promise<Monster[]>
{
    const response = await fetch(`${API_URL}/monstros`);

    //apenas para testes pois ainda não tem rota monstros
    if(!response.ok){
        console.error("Ainda não tem essa rota")
        return []
    }

    const dados = await response.json();
    return dados;
}

export async function getMonster(id: string): Promise<Monster> {
  const response = await fetch(`${API_URL}/monstros/${id}`);

  //apenas para testes pois ainda não tem rota monstros
    if(!response.ok){
        throw new Error('Erro')
    }

  return response.json();
}

export async function createMonsters(monstro: CreateMonsterDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/monstros`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(monstro),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}


export async function updateMonster(id: number, monstro: UpdateMonsterDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/monstros/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(monstro),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}

export async function deleteMonster(id: number): Promise<void>
{
    await fetch(`${API_URL}/monstros/${id}`,{
        method: "DELETE",
    });
}