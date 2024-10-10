import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Erro = () => {
  return (
    <div className="w-full h-screen bg-colorBack flex justify-center items-center flex-col gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 stroke-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>

      <Label size="title" color="alert">Ops! Ocorreu um erro.</Label>
      <div className="w-5/12">
        <Label size="large">
          Nosso sistema identificou um problema. Pedimos desculpas pelo
          ocorrido, e que volte a página anterior para tentarmos novamente.
        </Label>
      </div>
    </div>
  );
};

export default Erro;
