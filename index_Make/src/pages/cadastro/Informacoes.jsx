import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authCadastro } from "@/context/authCadastro";
import { authLogin } from "@/context/authLogin";
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

  // Obtém todos os dados do contexto de cadastro
  const { 
    email, 
    nome, 
    tel, 
    cep, 
    numero, 
    senha, 
    estado, 
    cidade, 
    bairro, 
    rua, 
    empresa, 
    user, 
    dataNascimento 
  } = authCadastro();

  // Mostrar/Ocultar senha
  const mostrarSenha = () => set_isSenha(prev => !prev);

  // Função para limpar os dados do cadastro
  const limparDadosCadastro = () => {
    const campos = [
      "email", "senha", "user", "nome", "tel", "dataNascimento",
      "cep", "numero", "empresa", "estado", "cidade", "bairro", "rua"
    ];
    
    campos.forEach(campo => {
      authCadastro.getState().removeUserInfo(campo);
    });
  };

  // Função de envio do formulário

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const onSubmit = async (event) => {
    event.preventDefault();
    set_btnLoading_Submit(true);
  
    try {
      console.log('Enviando dados:', {
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
        user
      });
  
      const response = await axios.post(
        'http://localhost:3001/api/cadastro',
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
          user
        },
        { 
          timeout: 15000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Resposta do servidor:', response.data);
  
      authLogin.getState().login({
        id: user === 'cliente' ? response.data.clienteId : response.data.empresaId,
        email,
        nome,
        tipoUser: user,
      });
  
      navigate("/");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      if (err.response) {
        console.error('Erro do servidor:', err.response.data);
        // Aqui você pode mostrar uma mensagem mais específica para o usuário
        alert(err.response.data.message || 'Erro ao cadastrar usuário');
      }
      navigate("../../erro");
    } finally {
      limparDadosCadastro();
      set_btnLoading_Submit(false);
    }
  };

  // Ícones para o mostrador de senha
  const IconeOlhoAberto = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 stroke-colorPrimary bg-colorBack"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );

  const IconeOlhoFechado = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 stroke-colorPrimary bg-colorBack"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

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
            {/* Informações Pessoais */}
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              {/* Email */}
              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">Email:</Label>
                <Input 
                  className="flex-grow" 
                  value={email || "Não disponível"} 
                  readOnly 
                />
              </section>

              {/* Nome */}
              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">Nome:</Label>
                <Input 
                  className="flex-grow" 
                  value={nome || "Não disponível"} 
                  readOnly 
                />
              </section>

              {/* Campo Empresa (condicional) */}
              {empresa && (
                <section className="flex items-center w-full gap-2">
                  <Label size="base" color="colorText_Bold">Empresa:</Label>
                  <Input 
                    className="flex-grow" 
                    value={empresa} 
                    readOnly 
                  />
                </section>
              )}

              {/* Telefone e Senha */}
              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">Telefone:</Label>
                <Input 
                  className="flex-grow" 
                  value={tel || "Não disponível"} 
                  readOnly 
                />

                <Label size="base" color="colorText_Bold">Senha:</Label>
                <div className="flex-grow relative flex items-center w-full">
                  <div
                    onClick={mostrarSenha}
                    className="absolute cursor-pointer right-2"
                  >
                    {isSenha ? <IconeOlhoAberto /> : <IconeOlhoFechado />}
                  </div>
                  <Input
                    type={isSenha ? "password" : "text"}
                    value={senha || "Não disponível"}
                    readOnly
                  />
                </div>
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
              <section className="flex items-center w-2/4 gap-2">
                <Label size="base" color="colorText_Bold">CEP:</Label>
                <Input 
                  className="flex-grow" 
                  value={cep || "Não disponível"} 
                  readOnly 
                />
              </section>

              {/* Estado e Cidade */}
              <div className="w-full flex gap-8">
                <section className="flex items-center min-w-1/4 gap-2">
                  <Label size="base" color="colorText_Bold">Estado:</Label>
                  <Input 
                    className="flex-grow" 
                    value={estado || "Não disponível"} 
                    readOnly 
                  />
                </section>
                <section className="flex items-center w-3/4 gap-2">
                  <Label size="base" color="colorText_Bold">Cidade:</Label>
                  <Input 
                    className="flex-grow" 
                    value={cidade || "Não disponível"} 
                    readOnly 
                  />
                </section>
              </div>

              {/* Bairro */}
              <section className="flex items-center w-full gap-2">
                <Label size="base" color="colorText_Bold">Bairro:</Label>
                <Input 
                  className="flex-grow" 
                  value={bairro || "Não disponível"} 
                  readOnly 
                />
              </section>

              {/* Rua e Número */}
              <div className="w-full flex gap-2">
                <section className="flex items-center w-3/4 gap-2">
                  <Label size="base" color="colorText_Bold">Rua:</Label>
                  <Input 
                    className="flex-grow" 
                    value={rua || "Não disponível"} 
                    readOnly 
                  />
                </section>
                <section className="flex items-center w-2/4 gap-2">
                  <Label size="base" color="colorText_Bold">Número:</Label>
                  <Input 
                    className="flex-grow" 
                    value={numero || "Não disponível"} 
                    readOnly 
                  />
                </section>
              </div>
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