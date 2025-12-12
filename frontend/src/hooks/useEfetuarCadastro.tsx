import { useMutation } from "@tanstack/react-query";

export interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
}

const BACKEND_URL = "http://localhost:8080";

const useEfetuarCadastro = () => {
  return useMutation({
    mutationFn: async (usuario: UsuarioCadastro) => {
      const response = await fetch(`${BACKEND_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData;
      }

      return response.json();
    },
  });
};

export default useEfetuarCadastro;
