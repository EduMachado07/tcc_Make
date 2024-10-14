import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authCadastro } from "../../context/authCadastro";
import { authProtecao_Rotas } from "../../context/authProtecao_rotas";
import validator from "validator";
import axios from "axios";
// -------- COMPONENTES UI (shadcn)------------
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// -------- ( MATERIAL UI )------------
import CircularProgress from "@mui/material/CircularProgress";
// -------- COMPONENTE DE ERRO ----------
import Erro from "@/components/componentes/erro";
// ----- BIBLIOTECA DE ANIMACAO ------
import { motion } from "framer-motion";

const Email = () => {
  // ESTADOS DA PAGINA
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);
  const navigate = useNavigate();
  // ADICIONA ETAPA PARA ROTA
  const { setEtapa } = authProtecao_Rotas();

  // INICIA PAGINA COM INPUT FOCADO
  const inputEmail = useRef(null);
  useEffect(() => {
    if (inputEmail.current) {
      inputEmail.current.focus();
    }
  }, []);

  // ENVIA INFORMACOES DO FORMULARIO
  async function EnviarFormulario(event) {
    event.preventDefault();

    // VERIFICA SE ESTA NO FORMATO EMAIL
    if (!validator.isEmail(email)) {
      setErro("insira um email válido");
      return;
    }
    // LIMPA ERROS
    setErro("");
    // INICIA LOADING
    set_btnLoading_Submit(true);

    // DEFINE TEMPO LIMITE
    const timeout = 15000;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
    );
    try {
      const res = await Promise.race([
        axios.get(
          "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/usuarios"
        ),
        timeoutPromise,
      ]);

      // VERIFICA SE JA EXISTE USUARIO COM O EMAIL INSERIDO
      const usuarioExistente = res.data.find((user) => user.email === email);
      if (usuarioExistente) {
        setErro("Email já possui uma conta");
        return;
      }
      // ADICIONA EMAIL NO LOCAL STORAGE
      authCadastro.getState().setUserInfo("email", email);
      // AVANCA PAGINA
      setEtapa(2);
      navigate("../validacao");
    } catch (error) {
      console.error("Erro na requisição:", error);
      navigate("../../erro");
    } finally {
      // TERMINA LOADING
      set_btnLoading_Submit(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <form
        method="post"
        onSubmit={EnviarFormulario}
        className=" w-full h-full flex flex-col justify-center items-center gap-6 px-4"
      >
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="subtitle">Cadastro</Label>
          {/* COMPONENTE MENSAGEM DE ERRO */}
          <Erro props={erro} />
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
        </div>
        {/* BOTAO CADASTRAR */}
        <div className="w-3/4 flex flex-col">
          <Button variant="primary" disabled={!email || btnLoading_Submit}>
            {btnLoading_Submit ? (
              <CircularProgress
                size={20}
                color="colorPrimary"
                className="relative inset-0 mt-1"
              />
            ) : (
              "Cadastrar"
            )}
          </Button>
          {/* LINK PARA PAGINA LOGIN */}
          <div className="w-full text-center">
            <p className="text-sm mt-1.5">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className={buttonVariants({
                  variant: "link",
                  color: "secondary",
                  size: "link",
                })}
              >
                Faça login!
              </Link>
            </p>
          </div>
        </div>
        {/* SEPARADOR */}
        <div className="w-3/4 flex justify-center items-center relative mt-3 mb-2">
          <Separator />
          <p className="px-6 absolute bg-colorBack">ou</p>
        </div>
        {/* BOTOES CADASTRO GOOGLE E FACEBOOK */}
        <div className="w-3/4 flex flex-col gap-3">
          <Button>Login com Google</Button>
          <Button>Login com Facebook</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Email;
