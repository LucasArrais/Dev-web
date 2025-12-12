import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useTokenStore from "../stores/TokenStore";

const PrivateRoutes: React.FC = () => {
  const { tokenResponse } = useTokenStore();
  const location = useLocation();

  if (!tokenResponse.token) {
    return (
      <Navigate
        to="/login"
        state={{ 
          message: "Necessário estar logado para acessar este recurso",
          from: location.pathname 
        }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PrivateRoutes;