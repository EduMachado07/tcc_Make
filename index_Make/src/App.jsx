import { Outlet, Link, useNavigate } from "react-router-dom";
import { authLogin } from "./context/authLogin";
import { authCadastro } from "./context/authCadastro";
import { authProtecao_Rotas } from "./context/authProtecao_rotas";
// -------- COMPONENTES UI (shadcn)------------
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const { resetEtapa } = authProtecao_Rotas();
  const { autenticacao, logout, user } = authLogin();
  const navigate = useNavigate();

  function Deslogar() {
    logout(navigate);
  }
  function Cadastro(){
    resetEtapa();
    navigate('/cadastro');
  }
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
          onClick={Cadastro}
        >
          Cadastro
        </Link>
        <Link className="font-medium text-lg hover:text-sky-600" to="/login">
          Login
        </Link>
      </ul>
      {autenticacao ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.nome}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={Deslogar}>
              Sair da Conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <p>faça login</p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
1;
