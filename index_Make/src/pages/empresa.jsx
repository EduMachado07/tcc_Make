import React, { useEffect, useState } from "react";
import axios from "axios";

import imgEmpresa from "../assets/rascunhoImg.png";
import imgService from "../assets/servico.jpeg";
import gabi from "../assets/gaby.jpeg";
import funcionario from "../assets/eduardo.jpeg";
import back from "../images/background.jpg";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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

import CircularProgress from "@mui/material/CircularProgress";

import { motion } from "framer-motion";

import { authProtecao_Rotas } from "@/context/authProtecao_rotas";
import { authLogin } from "../context/authLogin";

const Empresa = () => {
  const { autenticacao, logout, user } = authLogin();
  const { idEmpresa } = authProtecao_Rotas();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // GUARDA DADOS API
  const [empresa, setEmpresa] = useState({});
  const [services, setServices] = useState([
    {
      id: 1,
      service: "corte feminino",
      value: 70.0,
      description:
        "corte para mulheres com cabelos lisos ou crespos, para uma melhor sensação de bem-estar",
    },
    {
      id: 2,
      service: "Corte de cabelo masculino",
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
  // PARA RENDERIZACAO DOS MESES E DIAS
  const [days, setDays] = useState([]);

  // LIMITA O RENDER DOS SERVIÇOS
  const [limitCards, setLimitCards] = useState(5);
  const increaseLimitCards = () => setLimitCards((prev) => prev + 5);

  // DESABILITA MESES PASSADOS
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [months, setMonths] = useState([]);
  function getDisabledMonths() {
    const currentMonth = new Date().getMonth(); // Obtem o mês atual (0 a 11)
    const months = [
      { value: "janeiro", label: "Janeiro", days: 31 },
      { value: "fevereiro", label: "Fevereiro", days: 28 }, // Considera ano comum
      { value: "marco", label: "Março", days: 31 },
      { value: "abril", label: "Abril", days: 30 },
      { value: "maio", label: "Maio", days: 31 },
      { value: "junho", label: "Junho", days: 30 },
      { value: "julho", label: "Julho", days: 31 },
      { value: "agosto", label: "Agosto", days: 31 },
      { value: "setembro", label: "Setembro", days: 30 },
      { value: "outubro", label: "Outubro", days: 31 },
      { value: "novembro", label: "Novembro", days: 30 },
      { value: "dezembro", label: "Dezembro", days: 31 },
    ];

    return months.map((month, index) => ({
      ...month,
      disabled: index < currentMonth, // Desabilita os meses passados
    }));
  }

  // GERA
  const generateTimeSlots = (startTime, endTime, incrementTime) => {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (current <= end) {
      const hours = current.getHours().toString().padStart(2, "0");
      const minutes = current.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
      current.setMinutes(current.getMinutes() + incrementTime); // Incrementa 30 minutos
    }

    return slots;
  };
  // DEFINE HORARIOS PARA AGENDAMENTO
  const timeSlots = generateTimeSlots("08:00", "17:00", 45);
  // Separar horários em manhã e tarde
  const morningSlots = timeSlots.filter(
    (time) => parseInt(time.split(":")[0]) < 12
  );
  const afternoonSlots = timeSlots.filter(
    (time) => parseInt(time.split(":")[0]) >= 12
  );

  // GUARDA SERVICO SELECIONADO PELO USUARIO
  const [selectedService, setSelectedService] = useState("");
  const handleSelectChange = (value) => setSelectedService(value);

  const [selectedValue, setSelectedValue] = useState({
    mes: "",
    dia: "",
    horario: "",
    funcionario: "",
    servico: "",
  });
  // ATUALIZA ESTADO COM O VALOR DO MODAL
  const valueChange = (field, value) => {
    setSelectedValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // LOGICA PARA DESABILITAR BOTAO
  const isButtonDisabled =
    !selectedValue.mes ||
    !selectedValue.dia ||
    !selectedValue.horario ||
    !selectedValue.funcionario ||
    !selectedValue.servico;

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
    setMonths(getDisabledMonths());
    getEmpresa();
  }, []);
  useEffect(() => {
    if (selectedMonth) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const monthIndex = months.findIndex(
        (m) => m.value === selectedMonth.value
      ); // Mês começa de 0
      const daysInMonth =
        monthIndex === 1 &&
        ((currentYear % 4 === 0 && currentYear % 100 !== 0) ||
          currentYear % 400 === 0)
          ? 29 // Fevereiro em ano bissexto
          : new Date(currentYear, monthIndex + 1, 0).getDate(); // Último dia do mês

      // Cria os dias com base no índice da semana e desabilita dias passados
      const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const weekDay = new Date(currentYear, monthIndex, day).getDay(); // 0 = Domingo, 6 = Sábado
        return {
          value: day,
          label: `${day}`,
          disabled:
            weekDay === 0 || // Domingo
            weekDay === 6 || // Sábado
            (monthIndex === currentMonth && day < currentDay), // Dia passado no mês atual
        };
      });

      setDays(daysArray);
    } else {
      setDays([]);
    }
  }, [selectedMonth]);

  const registerService = async () => {
    console.log(selectedValue);
  };
  const resetService = async () => {
    setSelectedValue({
      mes: "",
      dia: "",
      horario: "",
      funcionario: "",
      servico: "",
    });
  };

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
                    src={back}
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
                  className="bg-colorPrimary flex items-center justify-between w-full h-64 max-sm:h-full rounded-md py-4 px-6 shadow-lg max-sm:p-4 gap-8 max-sm:gap-4 max-sm:flex-col"
                >
                  <div className="w-2/4 h-full max-sm:w-full max-sm:h-40">
                    <img
                      src={imgService}
                      alt=""
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="w-3/6 max-sm:w-full h-full flex flex-col py-0 justify-between gap-1">
                    <div className="flex flex-col gap-2 max-sm:gap-2">
                      <Label
                        color="white"
                        className="text-2xl max-sm:text-lg font-bold capitalize overflow-hidden text-ellipsis line-clamp-2"
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
                    <Dialog
                      onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          // Reseta os estados ao fechar o diálogo
                          setSelectedMonth(null);
                          setDays([]);
                        }
                      }}
                    >
                      <DialogTrigger asChild className="w-full">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            if (!autenticacao || user.tipoUser === "admin") {
                              navigate("/login");
                            } else {
                              setSelectedService(item.service);
                            }
                          }}
                        >
                          Agendar serviço
                        </Button>
                      </DialogTrigger>

                      {autenticacao && (
                        <DialogContent className="max-sm:w-4/5 gap-4 rounded-md">
                          <DialogHeader className="-mb-2">
                            <DialogTitle className="text-colorPrimary">
                              Faça o seu agendamento
                            </DialogTitle>
                            <DialogDescription>
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          {/* SELECAO DO MES */}
                          <div>
                            <Select
                              onValueChange={(value) => {
                                setSelectedMonth(
                                  months.find((m) => m.value === value)
                                );
                                valueChange("mes", value);
                              }}
                            >
                              <Label>Mês</Label>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o mês" />
                              </SelectTrigger>
                              <SelectContent className="h-72">
                                <SelectGroup>
                                  {months.map((month) => (
                                    <SelectItem
                                      key={month.value}
                                      value={month.value}
                                      disabled={month.disabled}
                                    >
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* SELECAO DO DIA DO MES */}
                          {selectedMonth && (
                            <div>
                              <Select
                                onValueChange={(value) =>
                                  valueChange("dia", value)
                                }
                              >
                                <Label>Dia</Label>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione o dia" />
                                </SelectTrigger>
                                <SelectContent className="h-72">
                                  <SelectGroup>
                                    {days.map((day) => (
                                      <SelectItem
                                        key={day.value}
                                        value={day.value}
                                        disabled={day.disabled}
                                      >
                                        {day.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          {/* SELECAO DO HORÁRIO */}
                          <div>
                            <Select
                              onValueChange={(value) =>
                                valueChange("horario", value)
                              }
                            >
                              <Label>Horário</Label>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o horário" />
                              </SelectTrigger>
                              <SelectContent className="h-72">
                                {/* Manhã */}
                                {morningSlots.length > 0 && (
                                  <SelectGroup>
                                    <SelectLabel className="text-base px-2 text-colorPrimary bg-slate-100">
                                      Manhã
                                    </SelectLabel>
                                    {morningSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                )}
                                {/* Tarde */}
                                {afternoonSlots.length > 0 && (
                                  <SelectGroup>
                                    <SelectLabel className="text-base px-2 text-colorPrimary bg-slate-100">
                                      Tarde
                                    </SelectLabel>
                                    {afternoonSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          {/* SELECAO DO SERVICO */}
                          <div>
                            <Select
                              value={selectedService}
                              onValueChange={(value) => {
                                handleSelectChange(value);
                                valueChange("servico", value);
                              }}
                            >
                              <Label>Serviço Desejado</Label>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um serviço" />
                              </SelectTrigger>
                              <SelectContent className="h-72">
                                <SelectGroup>
                                  {services.map((service) => (
                                    <SelectItem
                                      key={service.id}
                                      value={service.service}
                                    >
                                      {service.service}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* SELECAO DO FUNCIONARIO */}
                          <div>
                            <Select
                              onValueChange={(value) =>
                                valueChange("funcionario", value)
                              }
                            >
                              <Label>Funcionário</Label>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o funcionário" />
                              </SelectTrigger>
                              <SelectContent className="h-28">
                                <SelectGroup>
                                  <SelectItem value="Carlos">Carlos</SelectItem>
                                  <SelectItem value="João">João</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* VALOR DO SERVICO */}
                          <Separator />
                          <section className="w-full flex justify-end">
                            <div className="w-2/5 max-sm:w-full flex items-center gap-2">
                              <Label className="w-3/4 flex justify-end">
                                Valor (R$):
                              </Label>
                              <Input
                                disabled
                                value={
                                  services.find(
                                    (service) =>
                                      service.service === selectedService
                                  )?.value || "Selecione um serviço"
                                }
                              />
                            </div>
                          </section>

                          <Button
                            variant="primary"
                            size="lg"
                            disabled={isButtonDisabled}
                            onClick={() => {
                              registerService();
                              resetService();
                            }}
                          >
                            Agendar
                          </Button>
                        </DialogContent>
                      )}
                    </Dialog>
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
                      src={gabi}
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
