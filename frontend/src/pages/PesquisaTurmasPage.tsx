import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useApi from "../hooks/useApi";

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface Turma {
  id: number;
  nome: string;
  ano: number;
  periodo: number;
  professor?: { id: number; nome: string; email: string };
  disciplina?: { id: number; nome: string; cargaHoraria: number };
}

interface Inscricao {
  aluno: Aluno;
  turma: Turma;
}

export default function PesquisaTurmasPage() {
  const [termoBusca, setTermoBusca] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const turmaApi = useApi<Turma>("/turmas");
  const inscricoesApi = useApi<Inscricao>("/inscricoes");

  const {
    data: turmas = [],
    isLoading: loadingTurmas,
    isError: errorTurmas,
    error: turmasError,
  } = useQuery({
    queryKey: ["turmas"],
    queryFn: () => turmaApi.recuperarTodos(),
  });

  const {
    data: inscricoes = [],
    isLoading: loadingAlunos,
    isError: errorAlunos,
    error: alunosError,
  } = useQuery({
    queryKey: ["inscricoes", turmaSelecionada?.id],
    queryFn: () => inscricoesApi.recuperarComSubRota("turma", turmaSelecionada!.id),
    enabled: !!turmaSelecionada,
  });

  const alunos = inscricoes.map((i) => i.aluno);

  const turmasFiltradas = termoBusca
    ? turmas.filter((t) =>
        t.disciplina?.nome
          ?.toUpperCase()
          .includes(termoBusca.toUpperCase())
      )
    : turmas;

  const indiceUltimo = paginaAtual * itensPorPagina;
  const indicePrimeiro = indiceUltimo - itensPorPagina;
  const alunosPagina = alunos.slice(indicePrimeiro, indiceUltimo);
  const totalPaginas = Math.ceil(alunos.length / itensPorPagina);

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #101820, #1b2e41)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        <h1 className="fw-bold mb-4 text-center">🔍 Pesquisa de Turmas</h1>

        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            className="form-control w-50 shadow-sm"
            placeholder="Digite o nome da turma..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{
              borderRadius: "2rem",
              padding: "0.75rem 1.25rem",
              border: "none",
            }}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            {loadingTurmas ? (
              <div className="text-center mt-5">Carregando turmas...</div>
            ) : errorTurmas ? (
              <div className="alert alert-danger text-center">
                {(turmasError as Error)?.message || "Erro ao carregar turmas."}
              </div>
            ) : (
              <ul
                className="list-group shadow-sm"
                style={{ borderRadius: "1rem", overflow: "hidden" }}
              >
                {turmasFiltradas.map((turma) => (
                  <li
                    key={turma.id}
                    className={`list-group-item ${
                      turmaSelecionada?.id === turma.id
                        ? "active"
                        : "list-group-item-action"
                    }`}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        turmaSelecionada?.id === turma.id
                          ? "#0d6efd"
                          : "#24394d",
                      color:
                        turmaSelecionada?.id === turma.id
                          ? "#fff"
                          : "#cfd8e3",
                      border: "none",
                    }}
                    onClick={() => {
                      setTurmaSelecionada(turma);
                      setPaginaAtual(1);
                    }}
                  >
                    <strong>{turma.nome}</strong>{" "}
                    <small className="text-secondary">
                      ({turma.ano}/{turma.periodo})
                    </small>
                  </li>
                ))}
                {turmasFiltradas.length === 0 && termoBusca && (
                  <li className="list-group-item text-muted text-center">
                    Nenhuma turma encontrada.
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="col-md-8 mb-4">
            {turmaSelecionada && (
              <>
                <div
                  className="p-3 mb-3 rounded shadow-sm"
                  style={{ backgroundColor: "#223447" }}
                >
                  <h5 className="fw-bold mb-2">
                    Turma: {turmaSelecionada.nome} (
                    {turmaSelecionada.ano}/{turmaSelecionada.periodo})
                  </h5>
                  <p className="mb-1">
                    <strong>Disciplina:</strong>{" "}
                    {turmaSelecionada.disciplina?.nome || "-"}
                  </p>
                  <p className="mb-0">
                    <strong>Professor:</strong>{" "}
                    {turmaSelecionada.professor?.nome || "-"}
                  </p>
                </div>

                {loadingAlunos ? (
                  <div className="text-center">Carregando alunos...</div>
                ) : errorAlunos ? (
                  <div className="alert alert-danger text-center">
                    {(alunosError as Error)?.message ||
                      "Erro ao carregar alunos."}
                  </div>
                ) : alunosPagina.length === 0 ? (
                  <p className="text-muted">Nenhum aluno nesta turma.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle rounded overflow-hidden">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome</th>
                          <th>Email</th>
                          <th>Telefone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alunosPagina.map((aluno) => (
                          <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.telefone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {totalPaginas > 1 && (
                  <nav className="d-flex justify-content-center mt-3">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          paginaAtual === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setPaginaAtual((p) => Math.max(1, p - 1))
                          }
                        >
                          ←
                        </button>
                      </li>

                      {Array.from({ length: totalPaginas }, (_, i) => (
                        <li
                          key={i + 1}
                          className={`page-item ${
                            paginaAtual === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setPaginaAtual(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          paginaAtual === totalPaginas ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setPaginaAtual((p) => Math.min(totalPaginas, p + 1))
                          }
                        >
                          →
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}