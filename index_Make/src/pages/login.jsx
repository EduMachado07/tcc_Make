import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../context/authLogin";
import validator from "validator";
// -------- COMPONENTES UI (shadcn)------------
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import Erro from "@/components/componentes/erro";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const stateLogin = authLogin((state) => state.login);

  // INICIA PAGINA COM INPUT FOCADO
  const inputEmail = useRef(null);
  useEffect(() => {
    if (inputEmail.current) {
      inputEmail.current.focus();
    }
  }, []);

  async function EnviarFormulario(event) {
    event.preventDefault();

    if (!validator.isEmail(email)) {
      setErro("insira um email válido");
      return;
    }

    setErro("");
  
    const timeout = 15000;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
    );
  
    try {
      const res = await Promise.race([
        axios.post("http://localhost:3000/api/login", { email, senha }),
        timeoutPromise,
      ]);
      const user = res.data.user;
  
      if (user) {
        stateLogin(user);
        navigate("/negocios");
      } else {
        setErro("Usuário não encontrado");
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      if (error.response) {
        setErro(`Erro na resposta: ${error.response.data.error}`);
      } else if (error.request) {
        setErro("Nenhuma resposta recebida do servidor.");
      } else {
        setErro(`Erro na solicitação: ${error.message}`);
      }
    }
  }

  return (
    <div className="w-full h-screen bg-colorBack flex justify-center items-center p-3">
      {/* IDENTIFICACAO DA PAGINA */}
      <div className="bg-colorPrimary w-2/4 h-full rounded-l-md relative flex justify-center items-center">
        <Link
          to={"/"}
          className="absolute top-5 left-3 text-xl font-bold text-blue-50"
        >
          -- Hub<span>Flow</span> --
        </Link>

        <div className="w-3/4">
          <h1 className="text-2xl text-center text-slate-100">
            Seja bem-vindo!
          </h1>
          <p className="text-center text-slate-100">
            Estamos felizes em recebe-lo novamente em nosso sistema, entre com o
            seu login e senha, e encontre os melhores estabelecimentos.
          </p>
        </div>
      </div>

      {/* FORMULARIO LOGIN */}
      <form
        method="post"
        onSubmit={EnviarFormulario}
        className="w-2/4 px-4 h-full relative flex flex-col justify-center items-center gap-4"
      >
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="subtitle">Login</Label>
          {/* MENSAGEM DE ERRO PARA EMAIL E SENHA */}
          {/* COMPONENTE MENSAGEM DE ERRO */}
          <Erro props={ erro }/>
          {/* CAMPO EMAIL */}
          <>
            <Label size="medium">Email</Label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 fill-colorPrimary absolute inset-y-2 left-1.5"
              >
                <path
                  fillRule="evenodd"
                  d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>

              <Input
                variant="inputIcon"
                type="text"
                value={email}
                ref={inputEmail}
                placeholder="user@gmail.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </>
          <>
            <Label size="medium">Senha</Label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 stroke-colorPrimary absolute inset-y-2 left-1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <Input
                variant="inputIcon"
                type="password"
                value={senha}
                placeholder="user@123"
                onChange={(event) => setSenha(event.target.value)}
              />
              <div className="w-full text-right">
                <Link
                  className={buttonVariants({
                    variant: "link",
                    color: "secondary",
                    size: "link",
                  })}
                >
                  Esqueci a senha
                </Link>
              </div>
            </div>
          </>
        </div>
        <div className="w-3/4 flex flex-col">
          <Button variant="primary" disabled={!email || !senha}>
            Entrar
          </Button>
          <div className="w-full text-center">
            <p className="text-sm">
              Não possui uma conta?{" "}
              <Link
                to="/cadastro"
                className={buttonVariants({
                  variant: "link",
                  color: "secondary",
                  size: "link",
                })}
              >
                Cria uma conta agora!
              </Link>
            </p>
          </div>
        </div>
        <div className="w-3/4 flex justify-center items-center relative mt-3 mb-2">
          <Separator />
          <p className="px-6 absolute bg-colorBack">ou</p>
        </div>
        <div className="w-3/4 flex flex-col gap-3">
          <Button>Login com Google</Button>
          <Button>Login com Facebook</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
