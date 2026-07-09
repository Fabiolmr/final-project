import { prisma } from "../prisma/client";

export class MonstroService {

    async getAll(userId: number) {
        return prisma.monster.findMany({
            where: { userId },
        });
    }

    async getById(id: number, userId: number) {
        const monstro = await prisma.monster.findFirst({
            where: { id:id, userId: userId },
        });

        if (!monstro) {
            throw new Error("Monstro não encontrado");
        }

        return monstro;
    }

    async create(dados: {name: string, size: string, type: string, hit_points: number}, userId: number) {
        const monstro = await prisma.monster.create({
            data: {
                name: dados.name,
                size: dados.size,
                type: dados.type,
                hit_points: dados.hit_points,
                userId: userId
            },
        });

        return monstro;
    }

    async update(id: number, name: string, size: string, type: string, hit_points: number, userId: number) {
        const monster = await this.getById(id, userId)

            return prisma.monster.update({
                where: { id: monster.id },
                data: { name, size, type, hit_points },
            })
    }

    async delete(id: number, userId: number) {
        const monster = await this.getById(id, userId)

        await prisma.monster.delete({
            where: { id: monster.id },
        });
    }
}