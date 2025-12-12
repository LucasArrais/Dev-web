import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "bootstrap-icons/font/bootstrap-icons.css";
import useApi from "../hooks/useApi";

type Aluno = { id: number; nome: string; email: string; telefone: string };
type Turma = { id: number; nome: string };

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const alunosApi = useApi<Aluno>("/alunos");
  const turmasApi = useApi<Turma>("/turmas");

  const {
    data: alunosData,
    isLoading: alunosLoading,
    isError: alunosError,
    error: alunosErrObj,
    refetch: refetchAlunos,
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosApi.recuperarTodos(),
    retry: 1,
  });

  const {
    data: turmasData,
    isLoading: turmasLoading,
    isError: turmasError,
    error: turmasErrObj,
    refetch: refetchTurmas,
  } = useQuery({
    queryKey: ["turmas"],
    queryFn: () => turmasApi.recuperarTodos(),
    retry: 1,
  });

  const totalAlunos = alunosData?.length ?? 0;
  const totalTurmas = turmasData?.length ?? 0;

  return (
    <div
      className="d-flex flex-column align-items-center min-vh-100 pt-5"
      style={{ background: "linear-gradient(135deg, #0e1726 0%, #1b2a41 100%)", color: "#e9eef6" }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0">Bem-vindo!</h1>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                refetchAlunos();
                refetchTurmas();
              }}
              title="Atualizar dados"
            >
              Atualizar 🔄
            </button>
          </div>
        </div>

        <div className="row justify-content-center g-4 w-100 m-0">
          <div className="col-10 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card border-0 h-100 p-0 shadow"
              role="button"
              onClick={() => navigate("/alunos")}
              style={{
                backgroundColor: "#21344a",
                color: "#fff",
                borderRadius: "1rem",
                transition: "transform .15s ease, box-shadow .15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1.25rem rgba(0,0,0,.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1rem rgba(0,0,0,.15)";
              }}
            >
              <div className="card-body d-flex flex-column align-items-center p-4">
                <i className="bi bi-people-fill display-1 mb-3" style={{ color: "#6fb1ff" }} />
                <h5 className="fw-semibold mb-2">Alunos</h5>

                {alunosLoading ? (
                  <div className="placeholder-glow w-100 text-center">
                    <span className="placeholder col-6"></span>
                  </div>
                ) : alunosError ? (
                  <div className="text-warning small text-center">
                    {(alunosErrObj as Error)?.message || "Erro ao carregar"}
                  </div>
                ) : (
                  <span
                    className="badge rounded-pill mt-1"
                    style={{ backgroundColor: "#0d6efd1a", color: "#9fd1ff" }}
                  >
                    {totalAlunos} {totalAlunos === 1 ? "aluno" : "alunos"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="col-10 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card border-0 h-100 p-0 shadow"
              role="button"
              onClick={() => navigate("/turmas")}
              style={{
                backgroundColor: "#243a52",
                color: "#fff",
                borderRadius: "1rem",
                transition: "transform .15s ease, box-shadow .15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1.25rem rgba(0,0,0,.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1rem rgba(0,0,0,.15)";
              }}
            >
              <div className="card-body d-flex flex-column align-items-center p-4">
                <i className="bi bi-easel2-fill display-1 mb-3" style={{ color: "#7ce0a6" }} />
                <h5 className="fw-semibold mb-2">Turmas</h5>

                {turmasLoading ? (
                  <div className="placeholder-glow w-100 text-center">
                    <span className="placeholder col-6"></span>
                  </div>
                ) : turmasError ? (
                  <div className="text-warning small text-center">
                    {(turmasErrObj as Error)?.message || "Erro ao carregar"}
                  </div>
                ) : (
                  <span
                    className="badge rounded-pill mt-1"
                    style={{ backgroundColor: "#1987541a", color: "#a9f0c6" }}
                  >
                    {totalTurmas} {totalTurmas === 1 ? "turma" : "turmas"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="col-10 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card border-0 h-100 p-0 shadow"
              role="button"
              onClick={() => navigate("/pesquisa-turmas")}
              style={{
                backgroundColor: "#29405a",
                color: "#fff",
                borderRadius: "1rem",
                transition: "transform .15s ease, box-shadow .15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1.25rem rgba(0,0,0,.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1rem rgba(0,0,0,.15)";
              }}
            >
              <div className="card-body d-flex flex-column align-items-center p-4">
                <i className="bi bi-search display-1 mb-3" style={{ color: "#7ad6e6" }} />
                <h5 className="fw-semibold mb-2">Pesquisa de Turmas</h5>
                <span className="text-white-50 small text-center">
                  Busque turmas por nome, professor(a) ou período.
                </span>
              </div>
            </div>
          </div>

          <div className="col-10 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card border-0 h-100 p-0 shadow"
              role="button"
              onClick={() => navigate("/grupos-alunos")}
              style={{
                backgroundColor: "#354c66",
                color: "#fff",
                borderRadius: "1rem",
                transition: "transform .15s ease, box-shadow .15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1.25rem rgba(0,0,0,.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 .5rem 1rem rgba(0,0,0,.15)";
              }}
            >
              <div className="card-body d-flex flex-column align-items-center p-4">
                <i className="bi bi-people-gear display-1 mb-3" style={{ color: "#ffd166" }} />
                <h5 className="fw-semibold mb-2">Grupos de Alunos</h5>
                <span className="text-white-50 small text-center">
                  Monte grupos por turma e salve no navegador.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <small className="text-white-50">
            Dica: clique em <span className="text-decoration-underline">Atualizar</span> para
            sincronizar os dados.
          </small>
        </div>
      </div>
    </div>
  );
};

export default HomePage;