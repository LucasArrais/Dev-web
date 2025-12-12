import React from "react";
import { useAlunosNaoInscritos } from "../hooks/useAlunos";
import { useInscricaoStore } from "../stores/inscricaoStore";

export default function AlunoComboBox() {
  const { turmaSelecionada, alunoSelecionado, setAlunoSelecionado } = useInscricaoStore();
  const { data: alunos, isLoading } = useAlunosNaoInscritos(turmaSelecionada?.id || 0);

  return (
    <div className="mb-3">
      <label htmlFor="aluno" className="form-label fw-semibold">
        Aluno para Inscrição
      </label>
      <select 
        id="aluno"
        className="form-select"
        value={alunoSelecionado?.id || ''} 
        onChange={(e) => {
          const aluno = alunos?.find(a => a.id === Number(e.target.value));
          setAlunoSelecionado(aluno || null);
        }}
        disabled={!turmaSelecionada || isLoading}
      >
        <option value="">Selecione um aluno</option>
        {alunos?.map(aluno => (
          <option key={aluno.id} value={aluno.id}>
            {aluno.nome} - {aluno.email}
          </option>
        ))}
      </select>
      {isLoading && <div className="form-text">Carregando alunos disponíveis...</div>}
      {!turmaSelecionada && (
        <div className="form-text">Selecione uma turma primeiro</div>
      )}
      {turmaSelecionada && alunos?.length === 0 && (
        <div className="form-text text-warning">Todos os alunos já estão inscritos nesta turma</div>
      )}
    </div>
  );
}