import { Monster, CreateMonsterDTO, UpdateMonsterDTO } from "@/tipos/monstro";

const API_URL = process.env.DATABASE_URL;

export async function getMonsters(): Promise<Monster[]> {
    const response = await fetch(`${API_URL}/monstros`, { cache: 'no-store' });
    const dados = await response.json();
    return dados;
}

export async function getMonster(id: string): Promise<Monster> {
    const response = await fetch(`${API_URL}/monstros/${id}`);
    return response.json();
}

export async function createMonster(monstro: CreateMonsterDTO): Promise<void> {
    const response = await fetch(`${API_URL}/monstros`, {
        method: "POST",
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