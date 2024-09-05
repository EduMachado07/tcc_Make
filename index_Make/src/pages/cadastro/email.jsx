import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authEmail } from "../../context/authEmail";

const Email = () => {
  const [email, setEmail] = useState("");
  const [erroEmail, setErro_Email] = useState("");
  const navigate = useNavigate();
  const stateEmail = authEmail((state) => state.setEmail);

  // INICIA PAGINA COM INPUT FOCADO
  const inputEmail = useRef(null);
  useEffect(() => {
    if (inputEmail.current) {
      inputEmail.current.focus();
    }
  }, []);

  function EnviarFormulario(event){
    event.preventDefault();
    setErro_Email("");
    stateEmail(email);
    navigate("../validacao")
  }

  return (
    <div className="h-full">
      <form
        method="post"
        onSubmit={EnviarFormulario}
        className=" w-full h-full flex flex-col justify-center items-center gap-6"
      >
        <div className="flex flex-col w-3/4 gap-1">
          <h1 className="mb-7 text-3xl text-sky-600 font-semibold">Cadastro</h1>
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
              className={`w-full pl-7 py-1 shadow-sm rounded font-light bg-transparent border-1 ${
                erroEmail ? "border-red-500" : "border-slate-300"
              }`}
              type="email"
              name="email"
              id="email"
              ref={inputEmail}
              placeholder="user@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {erroEmail && <p className="text-sm text-red-500">{erroEmail}</p>}
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <button
            type="submit"
            className="w-full bg-sky-600 font-medium p-2 rounded-md text-blue-50 shadow-lg"
          >
            Cadastrar
          </button>
          <div className="w-full text-center">
            <p className="text-sm mt-1.5">
              Já possui uma conta?{" "}
              <Link
                to="/login"
                className="text-sm text-sky-600 underline underline-offset-1"
              >
                Faça login!
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

export default Email;
