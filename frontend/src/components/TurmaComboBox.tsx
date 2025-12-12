import React from "react";
import { useTurmasPorDisciplina } from "../hooks/useTurmas";
import { useInscricaoStore } from "../stores/inscricaoStore";

export default function TurmaComboBox() {
  const { disciplinaSelecionada, turmaSelecionada, setTurmaSelecionada } = useInscricaoStore();
  const { data: turmas, isLoading, isError, error } = useTurmasPorDisciplina(disciplinaSelecionada?.id || 0);

  return (
    <div className="mb-3">
      <label htmlFor="turma" className="form-label fw-semibold">
        Turma
      </label>
      <select 
        id="turma"
        className="form-select"
        value={turmaSelecionada?.id || ''} 
        onChange={(e) => {
          const turma = turmas?.find(t => t.id === Number(e.target.value));
          setTurmaSelecionada(turma || null);
        }}
        disabled={!disciplinaSelecionada || isLoading}
      >
        <option value="">Selecione uma turma</option>
        {turmas?.map(turma => (
          <option key={turma.id} value={turma.id}>
            {turma.codigo} - {turma.nome} ({turma.ano}/{turma.periodo})
          </option>
        ))}
      </select>
      
      {isLoading && <div className="form-text">Carregando turmas...</div>}
      {isError && (
        <div className="form-text text-danger">
          Erro ao carregar turmas: {(error as Error)?.message || "Endpoint não encontrado"}
        </div>
      )}
      {!disciplinaSelecionada && (
        <div className="form-text">Selecione uma disciplina primeiro</div>
      )}
      {disciplinaSelecionada && turmas?.length === 0 && !isLoading && (
        <div className="form-text text-warning">Nenhuma turma encontrada para esta disciplina</div>
      )}
    </div>
  );
}