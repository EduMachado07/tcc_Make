import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authCadastro } from "@/context/authCadastro";
// -------- COMPONENTES UI
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// -------- ( MATERIAL UI )------------
import CircularProgress from "@mui/material/CircularProgress";

const Informacoes = () => {
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);
  const navigate = useNavigate();
  const {
    email,
    nome,
    tel,
    data,
    cep,
    cep_Numero,
    senha,
    estado,
    cidade,
    bairro,
    rua,
  } = authCadastro();

  const onSubmit = async (event) => {
    event.preventDefault();
    set_btnLoading_Submit(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("../..");
    set_btnLoading_Submit(false);
  };

  return (
    <div className="h-full">
      <form className="w-full h-full flex flex-col justify-center items-center gap-6 px-4"
      onSubmit={onSubmit}>
        <section className="flex flex-col w-3/4 gap-3">
          <Label size="subtitle">Suas informações</Label>
          <section className="flex flex-col gap-1 bg-gray-300 rounded-sm p-2.5">
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              <Label size="base" color="colorText">
                Email:{" "}
                <Label size="base" color="colorText_Bold" className="underline">
                  {email || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Nome completo:{" "}
                <Label
                  size="base"
                  color="colorText_Bold"
                  // className="underline"
                >
                  {nome || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Data de nascimento:{" "}
                <Label
                  size="base"
                  color="colorText_Bold"
                  // className="underline"
                >
                  {data || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Telefone:{" "}
                <Label
                  size="base"
                  color="colorText_Bold"
                  // className="underline"
                >
                  {tel || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                senha:{" "}
                <Label
                  size="base"
                  color="colorText_Bold"
                  // className="underline"
                >
                  {senha || "não cadastrado"}
                </Label>
              </Label>
            </div>
            {/* INFORMAOES DE ENDERECO */}
            <div className="w-32 my-1">
              <Label size="large">Endereço</Label>
              <Separator />
            </div>
            <Label size="base" color="colorText">
              CEP:{" "}
              <Label size="base" color="colorText_Bold" className="underline">
                {cep || "não cadastrado"}
              </Label>
            </Label>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <Label size="base" color="colorText">
                Estado:{" "}
                <Label size="base" color="colorText_Bold">
                  {estado || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Cidade:{" "}
                <Label size="base" color="colorText_Bold">
                  {cidade || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Bairro:{" "}
                <Label size="base" color="colorText_Bold">
                  {bairro || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Rua:{" "}
                <Label size="base" color="colorText_Bold">
                  {rua || "não cadastrado"}
                </Label>
              </Label>
              <Label size="base" color="colorText">
                Número:{" "}
                <Label size="base" color="colorText_Bold">
                  {cep_Numero || <Label color="alert">não cadastrado</Label>}
                </Label>
              </Label>
            </div>
          </section>
          <Button
            variant="primary"
            className="relative flex items-center justify-center mt-2"
            type="submit"
          >
            {btnLoading_Submit ? (
              <CircularProgress
                size={20}
                color="colorPrimary"
                className="relative inset-0 mt-1"
              />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Informacoes;
