import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlunos, useDeleteAluno } from "../hooks/useAlunos";
import useTokenStore from "../stores/TokenStore";

export default function AlunosPage() {
  const navigate = useNavigate();
  const { tokenResponse } = useTokenStore();
  const { data: alunos = [], isLoading, isError, error, refetch } = useAlunos();
  const deleteAlunoMutation = useDeleteAluno();

  const isAdmin = tokenResponse.role === "ADMIN";

  const handleAlunoClick = (alunoId: number) => {
    navigate(`/aluno/${alunoId}`);
  };

  const handleDeleteAluno = (e: React.MouseEvent, alunoId: number, alunoNome: string) => {
    e.stopPropagation();
    
    if (!isAdmin) {
      alert(`Apenas administradores podem remover alunos.\nVocê tentou remover: ${alunoNome}`);
      return;
    }

    if (window.confirm(`Tem certeza que deseja remover o aluno "${alunoNome}"?`)) {
      deleteAlunoMutation.mutate(alunoId, {
        onSuccess: () => {
          alert(`Aluno "${alunoNome}" removido com sucesso!`);
        },
        onError: (error: any) => {
          if (error.message?.includes("403")) {
            alert("Você não tem permissão para remover alunos. Apenas administradores.");
          } else {
            alert(`Erro ao remover aluno: ${error.message}`);
          }
        },
      });
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #101820, #1e2a38)",
        color: "#f8f9fa",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">🎓 Lista de Alunos</h1>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!isAdmin) {
                  alert("Apenas administradores podem cadastrar novos alunos.");
                  return;
                }
                navigate("/cadastro-alunos");
              }}
            >
              + Novo Aluno
            </button>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => refetch()}
            >
              Atualizar 🔄
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status"></div>
            <p className="mt-3">Carregando alunos...</p>
          </div>
        )}

        {isError && (
          <div className="alert alert-danger text-center">
            Erro ao carregar alunos: {(error as Error)?.message || "Tente novamente mais tarde."}
          </div>
        )}

        {!isLoading && !isError && alunos.length === 0 && (
          <div className="text-center text-muted mt-5">
            <p>Nenhum aluno encontrado.</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                if (!isAdmin) {
                  alert("Apenas administradores podem cadastrar novos alunos.");
                  return;
                }
                navigate("/cadastro-alunos");
              }}
            >
              Cadastrar Primeiro Aluno
            </button>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {!isLoading && alunos.length > 0 &&
            alunos.map((aluno) => (
              <div className="col" key={aluno.id}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    backgroundColor: "#223345",
                    color: "#fff",
                    borderRadius: "1rem",
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  }}
                  onClick={() => handleAlunoClick(aluno.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 .5rem 1.25rem rgba(0,0,0,.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-1">{aluno.nome}</h5>
                    <p className="text-info small mb-2">ID #{aluno.id}</p>
                    <p className="card-text mb-1">
                      <strong>Email:</strong> {aluno.email}
                    </p>
                    <p className="card-text">
                      <strong>Telefone:</strong> {aluno.telefone}
                    </p>

                    <div className="mt-3 pt-2 border-top d-flex justify-content-between">
                      <small className="text-warning">
                        <i className="bi bi-eye-fill me-1"></i>
                        Clique para ver detalhes
                      </small>
                      <div className="d-flex gap-1">
                        {/* Botão de editar REMOVIDO */}
                        <button
                          className={`btn ${isAdmin ? 'btn-outline-danger' : 'btn-outline-secondary'} btn-sm`}
                          onClick={(e) => handleDeleteAluno(e, aluno.id, aluno.nome)}
                          title={isAdmin ? "Remover aluno" : "Apenas administradores podem remover"}
                          disabled={deleteAlunoMutation.isPending}
                        >
                          {deleteAlunoMutation.isPending ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <i className="bi bi-trash"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {!isAdmin && (
                      <div className="mt-2">
                        <small className="text-warning">
                          <i className="bi bi-shield-exclamation me-1"></i>
                          Apenas administradores podem remover
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {!isLoading && alunos.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="text-secondary mb-0">
              Total: {alunos.length} aluno{alunos.length !== 1 && "s"}
            </p>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                if (!isAdmin) {
                  alert("Apenas administradores podem cadastrar novos alunos.");
                  return;
                }
                navigate("/cadastro-alunos");
              }}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Adicionar Mais Alunos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}