import {Monster, CreateMonsterDTO, UpdateMonsterDTO} from "@/tipos/monstro";

const API_URL =
  process.env.DATABASE_URL;

export async function getMonsters(): Promise<Monster[]>
{
    const response = await fetch(`${API_URL}/monstros`);
    const dados = await response.json();
    return dados;

}

export async function getMonster(id: string): Promise<Monster> {
  const response = await fetch(`${API_URL}/monstros/${id}`);

  return response.json();
}

export async function createMonsters(filme: CreateMonsterDTO): Promise<void>
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