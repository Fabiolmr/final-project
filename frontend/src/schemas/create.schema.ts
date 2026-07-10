import { z} from "zod";

export const createSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confSenha: z.string()
}).refine((d) => d.senha === d.confSenha, {
    message: "Senhas não coincidem",
    path: [
        "confSenha"
    ],
})