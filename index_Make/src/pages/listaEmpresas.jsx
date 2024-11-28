import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import imgRascunho from "../assets/rascunhoImg.png";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { authProtecao_Rotas } from "@/context/authProtecao_rotas";

const ListaEmpresas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([
    {
      id: 1,
      service: "corte de cabelo masculino masculino",
      value: 30.0,
    },
    {
      id: 2,
      service: "corte e sobrancelha",
      value: 45.0,
    },
    {
      id: 3,
      service: "platinado para o natal",
      value: 80.0,
    },
  ]);
  const [empresas, setEmpresas] = useState([]);
  const { setIdEmpresa } = authProtecao_Rotas();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmpresa = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/servicos"
        );
        setEmpresas(res.data);
      } catch (error) {
        console.log("deu ruim", error);
      } finally {
        console.log(empresas);
        setIsLoading(false);
      }
    };
    getEmpresa();
  }, []);

  return (
    <main className="bg-colorBack min-h-screen flex flex-col items-center py-6 px-10 gap-7 max-sm:px-4">
      <Label size="titleLg">Nossas empresas</Label>

      {empresas.map((item) => (
        <section
          key={item.id}
          className="w-full py-3 px-5 flex gap-10 justify-between rounded-md max-sm:flex-col max-sm:shadow-lg max-sm:border-2 max-sm:border-colorPrimary max-sm:py-6 max-sm:gap-3"
        >
          {/* IMAGEM EMPRESA */}
          <div className="w-1/4 h-56 max-sm:w-full">
            <img
              src={imgRascunho}
              alt=""
              className="w-full h-full object-cover rounded-sm"
            />
          </div>

          {/* INFORMACOES EMPRESA */}
          <div className="w-3/4 flex flex-col gap-2 max-sm:w-full">
            <div className="flex flex-col mb-2">
              <Label
                size="title"
                className="overflow-hidden text-ellipsis line-clamp-1"
              >
                {item.nameEmpresa}
              </Label>
              <Label
                size="large"
                className="capitalize overflow-hidden text-ellipsis line-clamp-1"
              >
                {item.localEmpresa}
              </Label>
              <Separator />
            </div>

            {/* SERVICOS E REDIRECIONAMENTO */}
            {services.slice(0, 3).map((servico) => (
              <section
                key={servico.id}
                className="flex justify-between items-center sm:hover:bg-zinc-300 py-1 px-3 rounded-sm sm:hover:scale-105 max-sm:px-0"
              >
                <Label size="base" color="colorText" className="max-sm:hidden">
                  {servico.service}
                </Label>

                <div className="max-sm:w-full flex items-center justify-between gap-2">
                  <div className="flex flex-col sm:hidden">
                    <Label
                      size="large"
                      color="colorText"
                      className="overflow-hidden text-ellipsis line-clamp-1"
                    >
                      {servico.service}
                    </Label>
                    <Label size="large" color="colorText">
                      R$ {servico.value.toFixed(2)}
                    </Label>
                  </div>
                  <Label
                    size="base"
                    color="colorText"
                    className="max-sm:hidden"
                  >
                    R$ {servico.value.toFixed(2)}
                  </Label>
                  <Button
                    className="m-0"
                    variant="primary"
                    onClick={() => {
                      setIdEmpresa(item.id);
                      navigate("/teste");
                    }}
                  >
                    Agendar
                  </Button>
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default ListaEmpresas;
