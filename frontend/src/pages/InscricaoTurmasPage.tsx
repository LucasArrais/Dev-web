import React from "react";
import InscricaoForm from "../components/InscricaoForm";
import Pesquisa from "../components/Pesquisa";
import TabelaDeAlunosPorTurma from "../components/TabelaDeAlunosPorTurma";
import useTokenStore from "../stores/TokenStore";

export default function InscricaoTurmasPage() {
  const { tokenResponse } = useTokenStore();
  const isAdmin = tokenResponse.role === "ADMIN";

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #101820, #1e2a38)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        <h1 className="fw-bold text-center mb-5">🎓 Inscrição de Aluno em Turma</h1>
        
        {!isAdmin && (
          <div className="alert alert-warning mb-4 text-center">
            <i className="bi bi-shield-lock me-2"></i>
            <strong>Aviso:</strong> Esta funcionalidade está disponível apenas para administradores.
            Você pode visualizar as inscrições existentes abaixo.
          </div>
        )}
        
        <div className="row mb-5">
          <div className="col-lg-6">
            <div 
              className="card border-0 shadow-sm h-100"
              style={{
                backgroundColor: "#223345",
                color: "#fff",
                borderRadius: "1rem",
              }}
            >
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Inscrever Aluno
                  {!isAdmin && (
                    <span className="badge bg-warning ms-2">ADMIN ONLY</span>
                  )}
                </h5>
                <InscricaoForm />
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div 
              className="card border-0 shadow-sm h-100"
              style={{
                backgroundColor: "#223345",
                color: "#fff",
                borderRadius: "1rem",
              }}
            >
              <div className="card-body">
                <h5 className="card-title mb-4">Pesquisar Alunos</h5>
                <Pesquisa />
              </div>
            </div>
          </div>
        </div>

        <div 
          className="card border-0 shadow-sm"
          style={{
            backgroundColor: "#223345",
            color: "#fff",
            borderRadius: "1rem",
          }}
        >
          <div className="card-body">
            <h5 className="card-title mb-4">Alunos Inscritos na Turma</h5>
            <TabelaDeAlunosPorTurma />
          </div>
        </div>
      </div>
    </div>
  );
}