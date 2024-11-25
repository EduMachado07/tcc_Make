import React, { useRef, useEffect, useState } from "react";
import { authCadastro } from "../../context/authCadastro";
import { useNavigate, Link } from "react-router-dom";
import { authProtecao_Rotas } from "../../context/authProtecao_rotas";
// -------- COMPONENTES UI (shadcn)------------
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// -------- ( MATERIAL UI )------------
import CircularProgress from "@mui/material/CircularProgress";
// ------ COMPONENTE PARA ERRO ------
import Erro from "@/components/componentes/erro";
// ----- BIBLIOTECA DE ANIMACAO (motion) ------
import { motion } from "framer-motion";

const Confirma_Email = () => {
  // ESTADOS DA PAGINA
  const { email } = authCadastro();
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  //
  const { setEtapa } = authProtecao_Rotas();
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);

  // INICIA PAGINA COM INPUT FOCADO
  const inputCodigo = useRef(null);
  useEffect(() => {
    if (inputCodigo.current) {
      inputCodigo.current.focus();
    }
  }, []);

  const EnviarFormulario = async (event) => {
    event.preventDefault();

    set_btnLoading_Submit(true);

    // -----------
    // ADICIONAR API PARA VERIFICAR O CODIGO DO EMAIL
    // -----------

    setErro("");
    // VERIFICA SE O CODIGO INSERIDO É IGUAL AO DO EMAIL
    if (codigo == 12345) {
      // AVANCA PAGINA
      setEtapa(3);
      navigate("../tipo-usuario");
    } else {
      setErro("Código inválido. Verifique o seu email e tente novamente");
    }
    set_btnLoading_Submit(false);
  };

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
        className="w-full h-full flex flex-col justify-center items-center gap-6 px-4"
      >
        <div className="flex flex-col w-3/4 gap-4">
          <Link to="/" className="sm:hidden mb-2 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            <Label size="large">Voltar</Label>
          </Link>
          <Label size="subtitle">Confirme seu email</Label>
          <p className="mb-7">
            Enviamos um código de 5 digitos para o email:{" "}
            <span className="font-semibold break-all bg-zinc-300 text-colorPrimary text-sm p-1 rounded-sm">
              {email}
            </span>
            , verifique a caixa de entrada e coloque o codigo no campo abaixo
            para validarmos e poder prosseguir com o cadastro.
          </p>
          <div className="flex justify-center">
            <InputOTP
              maxLength={5}
              ref={inputCodigo}
              value={codigo}
              onChange={(codigo) => setCodigo(codigo)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        {/* COMPONENTE MENSAGEM DE ERRO */}
        <Erro props={erro} />
        <div className="w-3/4 flex flex-col">
          <Button
            disabled={codigo.length !== 5 || btnLoading_Submit}
            variant="primary"
          >
            {btnLoading_Submit ? (
              <CircularProgress
                size={20}
                color="colorPrimary"
                className="relative inset-0 mt-1"
              />
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Confirma_Email;
