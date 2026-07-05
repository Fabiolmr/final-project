import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../services/user.services';
import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';

// 1. SIMULAÇÃO (MOCKS): Avisamos ao Vitest para não usar o Prisma e o Bcrypt de verdade
vi.mock('../prisma/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    }
  }
}));

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn()
  }
}));

// 2. AGRUPAMENTO: Descrevemos qual parte do sistema estamos testando
describe('UserService', () => {
  let userService: UserService;

  // Roda antes de cada teste para garantir que o ambiente está limpo
  beforeEach(() => {
    userService = new UserService();
    vi.clearAllMocks(); 
  });

  // 3. SUBCONJUNTO: Testes específicos para a função "delete"
  describe('Função Delete', () => {

    it('deve deletar o usuário com sucesso se a senha estiver correta', async () => {
      // PREPARAÇÃO (Arrange): Criamos um cenário falso de sucesso
      const usuarioFalso = { id: 1, email: 'teste@teste.com', senha: 'senhaCriptografadaNoBanco' };
      
      // Fingimos que o Prisma encontrou o usuário
      vi.mocked(prisma.user.findUnique).mockResolvedValue(usuarioFalso as any);
      // Fingimos que o Bcrypt disse que a senha bateu (true)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      // AÇÃO (Act) e VERIFICAÇÃO (Assert): Executamos a função e esperamos que não dê nenhum erro
      await expect(userService.delete(1, 'senha123')).resolves.not.toThrow();

      // Garantimos que o Prisma de fato foi chamado para deletar o usuário 1
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar um erro se o usuário não for encontrado no banco', async () => {
      // PREPARAÇÃO: Fingimos que o Prisma não achou ninguém (retornou null)
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      // AÇÃO e VERIFICAÇÃO: Executamos a função e esperamos que o erro exato apareça
      await expect(userService.delete(99, 'senha123')).rejects.toThrow("usuario não existe");
      
      // Garantimos que a função parou e NÃO chamou o delete
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });

    it('deve lançar um erro se a senha estiver incorreta', async () => {
      // PREPARAÇÃO: Usuário existe, mas o bcrypt vai dizer que a senha é falsa
      const usuarioFalso = { id: 1, email: 'teste@teste.com', senha: 'senhaCriptografadaNoBanco' };
      vi.mocked(prisma.user.findUnique).mockResolvedValue(usuarioFalso as any);
      
      // Fingimos que a senha NÃO bateu (false)
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      // AÇÃO e VERIFICAÇÃO: Esperamos o erro de senha
      await expect(userService.delete(1, 'senhaErrada')).rejects.toThrow("Senha incorreta");

      // Garantimos que a função parou e NÃO chamou o delete
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });

  });
});