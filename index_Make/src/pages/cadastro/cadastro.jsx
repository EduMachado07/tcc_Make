import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Cadastro = () => {
  return (
    <main className="w-full h-screen bg-slate-100 flex justify-center items-center p-3">
      {/* IDENTIFICACAO DA PAGINA */}
      <section className="bg-sky-600 w-2/4 h-full rounded-l-md relative flex justify-center items-center">
        <Link
          to={"/"}
          className="absolute top-5 left-3 text-xl font-bold text-blue-50"
        >
          -- Hub<span>Flow</span> --
        </Link>

        <div className="w-3/4">
          <h1 className="text-2xl text-center text-slate-100">
            Dê seus primeiros passos!
          </h1>
          <p className="text-center text-slate-100">
            Preencha todos os campos com as suas informações, e desfrute do
            melhor sistema de gerenciamento para empresas.
          </p>
        </div>
      </section>

      {/* PAGINAS PARA CADASTRO */}
      <section className="w-2/4 h-full">
        <Outlet />
      </section>
    </main>
  );
};

export default Cadastro;