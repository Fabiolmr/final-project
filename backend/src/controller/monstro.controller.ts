import { Request, Response } from "express";
import { MonstroService } from "../services/monstro.services";

const monstroService = new MonstroService();

export class MonstroController {

    async getAll(req: Request, res: Response) {
        try {
            const monstros = await monstroService.getAll();
            res.json(monstros);
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                    ? error.message
                    : "Erro",
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const monstro = await monstroService.getById(id);
            res.json(monstro);
        } catch (error) {
            res.status(404).json({
                message:
                    error instanceof Error
                    ? error.message
                    : "Erro",
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, size, type, hit_points } = req.body;
            const monstro = await monstroService.create(name, size, type, hit_points);
            res.status(201).json(monstro);
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                    ? error.message
                    : "Erro",
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, size, type, hit_points } = req.body;
            const monstro = await monstroService.update(id, name, size, type, hit_points);
            res.json(monstro);
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                    ? error.message
                    : "Erro",
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await monstroService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                    ? error.message
                    : "Erro",
            });
        }
    }
}