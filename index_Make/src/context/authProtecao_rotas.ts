import {create} from 'zustand';

type AuthStore = {
    etapa: number;
    setEtapa: (etapa: number) => void;
    resetEtapa: () => void;
};

export const authProtecao_Rotas = create<AuthStore>((set) => ({
    etapa: 1,
    setEtapa: () => set((state) => ({
        etapa: state.etapa + 1
    })),
    resetEtapa: () => set(() => ({
        etapa: 1
    }))
}))