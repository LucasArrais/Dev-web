// pages/CadastroDeAlunosPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlunoForm from '../components/AlunoForm';
import { useAluno } from '../hooks/useAlunos';
import useTokenStore from '../stores/TokenStore';

export default function CadastroDeAlunosPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const { tokenResponse } = useTokenStore();
  
  const alunoIdParaEditar = searchParams.get('editar');
  const { data: alunoParaEditar, isLoading } = useAluno(Number(alunoIdParaEditar));

  const isAdmin = tokenResponse.role === "ADMIN";

  useEffect(() => {
    if (!isAdmin && !alunoIdParaEditar) {
      navigate('/alunos');
      return;
    }

    if (alunoIdParaEditar) {
      setShowForm(true);
    }
  }, [alunoIdParaEditar, isAdmin, navigate]);

  if (!isAdmin && !alunoIdParaEditar) {
    return null;
  }

  const handleSuccess = () => {
    setShowForm(false);
    navigate('/alunos');
    alert(alunoIdParaEditar ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
  };

  const handleCancel = () => {
    setShowForm(false);
    if (alunoIdParaEditar) {
      navigate('/cadastro-alunos');
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
          <h1 className="fw-bold">
            {alunoIdParaEditar ? '✏️ Editar Aluno' : '👨‍🎓 Cadastro de Alunos'}
          </h1>
          <div className="d-flex gap-2">
            {!showForm && !alunoIdParaEditar && isAdmin && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                + Novo Aluno
              </button>
            )}
            <button
              className="btn btn-outline-light"
              onClick={() => navigate('/alunos')}
            >
              Ver Lista de Alunos
            </button>
          </div>
        </div>

        {!isAdmin && alunoIdParaEditar && (
          <div className="alert alert-warning mb-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Você está editando um aluno existente. Apenas administradores podem criar novos alunos.
          </div>
        )}

        {isLoading && alunoIdParaEditar ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status"></div>
            <p className="mt-3">Carregando aluno...</p>
          </div>
        ) : showForm || alunoIdParaEditar ? (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <AlunoForm 
                aluno={alunoParaEditar}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <p>Clique em "Novo Aluno" para cadastrar um novo aluno.</p>
            {!isAdmin && (
              <p className="text-warning">
                <i className="bi bi-shield-lock me-1"></i>
                Apenas administradores podem cadastrar novos alunos.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}