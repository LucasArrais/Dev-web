import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAluno, useUpdateAluno } from '../hooks/useAlunos';
import { alunoSchema, AlunoFormData } from '../schemas/alunoSchema';

interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface AlunoFormProps {
  aluno?: Aluno;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AlunoForm({ aluno, onSuccess, onCancel }: AlunoFormProps) {
  const createAlunoMutation = useCreateAluno();
  const updateAlunoMutation = useUpdateAluno();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: aluno?.nome || '',
      email: aluno?.email || '',
      telefone: aluno?.telefone || '',
    }
  });

  const onSubmit = (data: AlunoFormData) => {
    if (aluno) {
      updateAlunoMutation.mutate({ id: aluno.id, data }, {
        onSuccess: () => onSuccess?.()
      });
    } else {
      createAlunoMutation.mutate(data, {
        onSuccess: () => onSuccess?.()
      });
    }
  };

  const isLoading = isSubmitting || createAlunoMutation.isPending || updateAlunoMutation.isPending;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">
          {aluno ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
        </h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
              id="nome"
              {...register('nome')}
              placeholder="Digite o nome do aluno"
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              {...register('email')}
              placeholder="Digite o email do aluno"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input
              type="text"
              className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
              id="telefone"
              {...register('telefone')}
              placeholder="Digite o telefone do aluno"
            />
            {errors.telefone && <div className="invalid-feedback">{errors.telefone.message}</div>}
          </div>

          <div className="d-flex gap-2 justify-content-end">
            {onCancel && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  {aluno ? 'Atualizando...' : 'Cadastrando...'}
                </>
              ) : (
                aluno ? 'Atualizar' : 'Cadastrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}