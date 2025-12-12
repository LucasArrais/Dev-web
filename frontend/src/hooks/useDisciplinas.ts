import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';

interface Disciplina {
  id: number;
  nome: string;
  cargaHoraria: number;
}

export function useDisciplinas() {
  const api = useApi<Disciplina>('/disciplinas');
  
  return useQuery({
    queryKey: ['disciplinas'],
    queryFn: () => api.recuperarTodos(),
  });
}