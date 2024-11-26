import { create } from 'zustand';
import { NavigateFunction } from 'react-router-dom';

type User = {
  id: string | number;
  email: string;
  nome: string;
  tipoUser: string;
}
type AuthStore = {
  user: User | null;
  autenticacao: boolean;
  login: (data: User) => void;
  logout: (navigate: NavigateFunction) => void;
}

export const authLogin = create<AuthStore>((set) => {
  const localUser = localStorage.getItem("user");

  let user = null;
  // let user = {
  //   id: 1,
  //   email: "usuario@exemplo.com",
  //   nome: "Hubflow Enterprises",
  //   tipoUser: "admin"
  // };
  if (localUser) {
    try {
      user = JSON.parse(localUser);
    } catch (error) {
      console.error("Erro ao analisar JSON:", error);
      localStorage.removeItem("user");
    }
  }

  return {
    user: user,
    autenticacao: !!user,

    // FUNCAO PARA LOGIN
    login: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      set(() => ({
        user: data,
        autenticacao: true,
      }));
    },

    // FUNCAO PARA DESLOGAR
    logout: (navigate) => {
      localStorage.removeItem("user");
      set(() => ({
        user: null,
        autenticacao: false,
      }));
      navigate("/login");
    },
  };
});
