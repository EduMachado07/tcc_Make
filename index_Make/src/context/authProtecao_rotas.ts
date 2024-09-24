import {create} from 'zustand';

type AuthStore = {
    etapa: number;
    setEtapa: (etapa: number) => void;
};


export const authProtecao_Rotas = create<AuthStore>((set) => ({
    etapa: 6,
    setEtapa: () => set((state) => ({
        etapa: state.etapa + 1
    }))
}))