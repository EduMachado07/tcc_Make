import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { authCadastro } from "@/context/authCadastro";
import { authProtecao_Rotas } from "@/context/authProtecao_rotas";
// -------- COMPONENTES UI
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CircularProgress from "@mui/material/CircularProgress";

const Senha = () => {
  const { register, handleSubmit, watch } = useForm();

  const [rules, setRules] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
  });
  const [btnLoading_Submit, set_btnLoading_Submit] = useState(false);
  const navigate = useNavigate();
  const { setEtapa } = authProtecao_Rotas();

  // Watch para observar o valor da senha
  const passwordValue = watch("senha");

  // Atualize o estado de regras sempre que a senha mudar
  useEffect(() => {
    const newRules = {
      minLength: passwordValue?.length >= 8,
      hasUpperCase: /[A-Z]/.test(passwordValue),
      hasNumber: /[0-9]/.test(passwordValue),
      hasSymbol: /[^A-Za-z0-9]/.test(passwordValue),
    };
    setRules(newRules);
  }, [passwordValue]);

  const validatePassword = (value) => {
    return (
      validator.isStrongPassword(value, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }) || "A senha deve atender a todos os requisitos."
    );
  };

  const onSubmit = async (data) => {
    set_btnLoading_Submit(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    authCadastro.getState().setUserInfo("senha", data.senha);
    navigate("../informacoes");
    setEtapa(7);
    set_btnLoading_Submit(false);
  };

  return (
    <div className="h-full">
      <form className="w-full h-full flex flex-col justify-center items-center gap-6 px-4">
        <div className="flex flex-col w-3/4 gap-3">
          <Label size="subtitle">Cadastre sua senha</Label>
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
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <Input
              variant="inputIcon"
              type="text"
              {...register("senha", {
                validate: validatePassword,
              })}
            />
          </div>
          <Label size="large" className="mt-3">
            Sua senha deve ter pelo menos:
          </Label>
          <div className="flex items-center space-x-2">
            <Checkbox readOnly checked={rules.minLength} />
            <Label size="medium">Oito caracteres</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox readOnly checked={rules.hasUpperCase} />
            <Label size="medium">Um caractere maiúsculo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox readOnly checked={rules.hasSymbol} />
            <Label size="medium">Um caractere especial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox readOnly checked={rules.hasNumber} />
            <Label size="medium">Um número</Label>
          </div>

          <Button
            variant="primary"
            className="relative flex items-center justify-center mt-2"
            disabled={
              !rules.minLength ||
              !rules.hasUpperCase ||
              !rules.hasSymbol ||
              !rules.hasNumber
            }
            onClick={handleSubmit(onSubmit)}
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
    </div>
  );
};

export default Senha;
