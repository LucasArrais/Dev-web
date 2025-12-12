import React from "react";
import { useInscricoesPorTurma } from "../hooks/useInscricoes";
import { useInscricaoStore } from "../stores/inscricaoStore";
import Paginacao from "./Paginacao";

export default function TabelaDeAlunosPorTurma() {
  const { turmaSelecionada, termoPesquisa, paginaAtual, setPaginaAtual } = useInscricaoStore();
  const { data: inscricoes, isLoading } = useInscricoesPorTurma(turmaSelecionada?.id || 0);

  const inscricoesOrdenadas = inscricoes?.sort((a, b) => b.id - a.id) || [];

  const alunosFiltrados = termoPesquisa
    ? inscricoesOrdenadas.filter(inscricao =>
        inscricao.aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        inscricao.aluno.email.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        inscricao.aluno.telefone.includes(termoPesquisa)
      )
    : inscricoesOrdenadas;

  const itensPorPagina = 5;
  const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina);
  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const alunosPagina = alunosFiltrados.slice(indiceInicio, indiceFim);

  if (!turmaSelecionada) {
    return (
      <div className="text-center text-muted py-4">
        Selecione uma turma para visualizar os alunos inscritos.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-light" role="status"></div>
        <div className="mt-2">Carregando alunos...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">
          Alunos Inscritos: {alunosFiltrados.length}
          {termoPesquisa && ` (Filtrados: ${alunosFiltrados.length})`}
        </h6>
      </div>

      {alunosFiltrados.length === 0 ? (
        <div className="text-center text-muted py-4">
          {termoPesquisa ? 'Nenhum aluno encontrado com o filtro aplicado.' : 'Nenhum aluno inscrito nesta turma.'}
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-hover table-striped">
              <thead>
                <tr>
                  <th>ID Aluno</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {alunosPagina.map((inscricao) => (
                  <tr key={inscricao.id}>
                    <td>{inscricao.aluno.id}</td>
                    <td>{inscricao.aluno.nome}</td>
                    <td>{inscricao.aluno.email}</td>
                    <td>{inscricao.aluno.telefone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <Paginacao
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onPaginaChange={setPaginaAtual}
            />
          )}
        </>
      )}
    </div>
  );
}