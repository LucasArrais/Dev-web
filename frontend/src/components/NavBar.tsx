import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import useTokenStore from "../stores/TokenStore";

const NavBar: React.FC = () => {
  const { tokenResponse, setTokenResponse } = useTokenStore();
  const navigate = useNavigate();
  
  const isAdmin = tokenResponse.role === "ADMIN";
  const isAuthenticated = !!tokenResponse.token;

  const handleLogout = () => {
    setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Sistema Escolar
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                <i className="bi bi-house-fill me-1"></i> Home
              </NavLink>
            </li>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/alunos"
                  >
                    <i className="bi bi-person-fill me-1"></i> Alunos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/turmas"
                  >
                    <i className="bi bi-journal-bookmark-fill me-1"></i> Turmas
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/inscricao-turmas"
                  >
                    <i className="bi bi-pencil-square me-1"></i> Inscrever em Turmas
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/pesquisa-turmas"
                  >
                    <i className="bi bi-search me-1"></i> Pesquisa de Turmas
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/grupos-alunos"
                  >
                    <i className="bi bi-people-fill me-1"></i> Grupos de Alunos
                  </NavLink>
                </li>

                {isAdmin && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/cadastro-usuario"
                    >
                      <i className="bi bi-person-plus-fill me-1"></i> Cadastrar Usuário
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {tokenResponse.nome}
                    <span className={`badge ms-2 ${isAdmin ? 'bg-warning' : 'bg-info'}`}>
                      {tokenResponse.role}
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <div className="dropdown-item-text">
                        <small className="text-muted">
                          Logado como: <strong>{tokenResponse.nome}</strong>
                          <br />
                          <small>Perfil: {tokenResponse.role}</small>
                        </small>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/cadastro"
                  >
                    <i className="bi bi-person-plus me-1"></i> Cadastrar
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;