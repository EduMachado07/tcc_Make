import { Outlet, Link, useNavigate } from "react-router-dom";
import { authLogin } from "./context/authLogin";

import { Button } from "@/components/ui/button";

function Navbar() {
  const authUser = authLogin((state) => state.user);
  const authAutenticacao = authLogin((state) => state.autenticacao);
  return (
    <div className="w-full h-16 inline-flex justify-between items-center px-10">
      <Link to="/" className="text-3xl text-sky-500 font-medium">
        HubFlow
      </Link>
      <ul className="">
        <Link
          className="mr-5 font-medium text-lg hover:text-sky-600"
          to="/negocios"
        >
          Negócios
        </Link>
        <Link className="mr-5 font-medium text-lg hover:text-sky-600" to="/">
          Planos
        </Link>
        <Link className="mr-5 font-medium text-lg hover:text-sky-600" to="/">
          Sobre
        </Link>
        <Link
          className="mr-5 font-medium text-lg hover:text-sky-600"
          to="/cadastro"
        >
          Cadastro
        </Link>
        <Link className="font-medium text-lg hover:text-sky-600" to="/login">
          Login
        </Link>
      </ul>
      {authAutenticacao ? (
        <p>logado como {authUser.nome}</p>
      ) : (
        <p>faça login</p>
      )}
    </div>
  );
}

function App() {
  const authLogout = authLogin((state) => state.logout);
  const navigate = useNavigate();
  
  function Deslogar() {
    authLogout(navigate);
  }
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Button size="sm" variant="destructive" onClick={Deslogar}>
        Sair da conta
      </Button>
      <Outlet />
    </div>
  );
}

export default App;
1;
