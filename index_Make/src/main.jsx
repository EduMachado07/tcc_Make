import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

// ------- paginas da aplicacao --------
import App from "./App.jsx";
import Login from "./pages/login.jsx";
import Cadastro from "./pages/cadastro/cadastro.jsx";
import Email from "./pages/cadastro/email.jsx";
// import Confirma_Email from "./pages/cadastro/confirmaEmail.jsx";
import Tipo_Usuario from "./pages/cadastro/tipoUsuario.jsx";
import Cliente from "./pages/cadastro/cliente.jsx";
import CadastroEmpresa from "./pages/cadastro/empresa";
import Endereco from "./pages/cadastro/endereco";
import Senha from "./pages/cadastro/Senha";
import Informacoes from "./pages/cadastro/informacoes";
import Erro from "./pages/erro";
import Landing from "./pages/landing";
import TermosUso from "./pages/termosUso";
import Empresa from "./pages/empresa";
import ListaEmpresas from "./pages/listaEmpresas";
import PerfilEmpresa from "./pages/perfilEmpresa";
import Agenda from "./pages/agenda";
import PerfilClient from "./pages/perfilClient";
import Sobre from "./pages/sobre";

// --------- PROTECAO PARA CADASTRO ------------
// COMPONENTE REDIRECIONA PARA PAGINA INICIAL
import { authProtecao_Rotas } from "./context/authProtecao_rotas.ts";

const ProtecaoRotas = ({ pagina, etapa }) => {
  const etapaAtual = authProtecao_Rotas((state) => state.etapa);

  // if (etapaAtual > 1 && etapa < 2) {
  //   return <Navigate to="/cadastro/validacao" replace />;
  // } else if (etapaAtual > 2 && etapa === 2) {
  //   return <Navigate to="/cadastro/tipo-usuario" replace />;
  // }

  if (etapaAtual >= etapa) {
    return pagina;
  }

  return <Navigate to="/cadastro/email" replace />;
};

// --------- COMPONENTE PARA ROTAS DA APLICACAO ------------
const Rotas = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/lista-empresas",
          element: <ListaEmpresas />,
        },
        {
          // path: `/empresas/${empresa}`,
          path: `/teste`,
          element: <Empresa />,
        },
        {
          path: "/termos-uso",
          element: <TermosUso />,
        },
        {
          path: "/minha-empresa",
          element: <PerfilEmpresa />,
        },
        {
          path: "/agenda",
          element: <Agenda />,
        },
        {
          path: "/meu-perfil",
          element: <PerfilClient />,
        },
        {
          path: "/sobre",
          element: <Sobre />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cadastro",
      element: <Cadastro />,
      children: [
        {
          index: true, // Define que essa rota será carregada inicialmente
          element: <Navigate to="email" replace />,
        },
        {
          path: "email",
          element: <ProtecaoRotas pagina={<Email />} etapa={1} />,
        },
        // {
        //   path: "validacao",
        //   element: <ProtecaoRotas pagina={<Confirma_Email />} etapa={2} />,
        // },
        {
          path: "tipo-usuario",
          element: <ProtecaoRotas pagina={<Tipo_Usuario />} etapa={2} />,
        },
        {
          path: "cadastro-cliente",
          element: <ProtecaoRotas pagina={<Cliente />} etapa={3} />,
        },
        {
          path: "cadastro-empresa",
          element: <ProtecaoRotas pagina={<CadastroEmpresa />} etapa={3} />,
        },
        {
          path: "cadastro-endereco",
          element: <ProtecaoRotas pagina={<Endereco />} etapa={4} />,
        },
        {
          path: "cadastro-senha",
          element: <ProtecaoRotas pagina={<Senha />} etapa={5} />,
        },
        {
          path: "informacoes",
          element: <ProtecaoRotas pagina={<Informacoes />} etapa={6} />,
        },
      ],
    },
    {
      path: "/erro",
      element: <Erro />,
    },
  ]);
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={routes} />
    </AnimatePresence>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Rotas />
  </StrictMode>
);
