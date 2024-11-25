import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// CONTEXTOS
import { authCadastro } from "@/context/authCadastro";
import { authProtecao_Rotas } from "@/context/authProtecao_rotas";
// -------- COMPONENTES UI
// ---------- ( SHADCN ) ------------
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// -------- ( MATERIAL UI )------------
import CircularProgress from "@mui/material/CircularProgress";
// -------- COMPONENTE ERRO
import Erro from "@/components/componentes/erro";
// ----- BIBLIOTECA DE ANIMACAO ------
import { motion } from "framer-motion";

const Endereco = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  // ESTADOS
  const [erro, setErro] = useState("");
  const [btnLoading_Cep, set_btnLoading_Cep] = useState(false);
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const [estado, setEstado] = useState("");
  const [cepAnterior, setCepAnterior] = useState("");
  const cep = watch("cep") || "";
  const navigate = useNavigate();
  // ADICIONA ETAPA PARA ROTA
  const { setEtapa } = authProtecao_Rotas();

  // VERIFICA SE O CEP ESTA TOTALMENTE PREENCHIDO
  useEffect(() => {
    setAtivo(cep.length === 9);
  }, [cep]);

  // ADICIONA UMA MASCARA PARA VISUALIZAR O CEP
  const mascaraCep = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{5})(\d)/, "$1-$2");
    setValue("cep", formattedValue);
  };

  // ATUALIZA O INPUT
  // DEFINE O ESTADO PARA O FORMULARIO
  const handleSelectChange = (value) => {
    setEstado(value);
    setValue("estado", value);
  };

  // BUSCA CEP NA API DO CORREIO
  async function buscarCep(event) {
    event.preventDefault();
    // VERIFICA SE ESTA PREENCHIDO E SE É DIFERENTE DO ANTERIOR
    if (cep.length === 9 && cep !== cepAnterior) {
      // LIMPA ERRO
      setErro("");

      set_btnLoading_Cep(true);
      // TEMPO LIMITE DE 3 SEGUNDOS
      const timeout = 3000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
      );
      // FAZ A BUSCA NA API COM CEP INSERIDO
      try {
        const res = await Promise.race([
          axios.get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`),
          timeoutPromise,
        ]);
        // ATUALIZA OS CAMPOS COM AS INFORMACES
        if (res.data.erro) {
          setErro("CEP não encontrado");
          setCepAnterior(cep);
          setValue("estado", "");
          setEstado("");
          setValue("cidade", "");
          setValue("bairro", "");
          setValue("rua", "");
        } else {
          setValue("estado", res.data.uf);
          setEstado(`(${res.data.uf}) ${res.data.estado}`);
          setValue("cidade", res.data.localidade);
          setValue("bairro", res.data.bairro);
          setValue("rua", res.data.logradouro);

          // LIMPA ERRO
          setErro("");
          setCepAnterior(cep);
        }
      } catch (error) {
        setErro("Erro ao buscar CEP: " + error.message);
      }
      set_btnLoading_Cep(false);
    }
  }

  // ENVIA INFORMACOES DO FORMULARIO
  const onSubmit = async (data) => {
    set_btnLoading_Submit(true);
    // DELAY
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // GUARDA DADOS NO LOCALSTORAGE
    authCadastro.getState().setUserInfo("estado", data.estado);
    authCadastro.getState().setUserInfo("cidade", data.cidade);
    authCadastro.getState().setUserInfo("bairro", data.bairro);
    authCadastro.getState().setUserInfo("rua", data.rua);
    authCadastro.getState().setUserInfo("cep", data.cep);
    authCadastro.getState().setUserInfo("numero", data.numero);
    // AVANCA PAGINA
    setEtapa(6);
    navigate("../cadastro-senha");

    set_btnLoading_Submit(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <form className="w-full h-full flex flex-col justify-center items-center gap-6 px-4">
        <div className="flex flex-col w-3/4 gap-3">
          <Link to="/" className="sm:hidden mb-2 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            <Label size="large">Voltar</Label>
          </Link>
          <Label size="subtitle">Seu endereço</Label>
          {/* COMPONENTE MENSAGEM DE ERRO */}
          {erro && <Erro props={erro} />}
          {/* CAMPO BUSCA DO CEP */}
          <div className="flex flex-col w-full gap-3">
            <Label size="medium">CEP</Label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 stroke-colorPrimary absolute inset-y-2 left-1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  variant="inputIcon"
                  type="text"
                  placeholder="00000-000"
                  maxLength={9}
                  {...register("cep", {
                    onChange: mascaraCep,
                    onBlur: buscarCep,
                  })}
                />
                <Button
                  variant="primary"
                  onClick={buscarCep}
                  disabled={!ativo || btnLoading_Cep || cep === cepAnterior}
                  className="relative flex items-center justify-center"
                  style={{ minWidth: "120px" }}
                >
                  {btnLoading_Cep ? (
                    <CircularProgress
                      size={20}
                      color="colorPrimary"
                      className="relative inset-0 mt-1"
                    />
                  ) : (
                    "Buscar CEP"
                  )}
                </Button>
              </div>
            </div>
          </div>
          <section className="inline-flex gap-1 -mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <Label size="small">insira o CEP para buscar as informações</Label>
          </section>
          <div className="mt-3 flex flex-col w-full gap-1.5">
            <div className="flex flex-row w-full gap-7">
              <div className="flex flex-col w-1/4">
                <Label size="medium">Estado</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={estado} />
                  </SelectTrigger>
                  <SelectContent className="max-h-56 overflow-y-auto">
                    <SelectGroup>
                      <SelectLabel>Norte</SelectLabel>
                      <SelectItem value="AC">(AC) Acre</SelectItem>
                      <SelectItem value="AP">(AP) Amapá</SelectItem>
                      <SelectItem value="AM">(AM) Amazonas</SelectItem>
                      <SelectItem value="PA">(PA) Pará</SelectItem>
                      <SelectItem value="RO">(RO) Rondônia</SelectItem>
                      <SelectItem value="RR">(RR) Roraima</SelectItem>
                      <SelectItem value="TO">(TO) Tocantins</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Nordeste</SelectLabel>
                      <SelectItem value="AL">(AL) Alagoas</SelectItem>
                      <SelectItem value="BA">(BA) Bahia</SelectItem>
                      <SelectItem value="CE">(CE) Ceará</SelectItem>
                      <SelectItem value="MA">(MA) Maranhão</SelectItem>
                      <SelectItem value="PB">(PB) Paraíba</SelectItem>
                      <SelectItem value="PE">(PE) Pernambuco</SelectItem>
                      <SelectItem value="PI">(PI) Piauí</SelectItem>
                      <SelectItem value="RN">
                        (RN) Rio Grande do Norte
                      </SelectItem>
                      <SelectItem value="SE">(SE) Sergipe</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Centro-Oeste</SelectLabel>
                      <SelectItem value="DF">(DF) Distrito Federal</SelectItem>
                      <SelectItem value="GO">(GO) Goiás</SelectItem>
                      <SelectItem value="MT">(MT) Mato Grosso</SelectItem>
                      <SelectItem value="MS">
                        (MS) Mato Grosso do Sul
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Sudeste</SelectLabel>
                      <SelectItem value="ES">(ES) Espírito Santo</SelectItem>
                      <SelectItem value="MG">(MG) Minas Gerais</SelectItem>
                      <SelectItem value="RJ">(RJ) Rio de Janeiro</SelectItem>
                      <SelectItem value="SP">(SP) São Paulo</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Sul</SelectLabel>
                      <SelectItem value="PR">(PR) Paraná</SelectItem>
                      <SelectItem value="RS">(RS) Rio Grande do Sul</SelectItem>
                      <SelectItem value="SC">(SC) Santa Catarina</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col w-3/4">
                <Label size="medium">Cidade</Label>
                <Input
                  type="text"
                  {...register("cidade", { required: true })}
                />
              </div>
            </div>
            <Label size="medium">Bairro</Label>
            <Input type="text" {...register("bairro", { required: true })} />
            <Label size="medium">Rua</Label>
            <Input type="text" {...register("rua", { required: true })} />
            <Label size="medium">Número</Label>
            <Input type="number" {...register("numero", { required: true })} />
          </div>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !estado || btnLoading_Submit}
            className="relative flex items-center justify-center"
          >
            {btnLoading_Submit ? (
              <CircularProgress
                size={20}
                color="colorPrimary"
                className="relative inset-0 mt-1"
              />
            ) : (
              "Avançar"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Endereco;
