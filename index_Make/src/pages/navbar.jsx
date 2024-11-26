import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../context/authLogin";
import { authProtecao_Rotas } from "../context/authProtecao_rotas";
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
import logo from "../assets/logoHubflow.png";

const Navbar = () => {
  const { resetEtapa } = authProtecao_Rotas();
  const { autenticacao, logout, user } = authLogin();
  const navigate = useNavigate();

  function Deslogar() {
    logout(navigate);
  }
  function Cadastro() {
    resetEtapa();
    navigate("/cadastro");
  }
  return (
    <div className="bg-colorPrimary w-full inline-flex justify-between items-center py-1.5 px-8 m-0 max-sm:px-5">
      <Link to="/">
        <div className="w-16 h-12">
          <img src={logo} alt="" className="w-full h-full object-cover" />
        </div>
      </Link>
      {/* PAGINAS */}
      <section className="flex items-center gap-8 max-sm:gap-4">
        <div className="flex gap-4 max-sm:hidden">
          <Link
            className=" text-slate-300 font-medium text-base hover:text-slate-50 hover:underline underline-offset-4"
            to="/lista-empresas"
          >
            Empresas
          </Link>
          <Link
            className=" text-slate-300 font-medium text-base hover:text-slate-50 hover:underline underline-offset-4"
            to="/"
          >
            Sobre
          </Link>
        </div>
        <div className="flex gap-2 max-sm:gap-0.5">
          <Link to="/login">
            <Button variant="noneOutline" className="mb-0">
              Login
            </Button>
          </Link>

          <Button variant="outline" className="mb-0" onClick={Cadastro}>
            Cadastro
          </Button>
        </div>

        {/* PERFIL DO USUARIO */}
        {autenticacao ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>perfil</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6 w-48">
              {/* NOME DO USUARIO OU EMPRESA */}
              <DropdownMenuLabel className="text-colorPrimary font-semibold">
                {user.nome}
              </DropdownMenuLabel>
              {/* PAGINAS PARA MOBILE */}
              <DropdownMenuSeparator />
              <div className="sm:hidden">
                <DropdownMenuItem>
                  <Link to="/lista-empresas" className="w-full">
                    Empresas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/" className="w-full">
                    Planos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/" className="w-full">
                    Sobre
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
              {/* PAGINA CONFORME TIPO DO USUARIO */}
              <DropdownMenuItem>
                <Link to="/" className="w-full">
                  {user.tipoUser === "admin" ? "Minha agenda" : "Minha empresa"}
                </Link>
              </DropdownMenuItem>
              {/* CONFIGURACOES */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <Link to="/" className="w-full">
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 font-medium"
                onClick={Deslogar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Sair da Conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7 stroke-slate-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-6 w-48">
                {/* PAGINAS PARA MOBILE */}
                <div className="sm:hidden">
                  <DropdownMenuItem>
                    <Link to="/lista-empresas" className="w-full">
                      Empresas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/" className="w-full">
                      Planos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/" className="w-full">
                      Sobre
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
