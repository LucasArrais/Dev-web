import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface Inscricao {
  id: number;
  aluno: Aluno;
  dataHora: string;
}

export function useAlunosPorTurma(turmaId: number) {
  const api = useApi<Inscricao>('/inscricoes');
  
  return useQuery({
    queryKey: ['alunos-turma', turmaId],
    queryFn: async () => {
      if (!turmaId) return [];
      const inscricoes = await api.recuperarComSubRota('turma', turmaId);
      
      return inscricoes.map(inscricao => inscricao.aluno);
    },
    enabled: !!turmaId,
  });
}

export function useAlunosDaTurma(turmaId: number) {
  const apiInscricoes = useApi<Inscricao>('/inscricoes');
  const apiAlunos = useApi<Aluno>('/alunos');
  
  return useQuery({
    queryKey: ['alunos-da-turma', turmaId],
    queryFn: async () => {
      if (!turmaId) return [];
      
      try {
        const inscricoes = await apiInscricoes.recuperarComSubRota('turma', turmaId);
        return inscricoes.map(inscricao => inscricao.aluno);
      } catch (error) {
        console.warn('Erro ao buscar inscrições, tentando buscar alunos diretamente:', error);
        const todosAlunos = await apiAlunos.recuperarTodos();
        return todosAlunos;
      }
    },
    enabled: !!turmaId,
  });
}