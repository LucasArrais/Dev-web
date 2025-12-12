import { useMutation } from "@tanstack/react-query";
import type { UsuarioLogin } from "../interfaces/UsuarioLogin";
import { URL_AUTENTICACAO, URL_BASE } from "../util/constants";
import useTokenStore from "../stores/TokenStore";

const useEfetuarLogin = () => {
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);

  const efetuarLogin = async (usuarioLogin: UsuarioLogin) => {
    const response = await fetch(`${URL_BASE}${URL_AUTENTICACAO}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(usuarioLogin),
    });

    if (!response.ok) {
      const error: any = await response.json().catch(() => ({}));
      if (error && error.message) throw error;
      else
        throw new Error(`Erro ao efetuar login. Status code = ${response.status}`);
    }

    const data = await response.json();
    setTokenResponse({
      idUsuario: data.idUsuario,
      token: data.token,
      nome: data.nome,
      role: data.role,
    });

    return data;
  };

  return useMutation({
    mutationFn: (usuarioLogin: UsuarioLogin) => efetuarLogin(usuarioLogin),
  });
};

export default useEfetuarLogin;
