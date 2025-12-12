import useTokenStore from "../stores/TokenStore";

export default function useFetchWithAuth() {
  const { tokenResponse } = useTokenStore();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  if (!tokenResponse.token) {
    throw new Error("Usuário não autenticado");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenResponse.token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    useTokenStore.getState().setTokenResponse({ 
      token: "", 
      idUsuario: 0, 
      nome: "", 
      role: "" 
    });
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const errorJson = await response.json();
      const error = new Error(errorJson.message || errorJson.error || 'Erro desconhecido');
      (error as any).status = response.status;
      (error as any).data = errorJson;
      throw error;
    } else {
      const errorText = await response.text();
      const error = new Error(errorText || response.statusText);
      (error as any).status = response.status;
      throw error;
    }
  }

  return response;
  };

  return { fetchWithAuth };
}