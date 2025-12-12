import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useApi from "../hooks/useApi";

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface Professor {
  id: number;
  nome: string;
}

interface Disciplina {
  id: number;
  nome: string;
}

interface Turma {
  id: number;
  ano: number;
  periodo: number;
  professor: Professor;
  disciplina: Disciplina;
}

interface Inscricao {
  id: number;
  aluno: Aluno;
}

export default function TurmaDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const turmaApi = useApi<Turma>("/turmas");
  const inscricoesApi = useApi<Inscricao>("/inscricoes");

  const {
    data: turma,
    isLoading: loadingTurma,
    isError: errorTurma,
    error: turmaError,
  } = useQuery({
    queryKey: ["turma", id],
    queryFn: () => turmaApi.recuperarPorId(id!),
    enabled: !!id,
  });

  const {
    data: inscricoes = [],
    isLoading: loadingAlunos,
    isError: errorAlunos,
    error: alunosError,
  } = useQuery({
    queryKey: ["inscricoes", id],
    queryFn: () => inscricoesApi.recuperarComSubRota("turma", id!),
    enabled: !!id,
  });

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #101820, #1b2e41)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        {loadingTurma && (
          <div className="text-center mt-5">
            <div className="spinner-border text-light"></div>
            <p className="mt-3">Carregando turma...</p>
          </div>
        )}

        {errorTurma && (
          <div className="alert alert-danger text-center mt-4">
            {(turmaError as Error)?.message ||
              "Não foi possível carregar a turma."}
          </div>
        )}

        {turma && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fw-bold text-white mb-0">
                {turma.disciplina.nome}
              </h1>
              <button
                className="btn btn-outline-light px-4 py-2 rounded-pill"
                onClick={() => navigate(-1)}
              >
                ← Voltar
              </button>
            </div>

            <div
              className="card mb-4 border-0 shadow-sm"
              style={{
                backgroundColor: "#223447",
                color: "#e6edf5",
                borderRadius: "1rem",
              }}
            >
              <div className="card-body">
                <p className="mb-2">
                  <strong>Ano/Período:</strong> {turma.ano}/{turma.periodo}
                </p>
                <p className="mb-0">
                  <strong>Professor:</strong> {turma.professor.nome}
                </p>
              </div>
            </div>

            <h3 className="fw-semibold mb-3 text-white">
              Alunos inscritos
            </h3>

            {loadingAlunos && (
              <div className="text-center mt-4">
                <div className="spinner-border text-light"></div>
                <p className="mt-3">Carregando alunos...</p>
              </div>
            )}

            {errorAlunos && (
              <div className="alert alert-danger text-center mt-3">
                {(alunosError as Error)?.message ||
                  "Erro ao carregar alunos da turma."}
              </div>
            )}

            {!loadingAlunos && !errorAlunos && (
              <>
                {inscricoes.length > 0 ? (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {inscricoes.map((inscricao) => (
                      <div className="col" key={inscricao.id}>
                        <div
                          className="card h-100 border-0 shadow-sm"
                          style={{
                            backgroundColor: "#24394d",
                            color: "#fff",
                            borderRadius: "1rem",
                            transition: "transform 0.2s ease-in-out",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform =
                              "translateY(-4px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform = "";
                          }}
                        >
                          <div className="card-body">
                            <h5 className="card-title mb-2">
                              {inscricao.aluno.nome}
                            </h5>
                            <p className="text-info small mb-2">
                              ID #{inscricao.aluno.id}
                            </p>
                            <p className="mb-1">
                              <strong>Email:</strong> {inscricao.aluno.email}
                            </p>
                            <p className="mb-0">
                              <strong>Telefone:</strong>{" "}
                              {inscricao.aluno.telefone}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mt-3">
                    Nenhum aluno inscrito nesta turma.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}