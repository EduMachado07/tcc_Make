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

const Rotas = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {}
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cadastro",
      element: <App />,
    },
    {
      path: "/negocios",
      element: <Negocios />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Rotas/>
  </StrictMode>
);
