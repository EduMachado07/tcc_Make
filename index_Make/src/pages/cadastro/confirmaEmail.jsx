import React, { useRef, useEffect, useState } from "react";
import { authEmail } from "../../context/authEmail";
import { useNavigate } from "react-router-dom";
import { authProtecao_Rotas } from "../../context/authProtecao_rotas";

const Confirma_Email = () => {
  const email = authEmail((state) => state.email);
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const stateEtapa = authProtecao_Rotas((state) => state.setEtapa);

  // INICIA PAGINA COM INPUT FOCADO
  const inputEmail = useRef(null);
  useEffect(() => {
    if (inputEmail.current) {
      inputEmail.current.focus();
    }
  }, []);

  function EnviarFormulario(event) {
    event.preventDefault();
    const timeout = 2000;
    setErro("");
    if (codigo == 12345) {
      setTimeout(() => {
        navigate("../tipo-usuario");
      }, timeout);
      stateEtapa(3);
    } else {
      setErro("Código inválido. Verifique o seu email e tente novamente");
    }
  }

  return (
    <div className="h-full">
      <form
        method="post"
        onSubmit={EnviarFormulario}
        className="w-full h-full flex flex-col justify-center items-center gap-6"
      >
        <div className="flex flex-col w-3/4 gap-4">
          <h1 className="text-3xl text-sky-600 font-semibold">
            Confirme seu email
          </h1>
          <p className="mb-7">
            Enviamos um código de 5 digitos para o email:{" "}
            <span className="font-semibold break-all bg-slate-200 text-sm p-0.5 rounded-sm">
              {email}
            </span>
            , verifique a caixa de entrada e coloque o codigo no campo abaixo
            para validarmos e poder prosseguir com o cadastro.
          </p>
          {/* <label className="text-base font-base">Código</label> */}
          <div className="text-center">
            <input
              className={
                "w-2/5 pl-2 shadow-md rounded font-light bg-transparent border-1 border-slate-300 text-center text-6xl tracking-wide mb-4"
              }
              type="text"
              inputMode="numeric"
              maxLength={5}
              name="codigo"
              value={codigo}
              ref={inputEmail}
              onChange={(event) => setCodigo(event.target.value)}
            />
            {erro && <p className="text-sm text-red-500">{erro}</p>}
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <button
            type="submit"
            disabled={codigo.length !== 5}
            className={`w-full font-medium p-2 rounded-md shadow-lg transition duration-150 ease-in delay-100 ${
              codigo.length !== 5
                ? "bg-slate-200 text-slate-400"
                : "bg-sky-600 text-blue-50"
            }`}
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Confirma_Email;
