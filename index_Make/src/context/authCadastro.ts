import { create } from "zustand";

type AuthStore = {
  email: string | null;
  nome: string | null;
  tel: string | null;
  data: string | null;
  cep: string | null;
  numeroCep: string | null;

  setUserInfo: (field: keyof Omit<AuthStore, 'setUserInfo'>, value: string | null) => void;
};

export const authCadastro = create<AuthStore>((set) => {
  // Função para carregar valores do localStorage de forma segura
  const getFromLocalStorage = (key: string): any => {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      localStorage.clear();
      return null;
    }
  };

  // Carregando os dados iniciais do localStorage
  const email = getFromLocalStorage("email") || null;
  const nome = getFromLocalStorage("nome") || null;
  const tel = getFromLocalStorage("tel") || null;
  const data = getFromLocalStorage("data") || null;
  const cep = getFromLocalStorage("cep") || null;
  const numeroCep = getFromLocalStorage("numeroCep") || null;

  return {
    email,
    nome,
    tel,
    data,
    cep,
    numeroCep,

    // Função única para atualizar qualquer campo e armazenar no localStorage
    setUserInfo: (field, value) => {
      localStorage.setItem(field, JSON.stringify(value)); // Armazena o valor no localStorage
      set({ [field]: value }); // Atualiza o estado dinamicamente
    },
  };
});
