import { Monster, CreateMonsterDTO, UpdateMonsterDTO } from "@/tipos/monstro";
import { string } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMonsters(token?: string): Promise<Monster[]> {

    const headers: HeadersInit = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Cookie"] = `token=${token}`;
    }

    const response = await fetch(`${API_URL}/monstros`, {
        cache: 'no-store',
        headers: headers, 
        credentials: "include"});

    if(!response.ok){
        const errorMessage = await response.text(); 
        console.error("Erro retornado pelo Back-end:", errorMessage);
        throw new Error("Erro ao consultar monstros");
    }

    const dados = await response.json();
    return dados;
}

export async function getMonster(id: string, token?: string): Promise<Monster> {
    const headers: HeadersInit = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Cookie"] = `token=${token}`;
    }
    const response = await fetch(`${API_URL}/monstros/${id}`, {
        cache: 'no-store',
        headers: headers,
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Erro ao consultar monstro");
    }

    return response.json();
}

export async function createMonster(monstro: CreateMonsterDTO): Promise<void> {
    const response = await fetch(`${API_URL}/monstros`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(monstro),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar monstro");
    }
}

export async function updateMonster(id: number, monstro: UpdateMonsterDTO): Promise<void> {
    const response = await fetch(`${API_URL}/monstros/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(monstro),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar monstro");
    }
}

export async function deleteMonster(id: number): Promise<void> {
    await fetch(`${API_URL}/monstros/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
}

export async function fetchRandomDndMonster(): Promise<CreateMonsterDTO> {
    const listResponse = await fetch("https://www.dnd5eapi.co/api/2014/monsters");
    const listData = await listResponse.json();
    const monstersList = listData.results;

    const randomIndex = Math.floor(Math.random() * monstersList.length);
    const randomMonster = monstersList[randomIndex];

    const monsterResponse = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${randomMonster.index}`);
    const monsterData = await monsterResponse.json();

    return {
        name: monsterData.name,
        size: monsterData.size,
        type: monsterData.type,
        hit_points: monsterData.hit_points
    };
}