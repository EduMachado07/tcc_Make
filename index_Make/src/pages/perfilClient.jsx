import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authLogin } from "@/context/authLogin";

import imgRascunho from "../assets/enedy.jpeg";
import imgService from "../assets/servico.jpeg";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CircularProgress from "@mui/material/CircularProgress";

const PerfilClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = authLogin();

  const [services, setServices] = useState([]);

  // BUSCA CLIENTE E SEUS AGENDAMENTOS
  useEffect(() => {
    // NAO ALTERAR
    if (user.tipoUser === "admin") {
      navigate("/");
    }
    const getClient = async () => {
      setIsLoading(true);
      try {
        const res = axios.get("");
      } catch (error) {
        console.log("deu ruim", error);
      } finally {
        setIsLoading(false);
      }
    };
    const getServices = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/services/"
        );
        setServices(res.data);
      } catch (error) {
        console.log("deu ruim", error);
      } finally {
        setIsLoading(false);
      }
    };
    getServices();
    getClient();
  }, []);

  // EXCLUI AGENDAMENTO
  const deleteService = async () => {
    try {
    } catch (error) {}
  };

  // ALTERA PERFIL
  const updatePerfil = async () => {
    try {
    } catch (error) {}
  };

  return (
    <main className="min-h-screen bg-colorBack py-6 px-10 max-sm:px-3">
      {isLoading ? (
        <div className="w-full flex justify-center">
          <CircularProgress size={40} color="info" />
        </div>
      ) : (
        <main className="">
          <section className="w-full flex flex-col h-full gap-7">
            <section className="bg-colorPrimary h-full rounded-md px-44 max-sm:px-3 py-6">
              <section className="flex max-sm:flex-col items-center w-full gap-20 max-sm:gap-3">
                <div className="w-64 h-64 max-sm:w-44 max-sm:h-44">
                  <img
                    src={imgRascunho}
                    alt=""
                    className="w-full h-full rounded-full object-cover border-4 border-colorBack"
                  />
                </div>
                <div className="w-3/4 max-sm:w-full flex flex-col gap-1">
                  <h1 className="text-slate-50 text-4xl font-bold">
                    {services.nome}
                  </h1>
                  <h1 className="text-slate-50 text-lg overflow-hidden text-ellipsis line-clamp-3">
                    Endereço: {services.endereco}
                  </h1>
                  <h1 className="text-slate-50 text-lg ">
                    Data Nascimento: {services.dataNascimento}
                  </h1>
                  <Dialog>
                    <DialogTrigger className="w-full flex justify-end">
                      <Button variant="outline" size="lg" className="w-2/4">
                        Editar Perfil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-sm:w-4/5 rounded-md">
                      <DialogHeader>
                        <DialogTitle className="text-colorPrimary">
                          Edite as suas informações
                        </DialogTitle>
                      </DialogHeader>

                      <Input
                        value={services.nome}
                        placeholder="seu nome completo"
                      />
                      <Input
                        value={services.endereco}
                        placeholder="seu endereco"
                      />

                      <Button variant="primary" onClick={updatePerfil}>
                        Atualizar
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </section>
            </section>

            <div>
              <Label size="subtitle">Minha Agenda</Label>
              <Separator className="mt-1.5" />
            </div>

            <section className="w-full grid gap-6 grid-cols-2 max-sm:grid-cols-1">
              {/* SERVICOS EM CARDS */}
              {services.length > 0 ? (
                services.map((item) => (
                  <div
                    key={item.id}
                    className="bg-colorPrimary flex items-center justify-between w-full h-full rounded-md py-4 px-6 shadow-lg max-sm:p-4 max-sm:gap-4 max-sm:flex-col"
                  >
                    {/* IMAGEM */}
                    <div className="w-2/5 h-48 max-sm:w-full max-sm:h-44">
                      <img
                        // src={item.img === "" ? imgRascunho : item.img}
                        src={imgService}
                        alt="imagem não encontrada"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* INFORMACOES SERVICO */}
                    <div className="w-3/6 h-full flex flex-col gap-1 justify-between max-sm:w-full">
                      <div className="flex flex-col gap-2 max-sm:gap-2">
                        <Label
                          color="white"
                          className="text-2xl max-sm:text-lg font-bold capitalize overflow-hidden text-ellipsis line-clamp-2"
                        >
                          {item.nome}
                        </Label>
                        <Label
                          color="white"
                          className="overflow-hidden text-ellipsis line-clamp-3 max-sm:line-clamp-2"
                        >
                          {item.description}
                        </Label>
                        <Label
                          color="white"
                          className="overflow-hidden text-ellipsis line-clamp-3 max-sm:line-clamp-2"
                        >
                          Horário: {item.horario}
                        </Label>
                        <Label color="white" size="base">
                          Valor: R$ {item.value},00
                        </Label>
                      </div>
                      <div className="flex gap-2 justify-end">
                        {/* CARD PARA EXCLUIR SERVICO */}
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              onClick={deleteService}
                              size="lg"
                              variant="destructive"
                              className="max-sm:w-full"
                            >
                              Desmarcar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-colorPrimary text-xl">
                                Tem certeza que deseja cancelar o agendamento?
                              </DialogTitle>
                            </DialogHeader>
                            <Input disabled value={item.nome} />
                            <div className="flex gap-2 justify-end">
                              <DialogClose>
                                <Button
                                  variant="destructive"
                                  onClick={() => deleteService(item.id)}
                                >
                                  Excluir Agendamento
                                </Button>
                              </DialogClose>
                              <DialogClose>
                                <Button>Cancelar</Button>
                              </DialogClose>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Label className="text-xl text-colorText">
                  Você ainda não possui nenhum agendamento
                </Label>
              )}
            </section>
          </section>
        </main>
      )}
    </main>
  );
};

export default PerfilClient;
