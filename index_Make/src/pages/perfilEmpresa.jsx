import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import imgRascunho from "../assets/rascunhoImg.png";
import imgService from "../assets/servico.jpeg";
import gabi from "../assets/gaby.jpeg";
import funcionario from "../assets/eduardo.jpeg";

import back from "../images/background.jpg";

import { authLogin } from "@/context/authLogin";

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

const PerfilEmpresa = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState([]);
  // PARA TESTE DOS SERVICOS
  const [services, setServices] = useState([]);

  const [limitCards, setLimitCards] = useState(6);
  const { user } = authLogin();

  const increaseLimitCards = () => setLimitCards((prev) => prev + 6);
  const resetLimitCards = () => setLimitCards(6);

  // PARA EDIÇÃO DOS SERVICOS
  const [editedService, setEditedService] = useState({
    id: "",
    img: "",
    nome: "",
    description: "",
    value: "",
  });
  const handleEditClick = (service) => setEditedService(service);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({ ...prev, [name]: value }));
  };
  const editService = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        `https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/services/${editedService.id}`,
        {
          nome: editedService.nome,
          description: editedService.description,
          value: editedService.value,
        }
      );
      // Atualize a lista de serviços localmente
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === editedService.id ? editedService : service
        )
      );
    } catch (error) {
      console.log("Erro ao atualizar o serviço: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // PARA CRIAÇÃO DOS SERVICOS
  const [createdServices, setCreatedServices] = useState({
    img: "",
    nome: "",
    description: "",
    value: "",
  });
  const createInputChange = (e) => {
    const { name, value } = e.target;
    setCreatedServices((prev) => ({ ...prev, [name]: value }));
  };
  const createService = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newService = {
        img: createdServices.img,
        nome: createdServices.nome,
        description: createdServices.description,
        value: createdServices.value,
      };

      const { data } = await axios.post(
        "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/services/",
        newService
      );
      setServices((prevServices) => [...prevServices, data]);
      setCreatedServices({ img: "", nome: "", description: "", value: "" });
    } catch (error) {
      console.log("Erro ao atualizar o serviço: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // PARA DELETAR SERVICO
  const deleteService = async (serviceId) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/services/${serviceId}`
      );
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
    } catch (error) {
      console.log("Erro ao atualizar o serviço: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // BUSCA A EMPRESA
  useEffect(() => {
    if (user.tipoUser === "client") {
      navigate("/");
    }
    const getEmpresa = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/servicos/${user.id}`
        );
        setPerfil(res.data);
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
    getEmpresa();
    getServices();
  }, []);

  return (
    <main className="bg-colorBack min-h-screen py-6 px-10 max-sm:px-4">
      {isLoading ? (
        <div className="w-full flex justify-center">
          <CircularProgress size={40} color="info" />
        </div>
      ) : (
        <main className="w-full flex flex-col items-center gap-7">
          <section className="w-full flex flex-col h-full">
            <section className="h-72 max-sm:h-60 relative">
              <img
                src={back}
                alt=""
                className="w-full h-full object-cover rounded-t-md opacity-85"
              />
              <Dialog>
                <DialogTrigger>
                  <Button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-colorPrimary"
                    size="lg"
                    variant="outline"
                  >
                    Editar imagens
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-colorPrimary text-xl">
                      Edite as imagens da sua empresa
                    </DialogTitle>
                  </DialogHeader>

                  <div>
                    <Label>Sua foto</Label>
                    <Input type="file" />
                  </div>

                  <div>
                    <Label>Foto empresa</Label>
                    <Input type="file" />
                  </div>

                  <Button variant="primary" disabled={isLoading}>
                    {isLoading ? "Alterando..." : "Alterar"}
                  </Button>
                </DialogContent>
              </Dialog>
            </section>
            <section className="bg-colorPrimary h-full rounded-b-md px-56 max-sm:px-3 py-3">
              <section className="flex items-center w-full gap-20">
                <div className="w-52 h-52 max-sm:hidden">
                  <img
                    src={gabi}
                    alt=""
                    className="w-full h-full rounded-full object-cover border-4 border-colorBack"
                  />
                </div>
                <div className="w-3/4 max-sm:w-full flex flex-col gap-1.5">
                  <h1 className="text-slate-50 text-4xl font-bold">
                    {perfil.nameEmpresa}
                  </h1>
                  <h1 className="text-slate-50 text-lg overflow-hidden text-ellipsis line-clamp-3">
                    {perfil.descriptionEmpresa}
                  </h1>
                  <h1 className="text-slate-50 text-lg ">
                    {perfil.localEmpresa}
                  </h1>
                  <h1 className="text-slate-50 text-lg">redes sociais</h1>
                  <h1 className="text-slate-50 text-lg">expediente</h1>

                  {/* PARA EDITAR PERFIL */}
                  <Dialog>
                    <DialogTrigger className="w-full flex justify-end">
                      <Button variant="outline" size="lg" className="w-2/4">
                        Editar Perfil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-sm:w-4/5 rounded-md">
                      <DialogHeader>
                        <DialogTitle className="text-colorPrimary">
                          Edite as informações da sua empresa
                        </DialogTitle>
                      </DialogHeader>
                      <Input
                        value={perfil.nameEmpresa}
                        placeholder="nome da sua empresa"
                      />
                      <Textarea
                        value={perfil.descriptionEmpresa}
                        className="h-36 max-h-48"
                        placeholder="uma descrição da sua empresa"
                      />
                      <Input
                        value={perfil.localEmpresa}
                        placeholder="local da sua empresa"
                      />
                      <Textarea
                        value={perfil.redesSociais}
                        className="h-16 max-h-28"
                        placeholder="redes socias"
                      />
                      {/* Horário Manhã */}
                      <Label>Horário Manhã</Label>
                      <section className="flex items-center gap-6 -mt-3">
                        <div className="w-2/4 flex items-center gap-2">
                          <Label>Inicio</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="h-60">
                              <SelectGroup>
                                <SelectItem value="05:00">05:00</SelectItem>
                                <SelectItem value="05:30">05:30</SelectItem>
                                <SelectItem value="06:00">06:00</SelectItem>
                                <SelectItem value="06:30">06:30</SelectItem>
                                <SelectItem value="07:00">07:00</SelectItem>
                                <SelectItem value="07:30">07:30</SelectItem>
                                <SelectItem value="08:00">08:00</SelectItem>
                                <SelectItem value="08:30">08:30</SelectItem>
                                <SelectItem value="09:00">09:00</SelectItem>
                                <SelectItem value="09:30">09:30</SelectItem>
                                <SelectItem value="10:00">10:00</SelectItem>
                                <SelectItem value="10:30">10:30</SelectItem>
                                <SelectItem value="11:00">11:00</SelectItem>
                                <SelectItem value="11:30">11:30</SelectItem>
                                <SelectItem value="12:00">12:00</SelectItem>
                                <SelectItem value="12:30">12:30</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-2/4 flex items-center gap-2">
                          <Label>Término</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="h-60">
                              <SelectGroup>
                                <SelectItem value="05:00">05:00</SelectItem>
                                <SelectItem value="05:30">05:30</SelectItem>
                                <SelectItem value="06:00">06:00</SelectItem>
                                <SelectItem value="06:30">06:30</SelectItem>
                                <SelectItem value="07:00">07:00</SelectItem>
                                <SelectItem value="07:30">07:30</SelectItem>
                                <SelectItem value="08:00">08:00</SelectItem>
                                <SelectItem value="08:30">08:30</SelectItem>
                                <SelectItem value="09:00">09:00</SelectItem>
                                <SelectItem value="09:30">09:30</SelectItem>
                                <SelectItem value="10:00">10:00</SelectItem>
                                <SelectItem value="10:30">10:30</SelectItem>
                                <SelectItem value="11:00">11:00</SelectItem>
                                <SelectItem value="11:30">11:30</SelectItem>
                                <SelectItem value="12:00">12:00</SelectItem>
                                <SelectItem value="12:30">12:30</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </section>

                      {/* Horário Tarde */}
                      <Label>Horário Tarde</Label>
                      <section className="flex items-center gap-6 -mt-3">
                        <div className="w-2/4 flex items-center gap-2">
                          <Label>Inicio</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="h-60">
                              <SelectGroup>
                                <SelectItem value="13:00">13:00</SelectItem>
                                <SelectItem value="13:30">13:30</SelectItem>
                                <SelectItem value="14:00">14:00</SelectItem>
                                <SelectItem value="14:30">14:30</SelectItem>
                                <SelectItem value="15:00">15:00</SelectItem>
                                <SelectItem value="15:30">15:30</SelectItem>
                                <SelectItem value="16:00">16:00</SelectItem>
                                <SelectItem value="16:30">16:30</SelectItem>
                                <SelectItem value="17:00">17:00</SelectItem>
                                <SelectItem value="17:30">17:30</SelectItem>
                                <SelectItem value="18:00">18:00</SelectItem>
                                <SelectItem value="18:30">18:30</SelectItem>
                                <SelectItem value="19:00">19:00</SelectItem>
                                <SelectItem value="19:30">19:30</SelectItem>
                                <SelectItem value="20:00">20:00</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-2/4 flex items-center gap-2">
                          <Label>Término</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="h-60">
                              <SelectGroup>
                                <SelectItem value="13:00">13:00</SelectItem>
                                <SelectItem value="13:30">13:30</SelectItem>
                                <SelectItem value="14:00">14:00</SelectItem>
                                <SelectItem value="14:30">14:30</SelectItem>
                                <SelectItem value="15:00">15:00</SelectItem>
                                <SelectItem value="15:30">15:30</SelectItem>
                                <SelectItem value="16:00">16:00</SelectItem>
                                <SelectItem value="16:30">16:30</SelectItem>
                                <SelectItem value="17:00">17:00</SelectItem>
                                <SelectItem value="17:30">17:30</SelectItem>
                                <SelectItem value="18:00">18:00</SelectItem>
                                <SelectItem value="18:30">18:30</SelectItem>
                                <SelectItem value="19:00">19:00</SelectItem>
                                <SelectItem value="19:30">19:30</SelectItem>
                                <SelectItem value="20:00">20:00</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </section>

                      <div>
                        <Label>Intervalo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="h-auto">
                            <SelectGroup>
                              <SelectItem value="13:00">00:15</SelectItem>
                              <SelectItem value="13:30">00:30</SelectItem>
                              <SelectItem value="14:00">0:45</SelectItem>
                              <SelectItem value="14:30">01:00</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button variant="primary">Atualizar</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </section>
            </section>
          </section>

          <div className="w-full flex justify-between items-center">
            <Label size="subtitle">Meus Serviços</Label>
            {/* CARD PARA CRIAR SERVICO */}
            <Dialog>
              <DialogTrigger>
                <Button size="lg" variant="variantOutline">
                  Criar Serviço{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-sm:w-4/5 rounded-md">
                <DialogHeader>
                  <DialogTitle className="text-colorPrimary text-xl">
                    Crie um serviço
                  </DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={createService}>
                  <div>
                    <Label>Nome do serviço</Label>
                    <Input
                      name="nome"
                      value={createdServices.nome}
                      onChange={createInputChange}
                      maxLength={40}
                    />
                  </div>

                  {/* <div>
                <Label>Imagem</Label>
                <Input
                  type="file"
                  name="img"
                  value={createdServices.img}
                  onChange={createInputChange}
                />
              </div> */}

                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      name="description"
                      value={createdServices.description}
                      onChange={createInputChange}
                      className="h-40"
                    />
                  </div>

                  <div>
                    <Label>Valor serviço (R$)</Label>
                    <Input
                      name="value"
                      value={createdServices.value}
                      onChange={createInputChange}
                    />
                  </div>

                  <Button variant="primary" disabled={isLoading}>
                    {isLoading ? "Criando Serviço..." : "Criar"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <section className="w-full grid gap-6 grid-cols-2 max-sm:grid-cols-1">
            {/* SERVICOS EM CARDS */}
            {services.length > 0 ? (
              services.slice(0, limitCards).map((item) => (
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
                      <Label color="white" size="base">
                        Valor: R$ {item.value},00
                      </Label>
                    </div>
                    <div className="flex gap-2 justify-end">
                      {/* CARD PARA ATUALIZAR SERVICO */}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            size="lg"
                            variant="outline"
                            className="max-sm:w-full"
                            onClick={() => handleEditClick(item)}
                          >
                            Editar serviço
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-sm:w-4/5 rounded-md">
                          <DialogHeader>
                            <DialogTitle className="text-colorPrimary text-xl">
                              Edite o seu serviço
                            </DialogTitle>
                          </DialogHeader>
                          <form
                            className="flex flex-col gap-4"
                            // onSubmit={editService}
                          >
                            <div>
                              <Label>Nome do serviço</Label>
                              <Input
                                name="nome"
                                value={editedService.nome}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div>
                              <Label>Descrição do serviço</Label>
                              <Textarea
                                name="description"
                                value={editedService.description}
                                onChange={handleInputChange}
                                className="h-40"
                              />
                            </div>

                            <div>
                              <Label>Valor serviço (R$)</Label>
                              <Input
                                name="value"
                                value={editedService.value}
                                onChange={handleInputChange}
                              />
                            </div>
                            <Button
                              onClick={editService}
                              variant="primary"
                              disabled={isLoading}
                            >
                              {isLoading ? "Atualizando..." : "Atualizar"}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>

                      {/* CARD PARA EXCLUIR SERVICO */}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            size="icon"
                            variant="outline"
                            className="max-sm:w-full sm:hover:bg-red-500 sm:hover:text-slate-50"
                          >
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
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-colorPrimary text-xl">
                              Tem certeza que deseja excluir este serviço?
                            </DialogTitle>
                          </DialogHeader>
                          <Input disabled value={item.nome} />
                          <div className="flex gap-2 justify-end">
                            <DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => deleteService(item.id)}
                              >
                                Excluir Serviço
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
                Sua empresa ainda não possui serviços cadastrados
              </Label>
            )}
          </section>

          {limitCards < services.length && (
            <Button
              onClick={
                limitCards < services.length
                  ? increaseLimitCards
                  : resetLimitCards
              }
              className="w-full -mt-3"
              size="lg"
              variant="ghost"
            >
              {limitCards < services.length
                ? "Mostrar mais serviços"
                : "Mostrar menos"}

              {limitCards < services.length ? (
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
              ) : (
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
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </Button>
          )}

          <div className="w-full flex justify-between items-center">
            <Label size="subtitle">Meus Funcionários</Label>
            {/* CARD PARA CRIAR SERVICO */}
            <Dialog>
              <DialogTrigger>
                <Button size="lg" variant="variantOutline">
                  Add Funcionário
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form className="flex flex-col gap-4" onSubmit={createService}>
                  <Label className="mb-0 text-3xl font-semibold">
                    Adicione um funcionário
                  </Label>

                  <div>
                    <Label>Nome</Label>
                    <Input
                      name="nome"
                      value={createdServices.nome}
                      onChange={createInputChange}
                    />
                  </div>

                  {/* <div>
                <Label>Imagem</Label>
                <Input
                  type="file"
                  name="img"
                  value={createdServices.img}
                  onChange={createInputChange}
                />
              </div> */}

                  <div>
                    <Label>Função: </Label>
                    <Input
                      name="value"
                      value={createdServices.value}
                      onChange={createInputChange}
                    />
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      name="description"
                      value={createdServices.description}
                      onChange={createInputChange}
                      className="h-40"
                    />
                  </div>

                  <Button variant="primary" disabled={isLoading}>
                    {isLoading ? "Criando Serviço..." : "Criar"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <section className="w-full grid gap-6 grid-cols-2 max-sm:grid-cols-1">
            {/* INFORMACOES FUNCIONARIOS */}
            <div
              // key={item.id}
              className="bg-colorPrimary flex items-center justify-between w-full h-full rounded-md py-4 px-6 shadow-lg max-sm:p-4 max-sm:gap-4"
            >
              {/* IMAGEM */}
              <div className="w-40 h-40 max-sm:h-28 max-sm:w-28">
                <img
                  // src={item.img === "" ? imgRascunho : item.img}
                  src={funcionario}
                  alt="imagem não encontrada"
                  className="w-full h-full object-cover rounded-full border-4"
                />
              </div>

              {/* INFORMACOES SERVICO */}
              <div className="w-3/5 h-full flex flex-col gap-1 justify-between max-sm:w-8/12">
                <div className="flex flex-col gap-2 max-sm:gap-2">
                  <Label
                    color="white"
                    className="text-2xl max-sm:text-lg font-bold capitalize overflow-hidden text-ellipsis line-clamp-2"
                  >
                    {/* {item.nome} */}
                    Eduardo Machado
                  </Label>
                  <Label
                    color="white"
                    className="overflow-hidden text-ellipsis line-clamp-3 max-sm:line-clamp-2"
                  >
                    {/* {item.description} */}
                    Função: Barbeiro
                  </Label>
                </div>

                <div className="w-full flex gap-2 justify-end">
                  {/* CARD PARA ATUALIZAR SERVICO */}
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        size="lg"
                        variant="outline"
                        className="max-sm:w-full px-7"
                        // onClick={() => handleEditClick(item)}
                      >
                        Editar funcionário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-3/5">
                      <form
                        className="flex flex-col gap-4"
                        // onSubmit={editService}
                      >
                        <Label className="mb-0 text-3xl font-semibold">
                          Edite o seu funcionário
                        </Label>

                        <div>
                          <Label>Nome</Label>
                          <Input
                            name="nome"
                            value={editedService.nome}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label>Função</Label>
                          <Input
                            name="value"
                            value={editedService.value}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label>Descrição</Label>
                          <Textarea
                            name="description"
                            value={editedService.description}
                            onChange={handleInputChange}
                            className="h-40"
                          />
                        </div>

                        <Button
                          onClick={editService}
                          variant="primary"
                          disabled={isLoading}
                        >
                          {isLoading ? "Atualizando..." : "Atualizar"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* CARD PARA EXCLUIR SERVICO */}
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        size="icon"
                        variant="outline"
                        className="max-sm:w-full sm:hover:bg-red-500 sm:hover:text-slate-50"
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <Label className="text-xl">
                        Tem certeza que deseja excluir este funcionário?
                      </Label>
                      {/* <Input disabled value={item.nome} /> */}
                      <div className="flex gap-2 justify-end">
                        <DialogClose>
                          <Button
                            variant="destructive"
                            // onClick={() => deleteService(item.id)}
                          >
                            Excluir Funcionário
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
          </section>
        </main>
      )}
    </main>
  );
};

export default PerfilEmpresa;
