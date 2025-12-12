import React from "react";
import { useNavigate } from "react-router-dom";
import { useTurmas } from "../hooks/useTurmas";

export default function TurmasPage() {
  const navigate = useNavigate();

  const {
    data: turmas = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTurmas();

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #0f1923, #1c2e40)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0">📚 Lista de Turmas</h1>
          <div className="d-flex align-items-center gap-2">
            <span className="text-white-50">
              Total: {turmas.length} turma{turmas.length !== 1 && "s"}
            </span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => refetch()}
              title="Atualizar lista"
            >
              🔄 Atualizar
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light"></div>
            <p className="mt-3">Carregando turmas...</p>
          </div>
        )}

        {isError && (
          <div className="alert alert-danger text-center">
            {(error as Error)?.message || "Não foi possível carregar as turmas."}
          </div>
        )}

        {!isLoading && !isError && turmas.length === 0 && (
          <div className="text-center text-muted mt-5">
            Nenhuma turma encontrada.
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {turmas.map((turma) => (
            <div className="col" key={turma.id}>
              <div
                className="card h-100 border-0 shadow-sm"
                role="button"
                onClick={() => navigate(`/turma/${turma.id}`)}
                style={{
                  backgroundColor: "#223448",
                  color: "#e7edf5",
                  borderRadius: "1rem",
                  transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 .5rem 1.25rem rgba(0,0,0,.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 .5rem 1rem rgba(0,0,0,.15)";
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2 text-info fw-semibold">
                    {turma.nome}
                  </h5>
                  <p className="text-muted mb-3">
                    <strong>Código:</strong> {turma.codigo}
                  </p>
                  <p className="text-muted mb-3">
                    <strong>Ano/Período:</strong> {turma.ano}/{turma.periodo}
                  </p>

                  <div className="mt-auto d-grid">
                    <button
                      className="btn btn-outline-info rounded-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/turma/${turma.id}`);
                      }}
                    >
                      👩‍🎓 Ver alunos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}