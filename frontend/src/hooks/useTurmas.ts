import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';

interface Turma {
  id: number;
  codigo: string;
  nome: string;
  ano: number;
  periodo: number;
}

export function useTurmas() {
  const api = useApi<Turma>('/turmas');
  
  return useQuery({
    queryKey: ['turmas'],
    queryFn: () => api.recuperarTodos(),
  });
}

export function useTurmasPorDisciplina(disciplinaId: number) {
  const api = useApi<Turma>('/turmas');
  
  return useQuery({
    queryKey: ['turmas', disciplinaId],
    queryFn: () => api.recuperarComSubRota('disciplina', disciplinaId),
    enabled: !!disciplinaId,
  });
}