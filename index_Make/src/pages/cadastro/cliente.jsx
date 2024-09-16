import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authEmail } from "@/context/authEmail";
import { authProtecao_Rotas } from "@/context/authProtecao_rotas";

// -------- COMPONENTES UI (shadcn)------------
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Cliente = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const { setNome_User, setTelefone_User, setData_Nascimento_User } =
    authEmail();
  const { setEtapa } = authProtecao_Rotas();
  // ------- TELEFONE USUARIO ---------
  // PARA FORMATAR TELEFONE
  const formatoTelefone = (value) => {
    if (!value) return value;

    // Remove tudo que não for número
    const phoneNumber = value.replace(/[^\d]/g, "");

    // Adiciona o parêntese, espaço e traço no formato correto
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };
  // ALTERA VALOR DO INPUT PARA O FORMATO
  // GUARDA NO STATE
  const alteraTelefone = (event) => {
    const telefoneFormatado = formatoTelefone(event.target.value);
    setTelefone(telefoneFormatado);
  };
  // ------- NOME USUARIO ---------
  // BLOQUEIA ENTRADA DE NUMEROS e CARACTERES ESPECIAIS
  const alterarNome = (event) => {
    const value = event.target.value;
    // Permite apenas letras e espaços
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, "");
    setNome(formattedValue);
  };
  // ------- DATA DE NASCIMENTO USUARIO -------
  // BLOQUEIA UMA DATA INEXISTENTE
  const dataMaxima = () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };
  // VERIFICA SE DATA É MAIOR QUE DATA ATUAL
  // SE CORRETO, GUARDA NO STATE
  const alteraDataNascimento = (event) => {
    setDataNascimento(event.target.value);
  };
  // CONVERTE 'AAAA-MM-DD' PARA 'DD/MM/YYYY'
  const formataData_Contexto = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // ------ ENVIA FORMULARIO -------
  function EnviarFormulario(event) {
    event.preventDefault();

    const anoSelecionado = parseInt(dataNascimento.split("-")[0], 10);
    const anoAtual = new Date().getFullYear();
    setErro("");
    const anoMinimo = anoAtual - 100;
    // VERIFICA O ANO INDICADO
    if (parseInt(anoSelecionado, 10) > anoAtual) {
      setErro("Ano indicado é maior que o ano atual");
      return;
    }
    if (parseInt(anoSelecionado, 10) < anoMinimo) {
      setErro("Ano indicado é muito distante");
      return;
    }
    // CONVERTE DATA PARA GUARDAR NO CONTEXTO
    const dataFormatada = formataData_Contexto(dataNascimento);
    // GUARDA DADOS NO CONTEXTO
    setNome_User(nome);
    setTelefone_User(telefone);
    setData_Nascimento_User(dataFormatada);
    // CONTEXTO DE PROTECAO DE ROTAS
    setEtapa(5);

    navigate("../../");
  }

  return (
    <div className="h-full">
      <form
        className=" w-full h-full flex flex-col justify-center items-center gap-6 px-4"
        onSubmit={EnviarFormulario}
      >
        {/* CAMPO NOME DO USUARIO */}
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="subtitle">Informações do usuário</Label>
          {erro && (
            <section className="inline-flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 stroke-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <Label color="alert">{erro}</Label>
            </section>
          )}
          <Label size="medium">Nome Completo</Label>
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <Input
              variant="inputIcon"
              type="text"
              value={nome}
              placeholder="Nome completo"
              onChange={alterarNome}
            />
          </div>
        </div>
        {/* CAMPO DATA DE NASCIMENTO */}
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="medium">Data de nascimento</Label>
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                display: none;
              }
              input[type="date"] {
                -moz-appearance: textfield;
              }
            `}</style>
            <Input
              variant="inputIcon"
              type="date"
              value={dataNascimento}
              onChange={alteraDataNascimento}
            />
          </div>
        </div>
        {/* CAMPO TELEFONE */}
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="medium">Telefone</Label>
          <div className="relative mb-6">
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
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>

            <Input
              variant="inputIcon"
              type="text"
              value={telefone}
              placeholder="(00) 00000-0000"
              onChange={alteraTelefone}
            />
          </div>
          <Button
            variant="primary"
            disabled={
              !nome || !telefone || telefone.length !== 15 || !dataNascimento
            }
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Cliente;
