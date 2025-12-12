import React from "react";
import { useDisciplinas } from "../hooks/useDisciplinas";
import { useInscricaoStore } from "../stores/inscricaoStore";

export default function DisciplinaComboBox() {
  const { disciplinaSelecionada, setDisciplinaSelecionada } = useInscricaoStore();
  const { data: disciplinas, isLoading } = useDisciplinas();

  return (
    <div className="mb-3">
      <label htmlFor="disciplina" className="form-label fw-semibold">
        Disciplina
      </label>
      <select 
        id="disciplina"
        className="form-select"
        value={disciplinaSelecionada?.id || ''} 
        onChange={(e) => {
          const disciplina = disciplinas?.find(d => d.id === Number(e.target.value));
          setDisciplinaSelecionada(disciplina || null);
        }}
        disabled={isLoading}
      >
        <option value="">Selecione uma disciplina</option>
        {disciplinas?.map(disciplina => (
          <option key={disciplina.id} value={disciplina.id}>
            {disciplina.nome}
          </option>
        ))}
      </select>
      {isLoading && <div className="form-text">Carregando disciplinas...</div>}
    </div>
  );
}