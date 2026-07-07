export interface LoginDTO
{
    email: string;
    senha: string;
}

export interface CreateDTO{
  nome: string;
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}