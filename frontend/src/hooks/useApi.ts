import { URL_BASE } from "../util/constants";
import useFetchWithAuth from "./useFetchWithAuth";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";

const useApi = <T>(endpoint: string) => {
  const { fetchWithAuth } = useFetchWithAuth();
  const URL = `${URL_BASE}${endpoint}`;

  const recuperarTodos = async (): Promise<T[]> => {
    const response = await fetchWithAuth(URL);
    return await response.json();
  };

  const recuperarComParametros = async (
    params?: Record<string, string>
  ): Promise<T[]> => {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetchWithAuth(`${URL}${queryString}`);
    return await response.json();
  };

  const recuperarComPaginacao = async (
    params: Record<string, string>
  ): Promise<ResultadoPaginado<T>> => {
    const urlWithParams = `${URL}/paginacao?${new URLSearchParams(params)}`;
    const response = await fetchWithAuth(urlWithParams);
    return await response.json();
  };

  const recuperarPorId = async (id: number | string): Promise<T> => {
    const response = await fetchWithAuth(`${URL}/${id}`);
    return await response.json();
  };

  const cadastrar = async (obj: T): Promise<T> => {
    const response = await fetchWithAuth(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return await response.json();
  };


  const cadastrarComParametros = async (
    obj: T,
    params?: Record<string, string>
  ): Promise<T> => {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetchWithAuth(`${URL}${queryString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return await response.json();
  };

  const alterar = async (id: number | string, obj: Partial<T>): Promise<T> => {
    const response = await fetchWithAuth(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return await response.json();
  };

const remover = async (id: number | string): Promise<void> => {
  const response = await fetchWithAuth(`${URL}/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    let errorMessage = '';
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorJson = await response.json();
        errorMessage = JSON.stringify(errorJson);
      } else {
        errorMessage = await response.text();
      }
    } catch (e) {
      errorMessage = `Erro ao processar resposta: ${response.status}`;
    }
    
    const error = new Error(errorMessage);
    (error as any).status = response.status;
    throw error;
  }
};

  const recuperarComSubRota = async (
    subRota: string,
    id: number | string
  ): Promise<T[]> => {
    const response = await fetchWithAuth(`${URL}/${subRota}/${id}`);
    return await response.json();
  };

  return {
    recuperarTodos,
    recuperarComParametros,
    recuperarComPaginacao,
    recuperarPorId,
    cadastrar,
    cadastrarComParametros,
    alterar,
    remover,
    recuperarComSubRota,
  };
};

export default useApi;