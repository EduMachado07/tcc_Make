import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authCadastro } from "@/context/authCadastro";
import axios from "axios";
// -------- COMPONENTES UI
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
// -------- ( MATERIAL UI )------------
import CircularProgress from "@mui/material/CircularProgress";

const Informacoes = () => {
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);
  const navigate = useNavigate();
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

  // --- FUNCAO PARA ICONE DA SENHA ---
  // MOSTRA SENHA
  const [isSenha, set_isSenha] = useState(true);
  const mostrarSenha = () => {
    set_isSenha((prev) => !prev);
  };

  // ----- ENVIA DADOS PARA API ----------
  const onSubmit = async () => {
    event.preventDefault();
    set_btnLoading_Submit(true);

    // CRIA OBJETO USUARIO
    const usuario = { email, senha, user };
    const dataUser = {
      nome,
      tel,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      empresa,
      dataNascimento,
    };

    try {
      const timeout = 15000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
      );

      // ENVIA DADOS PARA TABELA CLIENTE
      if (user === "cliente") {
        const cliente = await Promise.race([
          axios.post(
            "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/Clientes",
            {
              nome: dataUser.nome,
              endereco: `${dataUser.rua}, ${dataUser.numero}, ${dataUser.bairro} - ${dataUser.cidade} (${dataUser.estado})`,
              telefone: dataUser.tel,
              dataNascimento: dataUser.dataNascimento,
            }
          ),
          timeoutPromise,
        ]);
        // GUARDA ID DO CLIENTE PARA TABELA USUARIO
        const idCliente = cliente.data.id;
        
        console.log("cliente cadastrado");
        
        // CRIA USUARIO COM ID CLIENTE
        await Promise.race([
          axios.post(
            "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/usuarios",
            { email: usuario.email, senha: usuario.senha, tipoUsuario: usuario.user, idCliente: idCliente}
          ),
          timeoutPromise,
        ]);
        console.log("usuario cadastrado");
      }
      // ENVIA DADOS PARA TABELA EMPRESA
      if (user === "empresa") {
        const empresa = await Promise.race([
          axios.post(
            "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/Clientes",
            {
              nome: dataUser.nome,
              empresa: dataUser.empresa,
              endereco: `${dataUser.rua}, ${dataUser.numero}, ${dataUser.bairro} - ${dataUser.cidade} (${dataUser.estado})`,
              telefone: dataUser.tel,
            }
          ),
          timeoutPromise,
        ]);
        // GUARDA ID DA EMPRESA PARA TABELA USUARIO
        const idEmpresa = empresa.data.id;
        
        console.log("EMPRESA cadastrado");
        
        // CRIA USUARIO COM ID CLIENTE
        await Promise.race([
          axios.post(
            "https://66d3463e184dce1713cfc9ba.mockapi.io/usuario/usuarios",
            { email: usuario.email, senha: usuario.senha, tipoUsuario: usuario.user, idCliente: idEmpresa}
          ),
          timeoutPromise,
        ]);
        console.log("USUARIO cadastrada");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      navigate("../../erro");
    } finally {
      set_btnLoading_Submit(false);
    }
  };

  return (
    <div className="h-full">
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

                <Label size="base" color="colorText_Bold">
                  Senha:
                </Label>
                <div className="flex-grow relative flex items-center w-full">
                  <div
                    onClick={mostrarSenha}
                    className="absolute cursor-pointer right-2"
                  >
                    {isSenha ? (
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
                    ) : (
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
                    )}
                  </div>
                  <Input
                    type={isSenha ? "password" : "text"}
                    value={senha || "Não disponível"}
                    readOnly
                  />
                </div>
              </section>
            </div>
            {/* INFORMAOES DE ENDERECO */}
            <div className="w-32 my-2">
              <Label size="large">Endereço</Label>
              <Separator />
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              <section className="flex items-center w-2/4 gap-2">
                <Label size="base" color="colorText_Bold">
                  CEP:
                </Label>
                <Input
                  className="flex-grow"
                  value={cep || "Não disponível"}
                  readOnly
                />
              </section>
              <div className="w-full flex gap-8">
                <section className="flex items-center w-1/4 gap-2">
                  <Label size="base" color="colorText_Bold">
                    Estado:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={estado || "Não disponível"}
                    readOnly
                  />
                </section>
                <section className="flex items-center w-3/4 gap-2">
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
              <div className="w-full flex gap-2">
                <section className="flex items-center w-3/4 gap-2">
                  <Label size="base" color="colorText_Bold">
                    Rua:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={rua || "Não disponível"}
                    readOnly
                  />
                </section>
                <section className="flex items-center w-2/4 gap-2">
                  <Label size="base" color="colorText_Bold">
                    Numero:
                  </Label>
                  <Input
                    className="flex-grow"
                    value={numero || "Não disponível"}
                    readOnly
                  />
                </section>
              </div>
            </div>
          </section>
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
    </div>
  );
};

export default Informacoes;
