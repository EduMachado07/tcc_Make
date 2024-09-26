import { create } from "zustand";

type AuthStore = {
  email: string | null;
  nome: string | null;
  tel: string | null;
  data: string | null;
  cep: number | null;
  cep_Numero:  | null;
  senha: string | null;

  estado: string | null;
  cidade: string | null;
  bairro: string | null;
  rua: string | null;

  setUserInfo: (field: keyof Omit<AuthStore, 'setUserInfo'>, value: number | string | null) => void;
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
  const cep_Numero = getFromLocalStorage("cep_Numero") || null;
  const senha = getFromLocalStorage("senha") || null;

  const estado = getFromLocalStorage("estado") || null;
  const cidade = getFromLocalStorage("cidade") || null;
  const bairro = getFromLocalStorage("bairro") || null;
  const rua = getFromLocalStorage("rua") || null;

  return {
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

    // Função única para atualizar qualquer campo e armazenar no localStorage
    setUserInfo: (field, value) => {
      localStorage.setItem(field, JSON.stringify(value)); 
      set({ [field]: value }); // Atualiza o estado dinamicamente
    },
  };
});
