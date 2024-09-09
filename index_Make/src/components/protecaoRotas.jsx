import React from "react";
import { authProtecao_Rotas } from "../context/authProtecao_rotas";
import { Navigate } from "react-router-dom";

const ProtecaoRotas = ({ pagina, etapa }) => {
  const etapaAtual = authProtecao_Rotas((state) => state.etapa);

  return etapaAtual >= etapa ? (
    pagina
  ) : (
    <Navigate to="/cadastro/email" replace />
  );
};


export default ProtecaoRotas;
