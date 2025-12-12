import React from "react";
import { useInscricaoStore } from "../stores/inscricaoStore";

export default function Pesquisa() {
  const { termoPesquisa, setTermoPesquisa } = useInscricaoStore();

  return (
    <div>
      <label htmlFor="pesquisa" className="form-label fw-semibold">
        Pesquisar Aluno
      </label>
      <input
        type="text"
        id="pesquisa"
        className="form-control"
        placeholder="Digite o nome do aluno..."
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />
      <div className="form-text">
        Pesquise por nome, email ou telefone
      </div>
    </div>
  );
}