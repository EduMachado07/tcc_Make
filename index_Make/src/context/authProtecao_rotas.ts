import { create } from 'zustand';

type AuthStore = {
    etapa: number;
    idEmpresa: number | null;
    setIdEmpresa: (etapa: number) => void;
    setEtapa: (etapa: number) => void;
    resetEtapa: () => void;
};

export const authProtecao_Rotas = create<AuthStore>((set) => ({
    etapa: 1,
    idEmpresa: JSON.parse(localStorage.getItem('idEmpresa') || 'null'),
    setIdEmpresa: (idEmpresa: number) => {
        localStorage.setItem('idEmpresa', JSON.stringify(idEmpresa));
        set(() => ({ idEmpresa }));
    },

    setEtapa: () => set((state) => ({
        etapa: state.etapa + 1
    })),
    resetEtapa: () => set(() => ({
        etapa: 1
    }))
}))