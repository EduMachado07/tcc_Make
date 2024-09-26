import React, { useRef, useEffect, useState } from "react";
import { authCadastro } from "../../context/authCadastro";
import { useNavigate } from "react-router-dom";
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

import Erro from "@/components/componentes/erro";

const Confirma_Email = () => {
  const { email } = authCadastro();
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const stateEtapa = authProtecao_Rotas((state) => state.setEtapa);
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);

  // INICIA PAGINA COM INPUT FOCADO
  const inputEmail = useRef(null);
  useEffect(() => {
    if (inputEmail.current) {
      inputEmail.current.focus();
    }
  }, []);

  const EnviarFormulario = async(event) => {
    event.preventDefault();
    const timeout = 2000;
    set_btnLoading_Submit(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setErro("");
    if (codigo == 12345) {
      setTimeout(() => {
        navigate("../tipo-usuario");
      }, timeout);
      stateEtapa(3);
    } else {
      setErro("Código inválido. Verifique o seu email e tente novamente");
    }
    set_btnLoading_Submit(false);
  }

  return (
    <div className="h-full">
      <form
        method="post"
        onSubmit={EnviarFormulario}
        className="w-full h-full flex flex-col justify-center items-center gap-6 px-4"
      >
        <div className="flex flex-col w-3/4 gap-4">
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
              ref={inputEmail}
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
          <Button disabled={codigo.length !== 5} variant="primary">
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
    </div>
  );
};

export default Confirma_Email;
