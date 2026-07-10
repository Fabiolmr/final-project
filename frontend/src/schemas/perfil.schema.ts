import { z } from "zod";

export const perfilSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.email("E-mail inválido"),
    novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres").optional().or(z.literal("")),
    senhaAtual: z.string().min(1, "A senha atual é obrigatória para salvar as alterações.")
});