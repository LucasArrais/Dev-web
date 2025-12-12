import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const message = (location.state as any)?.message;

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0e1726 0%, #1b2a41 100%)",
        color: "#e9eef6",
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          backgroundColor: "#21344a",
          minWidth: "340px",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <div className="text-center mb-4 mx-2">
          <h4 className="fw-bold mb-3">Acesse sua conta</h4>
          <hr 
            className="mt-2 mb-0" 
            style={{ borderColor: "#6fb1ff" }} 
          />
          <p className="text-muted mt-2 mb-0" style={{ color: '#a0b3d1' }}>
            Digite suas credenciais para continuar
          </p>
        </div>

        {message && (
          <div className="alert alert-info mb-4 mx-2 text-center">
            <i className="bi bi-info-circle me-2"></i>
            {message}
          </div>
        )}

        <div className="mx-3">
          <LoginForm 
            labelClassName="mb-3"
            inputClassName="mb-2" 
          />
        </div>

        <div className="text-center mt-4 pt-3 border-top mx-2" style={{ borderColor: '#2a3d5a' }}>
          <small style={{ color: '#a0b3d1' }}>
            Não tem uma conta?{" "}
            <a 
              href="/cadastro" 
              className="text-decoration-none"
              style={{ color: '#6fb1ff', fontWeight: 500 }}
            >
              Cadastre-se
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;