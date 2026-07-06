export interface Monster {
    id: number;
    name: string;
    size: string;
    type: string;
    hit_points: number;
}

export type CreateMonsterDTO = Omit<Monster, 'id'>;
export type UpdateMonsterDTO = CreateMonsterDTO;