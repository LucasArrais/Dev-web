import React from "react";
import { useCreateInscricao } from "../hooks/useInscricoes";
import { useInscricaoStore } from "../stores/inscricaoStore";
import DisciplinaComboBox from "./DisciplinaComboBox";
import TurmaComboBox from "./TurmaComboBox";
import AlunoComboBox from "./AlunoComboBox";
import useTokenStore from "../stores/TokenStore";

export default function InscricaoForm() {
  const { 
    disciplinaSelecionada, 
    turmaSelecionada, 
    alunoSelecionado,
    setAlunoSelecionado 
  } = useInscricaoStore();
  
  const { tokenResponse } = useTokenStore();
  const createInscricaoMutation = useCreateInscricao();

  const isAdmin = tokenResponse.role === "ADMIN";

  const handleInscreverAluno = () => {
    if (!alunoSelecionado || !turmaSelecionada) {
      alert("Selecione um aluno e uma turma primeiro.");
      return;
    }

    if (!isAdmin) {
      alert("Apenas administradores podem inscrever alunos em turmas.");
      return;
    }

    createInscricaoMutation.mutate({
      aluno: { id: alunoSelecionado.id },
      turma: { id: turmaSelecionada.id }
    });

    setAlunoSelecionado(null);
  };

  const canInscrever = alunoSelecionado && turmaSelecionada && isAdmin;

  return (
    <div>
      <DisciplinaComboBox />
      <TurmaComboBox />
      <AlunoComboBox />
      
      {!isAdmin && (
        <div className="alert alert-warning mb-3">
          <i className="bi bi-shield-exclamation me-2"></i>
          <strong>Apenas administradores</strong> podem inscrever alunos em turmas.
        </div>
      )}
      
      <div className="d-grid">
        <button
          className="btn btn-success btn-lg"
          onClick={handleInscreverAluno}
          disabled={!canInscrever || createInscricaoMutation.isPending}
        >
          {createInscricaoMutation.isPending ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Inscrevendo...
            </>
          ) : (
            'Inscrever Aluno'
          )}
        </button>
      </div>

      {disciplinaSelecionada && turmaSelecionada && (
        <div className="mt-3 p-3 bg-dark rounded">
          <small className="text-muted">
            <strong>Disciplina:</strong> {disciplinaSelecionada.nome} | 
            <strong> Turma:</strong> {turmaSelecionada.nome}
            {!isAdmin && (
              <span className="text-warning ms-2">
                <i className="bi bi-lock me-1"></i>
                (Apenas ADMIN pode inscrever)
              </span>
            )}
          </small>
        </div>
      )}
    </div>
  );
}