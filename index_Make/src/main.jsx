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
import Cadastro from "./pages/cadastro.jsx";
import Negocios from "./pages/negocios.jsx";

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
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cadastro",
      element: <Cadastro />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Rotas/>
  </StrictMode>
);
