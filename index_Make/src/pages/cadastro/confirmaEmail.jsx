import React, { useRef, useEffect, useState } from "react";
import { authEmail } from "../../context/authEmail";

const Confirma_Email = () => {
  const stateLogin = authEmail((state) => state.email);
  const [codigo, setCodigo] = useState('');

  // INICIA PAGINA COM INPUT FOCADO
  const inputEmail = useRef(null);
  useEffect(() => {
    if (inputEmail.current) {
      inputEmail.current.focus();
    }
  }, []);

  return (
    <div className="h-full">
      <form
        method="post"
        className="w-full h-full flex flex-col justify-center items-center gap-6"
      >
        <div className="flex flex-col w-3/4 gap-1">
          <h1 className="mb-7 text-3xl text-sky-600 font-semibold">
            Confirme seu email
          </h1>
          <label className="text-base font-base">Código</label>
          <div className="relative">
            <input
              className={
                "w-full pl-2 py-1 shadow-sm rounded font-light bg-transparent border-1 border-slate-300"
              }
              type="email"
              name="email"
              id="email"
              ref={inputEmail}
              value={codigo}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <button
            type="submit"
            className="w-full bg-sky-600 font-medium p-2 rounded-md text-blue-50 shadow-lg"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Confirma_Email;
