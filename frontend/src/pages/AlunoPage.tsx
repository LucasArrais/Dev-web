import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAluno, useDeleteAluno } from '../hooks/useAlunos';
import useTokenStore from '../stores/TokenStore';

export default function AlunoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tokenResponse } = useTokenStore();
  const deleteAlunoMutation = useDeleteAluno();

  const { data: aluno, isLoading, isError } = useAluno(Number(id));
  const isAdmin = tokenResponse.role === "ADMIN";

  const handleDeleteAluno = () => {
    if (!aluno) return;
    
    if (!isAdmin) {
      alert(`Apenas administradores podem remover alunos.\nVocê tentou remover: ${aluno.nome}`);
      return;
    }

    if (window.confirm(`Tem certeza que deseja remover o aluno "${aluno.nome}"?`)) {
      deleteAlunoMutation.mutate(aluno.id, {
        onSuccess: () => {
          alert(`Aluno "${aluno.nome}" removido com sucesso!`);
          navigate('/alunos');
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

  if (isLoading) {
    return (
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg, #101820, #1e2a38)",
          color: "#f8f9fa",
        }}
      >
        <div className="spinner-border text-light"></div>
        <span className="ms-3">Carregando aluno...</span>
      </div>
    );
  }

  if (isError || !aluno) {
    return (
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg, #101820, #1e2a38)",
          color: "#f8f9fa",
        }}
      >
        <div className="alert alert-danger">Aluno não encontrado</div>
      </div>
    );
  }

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
          <h1 className="fw-bold text-white mb-0">👨‍🎓 Detalhes do Aluno</h1>
          <button
            className="btn btn-outline-light px-4 py-2 rounded-pill"
            onClick={() => navigate(-1)}
          >
            ← Voltar
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: "#223345",
                color: "#fff",
                borderRadius: "1rem",
              }}
            >
              <div className="card-body p-4">
                <h5 className="card-title text-primary mb-4">{aluno.nome}</h5>
                
                <div className="mb-3">
                  <strong>ID:</strong> {aluno.id}
                </div>
                
                <div className="mb-3">
                  <strong>Email:</strong> {aluno.email}
                </div>
                
                <div className="mb-3">
                  <strong>Telefone:</strong> {aluno.telefone}
                </div>

                <div className="mt-4 pt-3 border-top d-flex gap-2">
                  {/* Botão de editar REMOVIDO */}
                  
                  <button
                    className={`btn ${isAdmin ? 'btn-outline-danger' : 'btn-outline-secondary'}`}
                    onClick={handleDeleteAluno}
                    disabled={deleteAlunoMutation.isPending}
                  >
                    {deleteAlunoMutation.isPending ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Removendo...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-trash me-1"></i>
                        Remover Aluno
                      </>
                    )}
                  </button>
                  
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/alunos')}
                  >
                    Voltar para Lista
                  </button>
                </div>
                
                {!isAdmin && (
                  <div className="mt-3 alert alert-warning">
                    <i className="bi bi-shield-exclamation me-2"></i>
                    <strong>Atenção:</strong> Apenas administradores podem remover alunos. 
                    Se você clicar em "Remover Aluno", será exibida uma mensagem de restrição.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}