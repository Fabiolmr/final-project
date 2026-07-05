import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../prisma/client';

describe('Testes de Autenticação (Cadastro, Login e Logout)', () => {
  
  beforeAll(async () => {
    // Limpa os dados de usuário antes do teste
    await prisma.user.deleteMany();
  });

  // 1. INICIALIZAMOS A VARIÁVEL COMO UM ARRAY VAZIO PARA O TYPESCRIPT NÃO RECLAMAR
  let cookieDeSessao: string[] = [];

  it('1. Deve cadastrar um novo usuário com sucesso', async () => {
    const resposta = await request(app)
      .post('/auth/create')
      .send({
        nome: 'nome Teste',
        email: 'teste@teste.com',
        senha: 'senha_segura_123'
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
  });

  it('2. Deve fazer login e receber o cookie com o token', async () => {
    const resposta = await request(app)
      .post('/auth/login') 
      .send({
        email: 'teste@teste.com',
        senha: 'senha_segura_123'
      });

    expect(resposta.status).toBe(200);
    expect(resposta.body.success).toBe(true);
    
    // Garantimos que, se o cabeçalho não vier, a variável não ficará undefined
    cookieDeSessao = (resposta.headers['set-cookie'] as string[]) || [];
    
    // Verifica se o array realmente não está vazio
    expect(cookieDeSessao.length).toBeGreaterThan(0);
  });

  it('3. Deve fazer logout e limpar o cookie de sessão', async () => {
    const resposta = await request(app)
      .post('/auth/logout')
      // 2. PROTEGEMOS O ENVIO CASO O COOKIE ESTEJA VAZIO
      .set('Cookie', cookieDeSessao[0] || ''); 

    expect(resposta.status).toBe(200);
    expect(resposta.body.success).toBe(true);

    // 3. PROTEGEMOS A LEITURA DO NOVO COOKIE
    const cookieApagado = (resposta.headers['set-cookie'] as string[]) || [];
    expect(cookieApagado.length).toBeGreaterThan(0);
    
    // Como garantimos que é um array, o .some() vai rodar com perfeição
    const tokenLimpado = cookieApagado.some((cookie) => cookie.includes('token=;'));
    expect(tokenLimpado).toBe(true);
  });

});