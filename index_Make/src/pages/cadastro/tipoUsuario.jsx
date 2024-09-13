import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProtecao_Rotas } from "../../context/authProtecao_rotas";
// -------- COMPONENTES UI (shadcn)------------
import { Button } from "@/components/ui/button";

const Tipo_Usuario = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const stateEtapa = authProtecao_Rotas((state) => state.setEtapa);

  function tipoUsario(tipo) {
    setUser(tipo);
  }
  function EnviarUsuario() {
    stateEtapa(4);
    if (user === "cliente") {
      navigate("../cadastro-cliente");
    } else if (user === "empresa") {
      navigate("../cadastro-empresa");
    } else {
      setErro("selecione um tipo de usuário.");
    }
  }

  return (
    <div className="h-full 600 flex justify-center items-center">
      <section className="w-3/4 flex flex-col gap-6 px-4">
        {/* CARD CLIENTE */}
        <h1 className="text-3xl text-colorPrimary font-semibold">
          Quem você é?
        </h1>
        <div
          className={`flex rounded-sm shadow-md justify-around items-center around p-3 ${
            user === "cliente"
              ? "border-2 border-colorPrimary"
              : "border-2 border-transparent"
          }`}
          onClick={() => tipoUsario("cliente")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 fill-colorPrimary"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="w-7/12">
            <h1 className="text-xl text-colorPrimary">Cliente</h1>
            <hr className="border-1 border-colorPrimary mb-2" />
            <p className="text-sm">
              Se você quer descobrir empresas e agendar um horário com
              profissionais da beleza, a qualquer hora e em qualquer lugar, essa
              é a sua melhor opção.
            </p>
          </div>
        </div>
        {/* CARD EMPRESA */}
        <div
          className={`flex rounded-sm shadow-md justify-around items-center around p-3 ${
            user === "empresa"
              ? "border-2 border-colorPrimary"
              : "border-2 border-transparent"
          }`}
          onClick={() => tipoUsario("empresa")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 fill-colorPrimary"
          >
            <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
            <path
              fillRule="evenodd"
              d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="w-7/12">
            <h1 className="text-xl text-colorPrimary">Empresa</h1>
            <hr className="border-1 border-colorPrimary mb-2" />
            <p className="text-sm">
              Se você quer descobrir empresas e agendar um horário com
              profissionais da beleza, a qualquer hora e em qualquer lugar, essa
              é a sua melhor opção.
            </p>
          </div>
        </div>
        <Button variant="primary" disabled={!user} onClick={EnviarUsuario}>
          Continuar
        </Button>
      </section>
    </div>
  );
};

export default Tipo_Usuario;
