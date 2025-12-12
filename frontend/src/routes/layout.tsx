import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />   
      <main className="flex-fill">
        <Outlet />
      </main>
      <footer className="bg-light text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} Sistema Escolar - Todos os direitos reservados
      </footer>
    </div>
  );
};

export default Layout;