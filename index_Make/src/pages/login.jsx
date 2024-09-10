import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../context/authLogin";

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
    setErro("");

    // Tempo limite de 15 segundos
    const timeout = 15000;
    // Promessa para gerenciar o tempo limite
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
    );

    // CHAMADA API
    try {
      const res = await Promise.race([
        axios.get("https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/user"),
        timeoutPromise,
      ]);
      const user = res.data.find((user) => user.email === email);

      // VERIFICA NA API, SE AS INFORMACOES ESTAO CORRETAS
      if (!user) {
        setErro("Email está incorreto");
      } else if (user.senha !== senha) {
        setErro("Senha está incorreta");
      } else {
        setErro("");
        stateLogin(user);
        navigate("/negocios");
      }
    } catch (error) {
      // TRATAMENTO DE ERROS
      if (error.response) {
        // ERRO NA CHAMADA
        console.log("Erro na resposta API: ", {
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        // SOLICITACAO FEITA, MAS SEM RESPOSTA
        console.log("Nenhuma resposta recebida: ", error.request);
      } else {
        console.log("Erro na solicitação: ", error.message);
      }
    }
  }

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center p-3">
      {/* IDENTIFICACAO DA PAGINA */}
      <div className="bg-sky-600 w-2/4 h-full rounded-l-md relative flex justify-center items-center">
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
        <div className="flex flex-col w-3/4 gap-1">
          <h1 className="mb-5 text-3xl text-sky-600 font-semibold">Login</h1>
          {erro && (
            <p className="text-base inline-flex gap-1 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              {erro}
            </p>
          )}
          <label className="text-base font-base">Email</label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 fill-sky-600 absolute top-2 left-1.5"
            >
              <path
                fillRule="evenodd"
                d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="w-full pl-7 py-1 shadow-sm rounded font-light bg-transparent border-1 focus:border-sky-600"
              type="email"
              name="email"
              ref={inputEmail}
              placeholder="user@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-3/4 gap-1">
          <label className="text-base font-base">Senha</label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 stroke-sky-600 absolute top-2 left-1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <input
              className="w-full pl-7 py-1 shadow-sm rounded font-light bg-transparent border-1"
              type="password"
              name="senha"
              placeholder="senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>
          <div className="w-full text-right">
            <Link
              to="/cadastro"
              className="text-sm text-sky-600 underline underline-offset-1"
            >
              Esqueci a senha
            </Link>
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <button
            type="submit"
            disabled={!email || !senha}
            className={`w-full mb-1 font-medium p-2 rounded-md shadow-lg transition duration-150 ease-in delay-100 ${
              !email || !senha
                ? "bg-slate-200 text-slate-400"
                : "bg-sky-600 text-blue-50"
            }`}
          >
            Entrar
          </button>
          <div className="w-full text-center">
            <p className="text-sm mt-1.5">
              Não possui uma conta?{" "}
              <Link
                to="/cadastro"
                className="text-sm text-sky-600 underline underline-offset-1"
              >
                Cria uma conta agora!
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center relative mt-3 mb-2">
          <hr className="w-3/4 border border-sky-600" />
          <p className="px-2 absolute bg-slate-100">ou</p>
        </div>
        <div className="w-3/4 flex flex-col gap-3">
          <div className="relative">
            <button className="w-full font-normal bg-red-600 p-1.5 rounded-md text-red-50 shadow-lg">
              Login com Google
            </button>
          </div>
          <div className="relative">
            <button className="w-full font-normal bg-blue-500 p-1.5 rounded-md text-red-50 shadow-lg">
              Login com Facebook
            </button>
          </div>
          <div className="relative">
            <button className="w-full font-normal bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 p-1.5 rounded-md text-red-50 shadow-lg">
              Login com Instagram
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
