import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useTokenStore from "../stores/TokenStore";
import useApi from "../hooks/useApi";

const usuarioSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(150, "Email deve ter no máximo 150 caracteres"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres"),
  role: z.enum(["USER", "ADMIN"]),
});

type UsuarioFormData = z.infer<typeof usuarioSchema>;

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  role: string;
}

interface InfoUsuario {
  valido: boolean;
  duplicado: boolean;
  mensagem: string;
}

export default function CadastroUsuarioPage() {
  const navigate = useNavigate();
  const { tokenResponse } = useTokenStore();
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const api = useApi<Usuario>("/usuarios");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: UsuarioFormData) => {
    setMensagemSucesso("");
    setMensagemErro("");

    try {
      const usuarioParaEnviar: Usuario = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        role: data.role,
      };

      const resultado = await api.cadastrarComParametros(
        usuarioParaEnviar,
        { role: data.role }
      ) as unknown as InfoUsuario;
      
      if (resultado.valido) {
        setMensagemSucesso(resultado.mensagem);
        reset();
        
        setTimeout(() => {
          setMensagemSucesso("");
        }, 5000);
      } else {
        setMensagemErro(resultado.mensagem);
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
      setMensagemErro(
        error.message || "Erro ao cadastrar usuário. Tente novamente."
      );
    }
  };

  const isAdmin = tokenResponse.role === "ADMIN";

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #101820, #1e2a38)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">
            <i className="bi bi-person-plus-fill me-2"></i>
            Cadastrar Novo Usuário
          </h1>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Voltar
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: "#223345",
                color: "#fff",
                borderRadius: "1rem",
              }}
            >
              <div className="card-body p-4">
                <div className="alert alert-info mb-4">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>Administrador Logado:</strong> Você pode cadastrar novos usuários com diferentes perfis.
                </div>

                {mensagemSucesso && (
                  <div className="alert alert-success mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {mensagemSucesso}
                  </div>
                )}

                {mensagemErro && (
                  <div className="alert alert-danger mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {mensagemErro}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      <i className="bi bi-person-fill me-1"></i>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                      id="nome"
                      placeholder="Digite o nome do usuário"
                      {...register("nome")}
                      disabled={isSubmitting}
                    />
                    {errors.nome && (
                      <div className="invalid-feedback">
                        {errors.nome.message}
                      </div>
                    )}
                    <div className="form-text">
                      Mínimo 3 caracteres, máximo 100 caracteres
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope-fill me-1"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      placeholder="Digite o email do usuário"
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                    <div className="form-text">
                      O email será usado para login no sistema
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="senha" className="form-label">
                      <i className="bi bi-key-fill me-1"></i>
                      Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                      id="senha"
                      placeholder="Digite a senha do usuário"
                      {...register("senha")}
                      disabled={isSubmitting}
                    />
                    {errors.senha && (
                      <div className="invalid-feedback">
                        {errors.senha.message}
                      </div>
                    )}
                    <div className="form-text">
                      Mínimo 6 caracteres
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="role" className="form-label">
                      <i className="bi bi-shield-fill me-1"></i>
                      Perfil do Usuário
                    </label>
                    <select
                      className={`form-select ${errors.role ? "is-invalid" : ""}`}
                      id="role"
                      {...register("role")}
                      disabled={isSubmitting}
                    >
                      <option value="USER">Usuário Normal (USER)</option>
                      <option value="ADMIN">Administrador (ADMIN)</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">
                        {errors.role.message || "Selecione USER ou ADMIN"}
                      </div>
                    )}
                    <div className="form-text">
                      Selecione o nível de permissão do novo usuário
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate(-1)}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Cadastrando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-1"></i>
                          Cadastrar Usuário
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                {/* Seção de Permissões por Perfil REMOVIDA */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}