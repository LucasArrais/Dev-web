import React, { useState } from "react";
import useEfetuarCadastro, { UsuarioCadastro } from "../hooks/useEfetuarCadastro";

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const mutation = useEfetuarCadastro();

  const isLoading = (mutation as any).isPending !== undefined 
    ? (mutation as any).isPending 
    : (mutation as any).isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoUsuario: UsuarioCadastro = {
      nome,
      email,
      senha,
    };

    mutation.mutate(novoUsuario, {
      onSuccess: () => {
        alert("Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
      },
      onError: (err: any) => {
        alert("Erro ao cadastrar: " + (err.message || JSON.stringify(err)));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome</label>
        <input
          type="text"
          id="nome"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <input
          type="password"
          id="senha"
          className="form-control"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isLoading || mutation.isPending}
      >
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </button>

      {mutation.isError && (
        <div className="mt-3 text-danger">
          {JSON.stringify(mutation.error)}
        </div>
      )}
    </form>
  );
};

export default CadastroForm;