export interface Monster {
    id: number;
    titulo: string;
    imagem: string;
    nota: number;
}

export interface CreateMonsterDTO  {
    titulo: string;
    imagem: string;
    nota: number;
}

export interface UpdateMonsterDTO  {
    titulo?: string;
    imagem?: string;
    nota?: number;
}