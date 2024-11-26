import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authCadastro } from "@/context/authCadastro";
import { authLogin } from "@/context/authLogin";
import { authProtecao_Rotas } from "@/context/authProtecao_rotas";
import axios from "axios";

// -------- COMPONENTES UI
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

const Informacoes = () => {
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);
  const [isSenha, set_isSenha] = useState(true);
  const navigate = useNavigate();
  const { resetEtapa, etapa } = authProtecao_Rotas();
  const {
    email,
    nome,
    tel,

    cep, // verificar isso

    numero,
    senha,
    estado,
    cidade,
    bairro,
    rua,
    empresa,
    user,
    dataNascimento,
  } = authCadastro();

  // Mostrar/Ocultar senha
  const mostrarSenha = () => set_isSenha((prev) => !prev);

  // Função para limpar os dados do cadastro
  const limparDadosCadastro = () => {
    const campos = [
      "email",
      "senha",
      "user",
      "nome",
      "tel",
      "dataNascimento",
      "cep",
      "numero",
      "empresa",
      "estado",
      "cidade",
      "bairro",
      "rua",
    ];

    campos.forEach((campo) => {
      authCadastro.getState().removeUserInfo(campo);
    });
  };

  // Função de envio do formulário

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const onSubmit = async (event) => {
    event.preventDefault();
    set_btnLoading_Submit(true);

    try {
      console.log("Enviando dados:", {
        email,
        senha,
        nome,
        tel,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        empresa,
        dataNascimento,
        user,
      });

      const response = await axios.post(
        "http://localhost:3001/api/cadastro",
        {
          email,
          senha,
          nome,
          tel,
          estado,
          cidade,
          bairro,
          rua,
          numero,
          empresa,
          dataNascimento,
          user,
        },
        {
          timeout: 15000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do servidor:", response.data);

      authLogin.getState().login({
        id:
          user === "cliente"
            ? response.data.clienteId
            : response.data.empresaId,
        email,
        nome,
        tipoUser: user,
      });

      navigate("/");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      if (err.response) {
        console.error("Erro do servidor:", err.response.data);
        // Aqui você pode mostrar uma mensagem mais específica para o usuário
        alert(err.response.data.message || "Erro ao cadastrar usuário");
      }
      navigate("../../erro");
    } finally {
      resetEtapa();
      limparDadosCadastro();
      set_btnLoading_Submit(false);
    }
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
        <section className="flex flex-col w-3/4 gap-3">
          <Label size="subtitle">Suas informações</Label>
          <section className="flex flex-col gap-1 rounded-sm p-2.5">
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">
                  Email:
                </Label>
                <Input className="flex-grow" value={email || "null"} readOnly />
              </section>

              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">
                  Nome:
                </Label>
                <Input className="flex-grow" value={nome || "null"} readOnly />
              </section>

              {empresa && (
                <section className="flex items-center w-full gap-2">
                  <Label size="base" color="colorText_Bold">
                    Empresa:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={empresa || "null"}
                    readOnly
                  />
                </section>
              )}

              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">
                  Telefone:
                </Label>
                <Input className="flex-grow" value={tel || "null"} readOnly />
              </section>
            </div>

            {/* Separador de Endereço */}
            <div className="w-32 my-2">
              <Label size="large">Endereço</Label>
              <Separator />
            </div>

            {/* Informações de Endereço */}
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              {/* CEP */}
              <section className="flex items-center w-2/4 max-sm:w-full gap-2">
                <Label size="base" color="colorText_Bold">
                  CEP:
                </Label>
                <Input
                  className="flex-grow"
                  value={cep || "Não disponível"}
                  readOnly
                />
              </section>

              {/* Estado e Cidade */}
              <div className="w-full flex gap-8">
                <section className="flex items-center min-w-1/4 max-sm:w-full gap-2">
                  <Label size="base" color="colorText_Bold">
                    Estado:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={estado || "Não disponível"}
                    readOnly
                  />
                </section>
                <section className="flex items-center w-3/4 max-sm:hidden gap-2">
                  <Label size="base" color="colorText_Bold">
                    Cidade:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={cidade || "Não disponível"}
                    readOnly
                  />
                </section>
              </div>

              <section className="flex items-center w-full sm:hidden gap-2">
                <Label size="base" color="colorText_Bold">
                  Cidade:
                </Label>
                <Input
                  className="flex-grow"
                  value={cidade || "Não disponível"}
                  readOnly
                />
              </section>

              {/* Bairro */}
              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">
                  Bairro:
                </Label>
                <Input
                  className="flex-grow"
                  value={bairro || "Não disponível"}
                  readOnly
                />
              </section>

              {/* Rua e Número */}
              <div className="w-full flex gap-2">
                <section className="flex items-center w-3/4 max-sm:w-full gap-2">
                  <Label size="base" color="colorText_Bold">
                    Rua:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={rua || "Não disponível"}
                    readOnly
                  />
                </section>
                <section className="flex items-center w-2/4 max-sm:hidden gap-2">
                  <Label size="base" color="colorText_Bold">
                    Número:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={numero || "Não disponível"}
                    readOnly
                  />
                </section>
              </div>

              <section className="flex items-center w-2/4 sm:hidden gap-2">
                <Label size="base" color="colorText_Bold">
                  Número:
                </Label>
                <Input
                  className="flex-grow"
                  value={numero || "Não disponível"}
                  readOnly
                />
              </section>
            </div>
          </section>

          {/* Botão de Cadastro */}
          <Button
            variant="primary"
            className="relative flex items-center justify-center mt-2"
            type="submit"
            onClick={onSubmit}
            disabled={btnLoading_Submit}
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
    </motion.div>
  );
};

export default Informacoes;
