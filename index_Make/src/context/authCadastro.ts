import { create } from "zustand";

type AuthStore = {
  email: string | null;
  nome: string | null;
  tel: string | null;
  dataNascimento: string | null;
  cep: number | null;
  numero: number | null;
  senha: string | null;
  empresa: string | null;
  estado: string | null;
  cidade: string | null;
  bairro: string | null;
  rua: string | null;
  user: string | null;
  cpf: number | null;
  cnpj: number | null;

  setUserInfo: (field: keyof Omit<AuthStore, 'setUserInfo'>, value: number | string | null) => void;
  removeUserInfo: (field: keyof Omit<AuthStore, 'setUserInfo' | 'deleteUserInfo'>) => void;
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
  const dataNascimento = getFromLocalStorage("dataNascimento") || null;
  const cep = getFromLocalStorage("cep") || null;
  const numero = getFromLocalStorage("numero") || null;
  const senha = getFromLocalStorage("senha") || null;

  const estado = getFromLocalStorage("estado") || null;
  const cidade = getFromLocalStorage("cidade") || null;
  const bairro = getFromLocalStorage("bairro") || null;
  const rua = getFromLocalStorage("rua") || null;
  const empresa = getFromLocalStorage("empresa") || null;
  const user = getFromLocalStorage("user") || null;
  const cpf = getFromLocalStorage("cpf") || null;
  const cnpj = getFromLocalStorage("cnpj") || null;

  return {
    email,
    nome,
    tel,
    dataNascimento,
    cep,
    numero,
    senha,
    empresa,
    user,
    estado,
    cidade,
    bairro,
    rua,
    cpf,
    cnpj,

    setUserInfo: (field, value) => {
      localStorage.setItem(field, JSON.stringify(value));
      set({ [field]: value });
    },
    removeUserInfo: (field) => {
      localStorage.removeItem(field);
      set({ [field]: null });
    },
  };
});
