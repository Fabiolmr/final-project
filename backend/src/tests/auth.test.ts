import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../prisma/client';

describe('Testes de Autenticação (Cadastro, Login e Logout)', () => {
  
  beforeAll(async () => {
    // Limpa os dados de usuário antes do teste
    await prisma.user.deleteMany();
  });

  // Variável para guardar o Cookie inteiro simulando o navegador
  let cookieDeSessao: string;

  it('1. Deve cadastrar um novo usuário com sucesso', async () => {
    const resposta = await request(app)
      .post('/auth/create')
      .send({
        email: 'teste@teste.com',
        senha: 'senha_segura_123'
      });

    expect(resposta.status).toBe(201);
  });

  it('2. Deve fazer login e receber o cookie com o token', async () => {
    const resposta = await request(app)
      .post('/auth/login') 
      .send({
        email: 'teste@teste.com',
        senha: 'senha_segura_123'
      });

    expect(resposta.status).toBe(200);
    
    // O backend envia os cookies em um cabeçalho chamado 'set-cookie'
    // Nós guardamos isso para usar na próxima requisição
    cookieDeSessao = resposta.headers['set-cookie'];
    
    // Garantimos que o cookie foi realmente enviado pelo servidor
    expect(cookieDeSessao).toBeDefined();
  });

//   it('3. Deve acessar uma rota protegida usando o cookie', async () => {
//     const resposta = await request(app)
//       .get('/auth/perfil') // Coloque aqui alguma rota sua que use o authMiddleware
//       .set('Cookie', cookieDeSessao); // Enviando o cookie igual o navegador faria

//     expect(resposta.status).toBe(200);
//   });

});