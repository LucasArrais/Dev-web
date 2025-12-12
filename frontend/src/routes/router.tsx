import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import HomePage from "../pages/HomePage";
import AlunosPage from "../pages/AlunosPage";
import TurmasPage from "../pages/TurmasPage";
import TurmaDetalhesPage from "../pages/TurmaDetalhesPage";
import PesquisaTurmasPage from "../pages/PesquisaTurmasPage";
import GruposAlunosPage from "../pages/GrupoAlunosPage";
import CadastroDeAlunosPage from "../pages/CadastroDeAlunosPage";
import AlunoPage from "../pages/AlunoPage";
import InscricaoTurmasPage from "../pages/InscricaoTurmasPage";
import LoginPage from "../pages/LoginPage";
import CadastroPage from "../pages/CadastroPage";
import CadastroUsuarioPage from "../pages/CadastroUsuarioPage";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/cadastro", element: <CadastroPage /> },
      
      {
        path: "/",
        element: <PrivateRoutes />,
        children: [
          { path: "alunos", element: <AlunosPage /> },
          { path: "turmas", element: <TurmasPage /> },
          { path: "turma/:id", element: <TurmaDetalhesPage /> },
          { path: "pesquisa-turmas", element: <PesquisaTurmasPage /> },
          { path: "grupos-alunos", element: <GruposAlunosPage /> },
          { path: "cadastro-alunos", element: <CadastroDeAlunosPage /> },
          { path: "aluno/:id", element: <AlunoPage /> },
          { path: "inscricao-turmas", element: <InscricaoTurmasPage /> },
          { path: "cadastro-usuario", element: <CadastroUsuarioPage /> },
        ],
      },
    ],
  },
]);

export default router;