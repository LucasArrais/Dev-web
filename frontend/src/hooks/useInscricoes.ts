import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  dataInscricao: string;
}

interface InscricaoData {
  aluno: { id: number };
  turma: { id: number };
}

export function useInscricoesPorTurma(turmaId: number) {
  const api = useApi<Inscricao>('/inscricoes');
  
  return useQuery({
    queryKey: ['inscricoes', turmaId],
    queryFn: () => api.recuperarComSubRota('turma', turmaId),
    enabled: !!turmaId,
  });
}

export function useCreateInscricao() {
  const queryClient = useQueryClient();
  const api = useApi<Inscricao>('/inscricoes');
  
  return useMutation({
    mutationFn: (data: InscricaoData) => api.cadastrar(data as any),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['alunos-nao-inscritos', variables.turma.id] });
      queryClient.invalidateQueries({ queryKey: ['inscricoes', variables.turma.id] });
    },
  });
}