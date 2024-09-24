import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authCadastro } from "@/context/authCadastro";
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

import Erro from "@/components/componentes/erro";

const Endereco = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const [estado, setEstado] = useState("");
  const cep = watch("cep") || "";
  const navigate = useNavigate();

  useEffect(() => {
    setAtivo(cep.length === 9);
  }, [cep]);

  const mascaraCep = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{5})(\d)/, "$1-$2");
    setValue("cep", formattedValue);
  };

  const handleSelectChange = (value) => {
    setEstado(value); // Atualiza o UF selecionado
    setValue("estado", value); // Define o valor no react-hook-form
  };

  async function buscarCep(event) {
    if (cep.length === 9) {
      event.preventDefault();

      setLoading(true);
      // TEMPO LIMITE DE 3 SEGUNDOS
      const timeout = 3000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
      );

      // Delay de 1 segundo antes de buscar o CEP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const res = await Promise.race([
          axios.get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`),
          timeoutPromise,
        ]);
        if (res.data.erro) {
          setErro("CEP não encontrado");
        } else {
          setValue("estado", res.data.uf);
          setEstado(`(${res.data.uf}) ${res.data.estado}`);
          setValue("cidade", res.data.localidade);
          setValue("bairro", res.data.bairro);
          setValue("rua", res.data.logradouro);

          setErro("");
        }
      } catch (error) {
        setErro("Erro ao buscar CEP: " + error.message);
      }
      // setValue("cep", "");
      setLoading(false);
    }
  }

  const onSubmit = (data) => {
    if (!data.estado || !data.cidade || !data.bairro || !data.numero) {
      setErro("Preencha todos os campos para continuar");
    } else {
      authCadastro.getState().setUserInfo("cep", data.cep);
      authCadastro.getState().setUserInfo("numeroCep", data.numero);
      navigate("../cadastro-senha");
    }
  };

  return (
    <div className="h-full">
      <form className="w-full h-full flex flex-col justify-center items-center gap-6 px-4">
        <div className="flex flex-col w-3/4 gap-3">
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
                  disabled={!ativo || loading}
                  className="relative flex items-center justify-center"
                  style={{ minWidth: "120px" }}
                >
                  {loading ? (
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
                <Input type="text" {...register("cidade")} />
              </div>
            </div>
            <Label size="medium">Bairro</Label>
            <Input type="text" {...register("bairro")} />
            <Label size="medium">Rua</Label>
            <Input type="text" {...register("rua")} />
            <Label size="medium">Número</Label>
            <Input type="number" {...register("numero")} />
          </div>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Avançar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Endereco;
