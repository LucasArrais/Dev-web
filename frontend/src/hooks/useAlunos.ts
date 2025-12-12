import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from './useApi';

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface AlunoFormData {
  nome: string;
  email: string;
  telefone: string;
}

export function useAlunos() {
  const api = useApi<Aluno>('/alunos');

  return useQuery({
    queryKey: ['alunos'],
    queryFn: () => api.recuperarTodos(),
  });
}

export function useAluno(id: number) {
  const api = useApi<Aluno>('/alunos');

  return useQuery({
    queryKey: ['aluno', id],
    queryFn: () => api.recuperarPorId(id),
    enabled: !!id,
  });
}

export function useCreateAluno() {
  const queryClient = useQueryClient();
  const api = useApi<Aluno>('/alunos');

  return useMutation({
    mutationFn: (data: AlunoFormData) => api.cadastrar(data as Aluno),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
    },
  });
}

export function useUpdateAluno() {
  const queryClient = useQueryClient();
  const api = useApi<Aluno>('/alunos');

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AlunoFormData }) => 
      api.alterar(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
      queryClient.invalidateQueries({ queryKey: ['aluno', variables.id] });
    },
  });
}

export function useDeleteAluno() {
  const queryClient = useQueryClient();
  const api = useApi<Aluno>('/alunos');

  return useMutation({
    mutationFn: (id: number) => api.remover(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
      alert('Aluno removido com sucesso!');
    },
    onError: (error: any) => {
      const errorMessage = error.message || '';
      const errorStatus = error.status || 0;
      
      console.log('🔍 DEBUG - Erro ao remover aluno:');
      console.log('Mensagem:', errorMessage);
      console.log('Status:', errorStatus);
      
      let mensagemParaMostrar = errorMessage;
      
      try {
        if (errorMessage.trim().startsWith('{')) {
          const errorJson = JSON.parse(errorMessage);
          if (errorJson.message) {
            mensagemParaMostrar = errorJson.message;
          } else if (errorJson.error) {
            mensagemParaMostrar = errorJson.error;
          }
        }
      } catch (e) {
        console.log('Não é JSON válido, usando mensagem original');
      }
      
      console.log('Mensagem extraída:', mensagemParaMostrar);
      
      if (errorStatus === 409 || mensagemParaMostrar.includes('inscrito') || mensagemParaMostrar.includes('turmas')) {
        alert(mensagemParaMostrar);
        return;
      }

      if (errorStatus === 401 || mensagemParaMostrar.includes('Sessão expirada')) {
        alert('Sua sessão expirou. Faça login novamente.');
        window.location.href = '/login';
        return;
      }

      if (errorStatus === 403 || mensagemParaMostrar.includes('403') || mensagemParaMostrar.includes('Forbidden')) {
        alert('Você não tem permissão para remover alunos. Apenas administradores.');
        return;
      }

      console.error('Erro ao deletar aluno:', error);
      alert(`Erro ao remover aluno: ${mensagemParaMostrar.substring(0, 200)}`);
    },
  });
}

export function useAlunosNaoInscritos(turmaId: number) {
  const api = useApi<Aluno>('/alunos');

  return useQuery({
    queryKey: ['alunos-nao-inscritos', turmaId],
    queryFn: () => api.recuperarComSubRota('nao-inscritos', turmaId),
    enabled: !!turmaId,
  });
}

export function useAlunosComPaginacao(pagina: number, tamanho: number) {
  const api = useApi<Aluno>('/alunos');

  return useQuery({
    queryKey: ['alunos-paginados', pagina, tamanho],
    queryFn: () => api.recuperarComPaginacao({ 
      pagina: pagina.toString(), 
      tamanho: tamanho.toString() 
    }),
  });
}

