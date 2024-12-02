import React, { useState, useEffect } from "react";
import axios from "axios";
import imgRascunho from "../assets/rascunhoImg.png";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CircularProgress from "@mui/material/CircularProgress";

import { authProtecao_Rotas } from "@/context/authProtecao_rotas";
import { motion } from "framer-motion";

const Agenda = () => {
  const { idEmpresa } = authProtecao_Rotas();

  const [isLoading, setIsLoading] = useState(false);
  const [isResize, setIsResize] = useState(2);
  const resizeServices = () => {
    setIsResize((prev) => (prev === 1 ? 2 : 1));
  };

  const [servicos, setServicos] = useState([
    {
      id: 1,
      cliente: "eduardo Machado",
      img: "eduardo.jpeg",
      mes: "novembro",
      dia: 30,
      horario: "10:30",
      funcionario: "Carlos",
      valor: 30,
      servico: "corte de cabelo masculino",
    },
    {
      id: 2,
      cliente: "Gabrielle Machado",
      img: "gaby.jpeg",
      mes: "novembro",
      dia: 29,
      horario: "19:00",
      funcionario: "Carlos",
      valor: 100,
      servico: "corte feminino e escova",
    },
    {
      id: 3,
      cliente: "Eduarda Leite",
      img: "eduarda.jpeg",
      mes: "dezembro",
      dia: 25,
      horario: "15:30",
      funcionario: "João",
      valor: 45,
      servico: "corte de cabelo e sobrancelha",
    },
  ]);
  const filterServices = async () => {};
  const deleteService = async () => {};
  const completeService = async () => {};

  //   useEffect(() => {
  //     const getServices = async () => {
  //       setIsLoading(true);
  //       try {
  //         const res = axios.get(`${idEmpresa}`);
  //         setServicos(res.data);
  //       } catch (error) {
  //         console.log("deu ruim", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //   }, []);

  return (
    <main className="bg-colorBack min-h-screen px-12 max-sm:px-4 py-6">
      {isLoading ? (
        <div className="w-full flex justify-center">
          <CircularProgress size={40} color="info" />
        </div>
      ) : (
        <section>
          {servicos.length > 0 ? (
            <section className="flex flex-col gap-7">
              <div className="flex max-sm:flex-col sm:items-center gap-8 max-sm:gap-2">
                <div className="w-full">
                  <Input placeholder="filtre seus agendamentos aqui..." />
                </div>
                <section className="flex gap-3 max-sm:justify-end">
                  <Button variant="primary" size="lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                      />
                    </svg>
                    Filtrar por...
                  </Button>
                  <Button
                    onClick={resizeServices}
                    className="max-sm:hidden"
                    variant="primary"
                    size="lg"
                  >
                    {isResize === 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    )}
                  </Button>
                </section>
              </div>
              <section
                className={`grid grid-cols-${isResize} max-sm:grid-cols-1 gap-8 place-items-center`}
              >
                {servicos.map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      isResize === 1
                        ? "w-3/4 justify-center gap-20"
                        : "w-full justify-between"
                    } flex max-sm:flex-col max-sm:justify-center p-4 border-2 border-colorPrimary rounded-md shadow-lg`}
                  >
                    <div className="w-60 h-60 max-sm:w-44 max-sm:h-44 max-sm:hidden">
                      <img
                        src={`http://localhost:5173/src/assets/${item.img}`}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="w-3/5 max-sm:w-full flex flex-col gap-1">
                      <div>
                        <h1 className="capitalize text-2xl font-semibold text-colorPrimary">
                          {item.cliente}
                        </h1>
                        <Separator className="w-4/5" />
                      </div>
                      <div>
                        <p className="text-xl font-bold  overflow-hidden text-ellipsis line-clamp-2">
                          {item.servico}
                        </p>
                        <p className="text-lg font-semibold">
                          Data:{" "}
                          <span className="font-medium">
                            {item.dia} de {item.mes}, as {item.horario}
                          </span>
                        </p>
                        <p className="text-lg font-semibold">
                          Funcionário: {item.funcionario}
                        </p>
                      </div>
                      <p className="text-xl text-right font-bold text-colorPrimary">
                        Valor(R$): {item.valor},00
                      </p>
                      <div className="flex flex-col gap-1.5">
                        <Button size="lg" variant="primary">
                          Marcar como feito
                        </Button>
                        <Button variant="destructive">Desmarcar</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </section>
          ) : (
            <div>
              <h1>Sua empresa ainda não possui nenhum agendamento</h1>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default Agenda;
