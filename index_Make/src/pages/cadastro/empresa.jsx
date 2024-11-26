import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authCadastro } from "@/context/authCadastro";
import { authProtecao_Rotas } from "@/context/authProtecao_rotas";
// -------- COMPONENTES UI (shadcn)------------
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// -------- ( MATERIAL UI )------------
import CircularProgress from "@mui/material/CircularProgress";
// ----- BIBLIOTECA DE ANIMACAO ------
import { motion } from "framer-motion";

const CadastroEmpresa = () => {
  // ESTADOS
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const navigate = useNavigate();
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);

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
  // ------- NOME USUARIO ---------
  // BLOQUEIA ENTRADA DE NUMEROS e CARACTERES ESPECIAIS
  const alteraEmpresa = (event) => {
    const value = event.target.value;
    // Permite apenas letras e espaços
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, "");
    setEmpresa(formattedValue);
  };

  // FORMATA CAMPO CPF
  const formatCPF = (value) => {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "");

    // Aplica a máscara de CPF: 000.000.000-00
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return value;
  };
  const handleChangeCpf = (e) => {
    const formattedCPF = formatCPF(e.target.value);
    setCpf(formattedCPF);
  };
  // FORMATA CAMPO CNPJ
  const formatCNPJ = (value) => {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "");

    // Aplica a máscara de CNPJ: 00.000.000/0000-00
    if (value.length <= 14) {
      value = value.replace(/(\d{2})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1/$2");
      value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    return value;
  };
  const handleChangeCnpj = (e) => {
    const formattedCNPJ = formatCNPJ(e.target.value);
    setCnpj(formattedCNPJ);
  };

  // FUNCOES PARA RETIRAR CARACTERES
  const removeCPFMask = (cpf) => {
    return cpf.replace(/\D/g, ""); // Remove tudo que não for número
  };
  const removeCNPJMask = (cnpj) => {
    return cnpj.replace(/\D/g, ""); // Remove tudo que não for número
  };

  // INICIA PAGINA COM INPUT FOCADO
  const inputNome = useRef(null);
  useEffect(() => {
    if (inputNome.current) {
      inputNome.current.focus();
    }
  }, []);

  // ------ ENVIA FORMULARIO -------
  async function EnviarFormulario(event) {
    event.preventDefault();
    const cpfSemMascara = removeCPFMask(cpf);
    const cnpjSemMascara = removeCNPJMask(cnpj);

    set_btnLoading_Submit(true);
    // GUARDA DADOS NO CONTEXTO
    authCadastro.getState().setUserInfo("nome", nome);
    authCadastro.getState().setUserInfo("empresa", empresa);
    authCadastro.getState().setUserInfo("tel", telefone);
    authCadastro.getState().setUserInfo("cpf", cpfSemMascara);
    authCadastro.getState().setUserInfo("cnpj", cnpjSemMascara);
    // CONTEXTO DE PROTECAO DE ROTAS
    setEtapa(4);
    navigate("../cadastro-endereco");

    set_btnLoading_Submit(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <form
        className="w-full h-full flex flex-col justify-center items-center gap-6 px-4"
        onSubmit={EnviarFormulario}
      >
        <div className="flex flex-col w-3/4 gap-3">
          <Link to="/" className="sm:hidden mb-5 flex items-center gap-1">
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
          <Label size="subtitle">Informações do usuário</Label>
          {/* CAMPO NOME DO USUARIO */}
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
              ref={inputNome}
              placeholder="Nome completo"
              onChange={alterarNome}
              maxLength={100}
            />
          </div>
        </div>

        {/* CAMPO CPF DO USUARIO */}
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="medium">CPF</Label>
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
              value={cpf}
              placeholder="Número do seu CPF"
              onChange={handleChangeCpf}
              maxLength={14}
            />
          </div>
        </div>

        {/* CAMPO NOME DA EMPRESA */}
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="medium">Nome da Empresa</Label>
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
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>

            <Input
              variant="inputIcon"
              type="text"
              value={empresa}
              placeholder="Nome empresa"
              onChange={alteraEmpresa}
              maxLength={100}
            />
          </div>
        </div>

        {/* CAMPO CNPJ DA EMPRESA */}
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="medium">CNPJ</Label>
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
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>

            <Input
              variant="inputIcon"
              type="text"
              value={cnpj}
              placeholder="CNPJ da empresa"
              onChange={handleChangeCnpj}
              maxLength={18}
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
              !nome ||
              !cpf ||
              cpf.length !== 14 ||
              !empresa ||
              !cnpj ||
              cnpj.length !== 18 ||
              !telefone ||
              telefone.length !== 15 ||
              btnLoading_Submit
            }
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

export default CadastroEmpresa;
