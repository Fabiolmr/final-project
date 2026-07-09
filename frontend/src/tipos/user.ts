export interface UserProfile{
    nome: string,
    email: string,
}

export interface UpdaterUserDTO{
    nome?: string,
    email?: string,
    novaSenha?: string,
    senhaAtual: string
}