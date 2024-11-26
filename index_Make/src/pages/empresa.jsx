import React, { useEffect, useState } from "react";
import axios from "axios";

import imgEmpresa from "../assets/rascunhoImg.png";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

import CircularProgress from "@mui/material/CircularProgress";

import { authProtecao_Rotas } from "@/context/authProtecao_rotas";

const Empresa = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [empresa, setEmpresa] = useState({});
  const [limitCards, setLimitCards] = useState(5);
  const [services, setServices] = useState([
    {
      id: 1,
      service: "Corte de cabelo masculino",
      value: 35.0,
      description:
        "Corte moderno ou tradicional para homens, com modelagem personalizada de acordo com o formato do rosto e estilo desejado.",
    },
    {
      id: 2,
      service: "Corte de cabelo feminino",
      value: 50.0,
      description:
        "Corte feminino com técnicas que valorizam o formato do rosto, incluindo repicados, franjas e estilos modernos.",
    },
    {
      id: 3,
      service: "Pintura e coloração",
      value: 120.0,
      description:
        "Aplicação de tintura para transformação da cor dos cabelos, seja para cobrir fios brancos ou mudar completamente o visual.",
    },
    {
      id: 4,
      service: "Hidratação capilar",
      value: 60.0,
      description:
        "Tratamento profundo para restaurar a saúde dos cabelos, proporcionando brilho, maciez e redução do frizz.",
    },
    {
      id: 5,
      service: "Escova progressiva",
      value: 200.0,
      description:
        "Alisamento sem formol, que proporciona cabelos mais lisos, disciplinados e com menos volume, de forma duradoura.",
    },
    {
      id: 6,
      service: "Luzes ou mechas",
      value: 180.0,
      description:
        "Técnica de clareamento parcial dos fios, criando um efeito de contraste e brilho, ideal para iluminar o visual.",
    },
    {
      id: 7,
      service: "Penteado para eventos",
      value: 100.0,
      description:
        "Criação de penteados elaborados e estilosos para eventos especiais, como casamentos, festas ou qualquer ocasião importante.",
    },
    {
      id: 8,
      service: "Manicure e pedicure",
      value: 70.0,
      description:
        "Serviço de cuidados completos com as unhas das mãos e pés, incluindo corte, modelagem, esmaltação e hidratação das cutículas.",
    },
  ]);

  const { idEmpresa } = authProtecao_Rotas();

  const increaseLimitCards = () => {
    setLimitCards((prev) => prev + 5);
  };

  useEffect(() => {
    const getEmpresa = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/servicos/${idEmpresa}`
        );
        setEmpresa(res.data);
      } catch (error) {
        console.log("deu ruim", error);
      } finally {
        console.log(empresa);
        setIsLoading(false);
      }
    };
    getEmpresa();
  }, []);

  return (
    <main className="py-6 w-full flex flex-col items-center">
      <section className="h-full min-h-screen w-full flex px-10 justify-between gap-10 max-sm:px-4">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <CircularProgress size={40} color="info" />
          </div>
        ) : (
          <>
            {/* WALL E SERVICOS */}
            <section className="w-2/4 h-full flex flex-col items-center gap-6 max-sm:w-full">
              <section className="w-full">
                <div className="w-full h-80 max-sm:h-52">
                  <img
                    src={imgEmpresa}
                    alt=""
                    className="w-full h-full object-cover sm:rounded-md max-sm:rounded-t-md shadow-md"
                  />
                </div>
                <div className="bg-colorPrimary flex flex-col w-full h-full rounded-b-md py-3 px-10 gap-3 shadow-lg sm:hidden max-sm:px-4">
                  <div className="flex justify-between items-center">
                    <Label
                      color="white"
                      className="text-5xl max-sm:text-2xl capitalize overflow-hidden text-ellipsis line-clamp-2"
                    >
                      {empresa.nameEmpresa}
                    </Label>
                    <div>
                      <div className="w-48 h-48 max-sm:w-24 max-sm:h-24">
                        <img
                          src={imgEmpresa}
                          alt=""
                          className="w-full h-full object-cover rounded-full border-4 border-colorBack"
                        />
                      </div>
                    </div>
                  </div>
                  <Separator color="colorBack" className="w-3/5 -mt-3" />
                  <Label color="white" className="text-base">
                    {empresa.descriptionEmpresa}
                  </Label>
                  <Label color="white" className="text-base capitalize">
                    Endereço: {empresa.localEmpresa}
                    Rua fernando Braga
                  </Label>
                  <Label color="white" className="text-lg">
                    Redes Sociais
                  </Label>
                </div>
              </section>

              <Label className="text-xl text- w-full -mb-2 font-semibold text-colorPrimary">
                Todos os Nossos Serviços:
                <Separator />
              </Label>

              {/* SERVICOS EM CARDS */}
              {services.slice(0, limitCards).map((item) => (
                <div
                  key={item.id}
                  className="bg-colorPrimary flex items-center justify-between w-full h-52 max-sm:h-full rounded-md py-4 px-6 shadow-lg max-sm:p-4 max-sm:gap-4"
                >
                  <div className="w-2/5 h-full max-sm:w-2/4">
                    <img
                      src={imgEmpresa}
                      alt=""
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="w-3/6 h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-2 max-sm:gap-2">
                      <Label
                        color="white"
                        className="text-2xl max-sm:text-lg font-bold capitalize overflow-hidden text-ellipsis line-clamp-3 max-sm:line-clamp-2"
                      >
                        {item.service}
                      </Label>
                      <Label
                        color="white"
                        className="overflow-hidden text-ellipsis line-clamp-3 max-sm:line-clamp-2"
                      >
                        {item.description}
                      </Label>
                      <Label color="white" size="base">
                        R$ {item.value},00
                      </Label>
                    </div>
                    <div className="flex justify-end">
                      <Link to="/" className="max-sm:w-full">
                        <Button
                          size="lg"
                          variant="outline"
                          className="max-sm:w-full"
                        >
                          Agandar serviço
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {limitCards < services.length && (
                <Button
                  onClick={increaseLimitCards}
                  className="w-full"
                  size="lg"
                  variant="ghost"
                >
                  Mostrar mais serviços
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              )}
            </section>
            {/* INFORMACOES DA EMPRESA */}
            <section className="bg-colorPrimary flex flex-col w-2/4 flex-grow rounded-md py-3 px-10 gap-3 shadow-lg max-sm:hidden">
              <div className="flex justify-between items-center">
                <Label
                  color="white"
                  className="text-5xl capitalize overflow-hidden text-ellipsis line-clamp-2"
                >
                  {empresa.nameEmpresa}
                </Label>
                <div>
                  <div className="w-48 h-48">
                    <img
                      src={imgEmpresa}
                      alt=""
                      className="w-full h-full object-cover rounded-full border-4 border-colorBack"
                    />
                  </div>
                </div>
              </div>
              <div></div>
              <Label color="white" className="text-lg">
                {empresa.descriptionEmpresa}
              </Label>
              <Label color="white" className="text-lg">
                Endereço: {empresa.localEmpresa}
              </Label>
              <Label color="white" className="text-lg">
                Redes Sociais
              </Label>
            </section>
          </>
        )}
      </section>
    </main>
  );
};

export default Empresa;
