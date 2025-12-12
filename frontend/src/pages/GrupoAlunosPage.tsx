import React, { useEffect, useState } from "react";
import { useTurmas } from "../hooks/useTurmas";
import { useAlunosPorTurma } from "../hooks/useGrupoAlunos";

interface Aluno {
  id: number;
  nome: string;
  email: string;
}

interface Turma {
  id: number;
  codigo: string;
  nome: string;
  ano: number;
  periodo: number;
  disciplina?: {
    id: number;
    nome: string;
    cargaHoraria: number;
  };
  professor?: {
    id: number;
    nome: string;
    email: string;
  };
}

export default function GruposAlunosPage() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [grupo, setGrupo] = useState<Aluno[]>([]);

  const { data: turmas = [], isLoading: loadingTurmas } = useTurmas();
  const { data: alunos = [], isLoading: loadingAlunos } = useAlunosPorTurma(turmaSelecionada?.id || 0);

  useEffect(() => {
    if (turmaSelecionada) {
      const saved = localStorage.getItem(turmaSelecionada.codigo);
      setGrupo(saved ? JSON.parse(saved) : []);
    }
  }, [turmaSelecionada]);

  const toggleAlunoNoGrupo = (aluno: Aluno) => {
    if (!turmaSelecionada) return;

    let novoGrupo;
    const existe = grupo.some((a) => a.id === aluno.id);

    if (existe) {
      novoGrupo = grupo.filter((a) => a.id !== aluno.id);
    } else {
      novoGrupo = [...grupo, aluno];
    }

    setGrupo(novoGrupo);
    localStorage.setItem(turmaSelecionada.codigo, JSON.stringify(novoGrupo));
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #101820, #1b2e41)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        <h1 className="fw-bold mb-4 text-center">
          👩‍🏫 Pesquisa de Turmas e Grupos
        </h1>

        <div className="d-flex justify-content-center mb-4">
          <select
            className="form-select w-50 shadow-sm"
            onChange={(e) => {
              const id = Number(e.target.value);
              const turma = turmas.find((t) => t.id === id) || null;
              setTurmaSelecionada(turma);
            }}
            value={turmaSelecionada?.id || ""}
          >
            <option value="">Selecione uma turma</option>
            {turmas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.codigo} - {t.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Informações da Turma Selecionada */}
        {turmaSelecionada && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div 
                className="card border-0 shadow-sm"
                style={{
                  backgroundColor: "#223447",
                  color: "#fff",
                  borderRadius: "1rem",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <h6 className="text-info mb-1">
                          <i className="bi bi-book me-1"></i>
                          Disciplina
                        </h6>
                        <p className="mb-0">
                          {turmaSelecionada.disciplina?.nome || "Não informada"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-3">
                      <div className="mb-3">
                        <h6 className="text-info mb-1">
                          <i className="bi bi-calendar me-1"></i>
                          Ano/Período
                        </h6>
                        <p className="mb-0">
                          {turmaSelecionada.ano}/{turmaSelecionada.periodo}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-3">
                      <div className="mb-3">
                        <h6 className="text-info mb-1">
                          <i className="bi bi-person-badge me-1"></i>
                          Professor
                        </h6>
                        <p className="mb-0">
                          {turmaSelecionada.professor?.nome || "Não informado"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-3">
                      <div className="mb-3">
                        <h6 className="text-warning mb-1">
                          <i className="bi bi-people me-1"></i>
                          Alunos no Grupo
                        </h6>
                        <p className="mb-0">
                          <span className="badge bg-warning text-dark fs-6">
                            {grupo.length} aluno{grupo.length !== 1 ? 's' : ''}
                          </span>
                          <small className="d-block text-white-50 mt-1">
                            Total na turma: {alunos.length}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-top border-secondary">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-primary mb-1">
                          <i className="bi bi-info-circle me-1"></i>
                          Informações do Grupo
                        </h6>
                        <p className="text-white-50 small mb-0">
                          O grupo é salvo automaticamente no seu navegador.
                          Para limpar o grupo, remova os alunos manualmente.
                        </p>
                      </div>
                      <div>
                        <span className="badge bg-light text-dark">
                          Turma: {turmaSelecionada.codigo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <table className="table table-dark table-striped align-middle text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ação</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!turmaSelecionada && (
              <tr>
                <td colSpan={5} className="text-muted">
                  Selecione uma turma para visualizar os alunos.
                </td>
              </tr>
            )}

            {turmaSelecionada && loadingAlunos && (
              <tr>
                <td colSpan={5} className="text-center">
                  <div className="spinner-border spinner-border-sm text-light"></div>
                  <span className="ms-2">Carregando alunos...</span>
                </td>
              </tr>
            )}

            {turmaSelecionada && !loadingAlunos && alunos.length === 0 && (
              <tr>
                <td colSpan={5} className="text-muted">
                  Nenhum aluno encontrado para esta turma.
                </td>
              </tr>
            )}

            {turmaSelecionada &&
              alunos.map((aluno) => {
                const noGrupo = grupo.some((a) => a.id === aluno.id);
                return (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>
                      <button
                        className={`btn ${
                          noGrupo ? "btn-danger" : "btn-success"
                        } btn-sm`}
                        onClick={() => toggleAlunoNoGrupo(aluno)}
                      >
                        {noGrupo ? "Remover" : "Incluir"}
                      </button>
                    </td>
                    <td>
                      {noGrupo ? (
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-check-circle me-1"></i>
                          No grupo
                        </span>
                      ) : (
                        <span className="badge bg-secondary">
                          <i className="bi bi-dash-circle me-1"></i>
                          Não incluído
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Resumo do Grupo */}
        {turmaSelecionada && grupo.length > 0 && (
          <div className="row mt-4">
            <div className="col-md-12">
              <div 
                className="card border-0 shadow-sm"
                style={{
                  backgroundColor: "#1a3a2a",
                  color: "#fff",
                  borderRadius: "1rem",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-success mb-3">
                    <i className="bi bi-check2-all me-2"></i>
                    Resumo do Grupo Selecionado
                  </h5>
                  <div className="row">
                    <div className="col-md-8">
                      <ul className="list-group list-group-flush">
                        {grupo.map((aluno) => (
                          <li 
                            key={aluno.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{
                              backgroundColor: "transparent",
                              color: "#fff",
                              borderColor: "#2a4a3a"
                            }}
                          >
                            <div>
                              <span className="text-info fw-bold">{aluno.nome}</span>
                              <small className="text-white-50 d-block">{aluno.email}</small>
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => toggleAlunoNoGrupo(aluno)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                      <div className="text-center">
                        <div className="display-6 text-warning fw-bold">{grupo.length}</div>
                        <div className="text-white-50">alunos no grupo</div>
                        <button
                          className="btn btn-outline-warning mt-3 btn-sm"
                          onClick={() => {
                            if (window.confirm("Deseja limpar todo o grupo?")) {
                              setGrupo([]);
                              localStorage.removeItem(turmaSelecionada.codigo);
                            }
                          }}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Limpar Grupo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}