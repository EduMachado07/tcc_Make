import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Label } from "@/components/ui/label";
import logo from "../../assets/logoHubflow.png";

const Cadastro = () => {
  return (
    <main className="w-full h-screen bg-colorBack flex justify-center items-center p-3">
      {/* IDENTIFICACAO DA PAGINA */}
      <section className="bg-colorPrimary w-2/4 max-sm:hidden h-full rounded-l-md relative flex justify-center items-center">
        <Link
          to={"/"}
          className="absolute top-3 left-2 text-xl font-bold text-slate-100"
        >
          <div className="w-28 h-24">
            <img
              src={logo}
              alt="Hubflow"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <div className="w-3/4 flex flex-col">
          <Label size="titleLg" className="capitalize text-slate-100">
            Dê seus primeiros passos!
          </Label>
          <Label size="large" className="text-left text-slate-100">
            Preencha todos os campos com as suas informações, e desfrute do
            melhor sistema de gerenciamento de serviços para pequenas e grandes
            empresas.
          </Label>
        </div>
      </section>

      {/* PAGINAS PARA CADASTRO */}
      <section className="w-2/4 max-sm:w-full h-full overflow-hidden">
        <Outlet />
      </section>
    </main>
  );
};

export default Cadastro;
