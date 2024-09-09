import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// ------- paginas da aplicacao --------
import App from "./App.jsx";
import Login from "./pages/login.jsx";
import Negocios from "./pages/negocios.jsx";
import Cadastro from "./pages/cadastro/cadastro.jsx";
import Email from "./pages/cadastro/email.jsx";
import Confirma_Email from "./pages/cadastro/confirmaEmail.jsx";
import Tipo_Usuario from "./pages/cadastro/tipoUsuario.jsx";
import Cliente from "./pages/cadastro/cliente.jsx";
import Empresa from "./pages/cadastro/empresa.jsx";

import ProtecaoRotas from "./components/protecaoRotas.jsx";

const Rotas = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/negocios",
          element: <Negocios />,
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
        {
          path: "validacao",
          element: <ProtecaoRotas pagina={<Confirma_Email />} etapa={2} />,
        },
        {
          path: "tipo-usuario",
          element: <ProtecaoRotas pagina={<Tipo_Usuario />} etapa={3} />,
          
        },
        {
          path: "cadastro-cliente",
          element: <ProtecaoRotas pagina={<Cliente />} etapa={4} />,
          
        },
        {
          path: "cadastro-empresa",
          element: <ProtecaoRotas pagina={<Empresa />} etapa={4} />,
          
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Rotas />
  </StrictMode>
);
