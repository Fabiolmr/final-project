import { prisma } from "../prisma/client";

export class MonstroService {

    async getAll() {
        return prisma.monster.findMany();
    }

    async getById(id: number) {
        const monstro = await prisma.monster.findUnique({
            where: { id },
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

    async update(id: number, name: string, size: string, type: string, hit_points: number) {
        const existeMonstro = await prisma.monster.findUnique({
            where: { id },
        });

        if (!existeMonstro) {
            throw new Error("Monstro não encontrado");
        }

        return prisma.monster.update({
            where: { id },
            data: { name, size, type, hit_points },
        });
    }

    async delete(id: number) {
        const existeMonstro = await prisma.monster.findUnique({
            where: { id },
        });

        if (!existeMonstro) {
            throw new Error("Monstro não encontrado");
        }

        await prisma.monster.delete({
            where: { id },
        });
    }
}