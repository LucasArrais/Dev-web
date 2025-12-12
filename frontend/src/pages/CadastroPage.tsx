import React from "react";
import { useNavigate } from "react-router-dom";
import CadastroForm from "../components/CadastroForm";

const CadastroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ minWidth: 400, position: "relative" }}>
        <button
          className="btn btn-outline-secondary btn-sm"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => navigate("/login")}
        >
          Voltar
        </button>

        <h4 className="mb-3 text-center">Cadastro de Usuário</h4>
        <CadastroForm />

        <div className="text-center mt-3">
          <small>
            Já tem uma conta?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/login")}
            >
              Faça login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
